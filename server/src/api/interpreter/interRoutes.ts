import express from "express";
import { QCObject, QCResponseObject } from "../interfaces";
import { QCObjectSchema } from "../schema";
import { analyze } from "./interpreter.controller.js";
import Tree from "../../analyzer/tools/tree";
import Environment, { createGlobalEnv } from "../../analyzer/tools/environments";
import { Node, Statement } from "../../analyzer/abastract/ast";
import { QCrypterLexer, QCrypterParser } from "../../analyzer/grammar";
import { readFileSync } from "fs";
import path from "path";
import Joi from "joi";

// TODO import interpeter files
const router = express.Router();


router.get('/test', /*async*/ (req, res) => {
    // TODO const response = await interpreter.interpret(req.body)
    res.status(200).json({message: "OK"});
});



router.post('/interpret', /*async*/ (req, res) => {
    const { error, value } = QCObjectSchema.validate(req.body);
    if (error){
        res.status(400).send('Invalid JSON structure');
        return;
    }

    const qcObj = value as QCObject;

    const data: string = qcObj.content;

    let tree: Tree | null;
    let globalEnv: Environment | null;

    let instructions: Array<Statement>

    const parser = new QCrypterParser()
    instructions = parser.parse(data);


    tree = new Tree(instructions);

    globalEnv = createGlobalEnv();
    tree.globalTable = globalEnv;

    for (let instruction of tree.instructions) {
        let value;
        try{
            value = instruction.interpret(tree, globalEnv)
        } catch(err){
            // TODO
        }
    }

    /*------------------------------AST------------------------------*/
    let rootCst: Node = new Node("Root");
    let instruction: Node = new Node("Statements");

    for (let item of tree.instructions) {
        instruction.addChildsNode(item.getCST());
    }
    rootCst.addChildsNode(instruction);

    let graph = tree.getDot(rootCst);

    let rootAst: Node = new Node("Root");
    let val: Node = new Node("Instructions");

    for (let item of tree.instructions) {
        value.addChildsNode(item.getAST());
    }

    rootAst.addChildsNode(value);

    let ast = tree.getDot(rootAst, false);


    // TODO add return logic here
    /*
     * const response: QCResponseObject = await parseFile(qcObj)
     */


    res.status(200).json({message: "accepted"})
});



export { router };
