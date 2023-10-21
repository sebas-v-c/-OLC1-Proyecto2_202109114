import express from "express";
import { Errors, QCObject, QCResponseObject } from "../interfaces";
import { QCObjectSchema } from "../schema";
import { analyze } from "./interpreter.controller.js";
import Tree from "../../analyzer/tools/tree";
import Environment, { createGlobalEnv } from "../../analyzer/tools/environments";
import { Node, Statement } from "../../analyzer/abastract/ast";
import { QCrypterLexer, QCrypterParser, clean_errors, errors, lexErrors, synErrors } from "../../analyzer/grammar";
import { readFileSync } from "fs";
import path from "path";
import Joi, { object } from "joi";

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

    let instructions: Array<Statement> = [];
    clean_errors();

    const parser = new QCrypterParser()
    try {
        instructions = parser.parse(data);
    } catch(err){
        instructions = [];
    }

    let globalEnv: Environment = createGlobalEnv();
    let tree: Tree = new Tree(instructions, globalEnv);

    for (let instruction of tree.instructions) {
        let resValue: any;
        try{
            resValue = instruction.interpret(tree, globalEnv)
        } catch(err){
            // TODO
            console.log("------------------------------------SEMANTIC ERROR------------------------------------")
            console.log(err);
            tree.instructions = [];
        }
    }

    /*------------------------------AST------------------------------*/
    let rootCst: Node = new Node("Root");
    let nodeValue: Node = new Node("Statements");

    for (let item of tree.instructions) {
        nodeValue.addChildsNode(item.getCST());
    }

    rootCst.addChildsNode(nodeValue);

    let graph = tree.getDot(rootCst);

    let rootAst: Node = new Node("Root");
    let val: Node = new Node("Instructions");

    for (let item of tree.instructions){
        val.addChildsNode(item.getAST());
    }
    rootAst.addChildsNode(value);


    let ast: string;
    try{
        ast = tree.getDot(rootAst, false);
    } catch(err){
        ast = "";
        console.log("------------------------------------ERROR PARSING AST------------------------------------")
        console.log(err);
    }


    const errors: Errors = {
        lex: lexErrors,
        syn: synErrors,
        sem: tree.errors
    }

    const response: QCResponseObject = {
        content: tree.stdOut,
        symtable: tree.getSymbols(),
        ast: ast,
        status: /*TODO*/ 0,
        name: qcObj.name,
        err: errors
    }
    // TODO add return logic here
    /*
     * const response: QCResponseObject = await parseFile(qcObj)
     */

    //res.status(200).json(JSON.stringify(response));
    res.status(200).json(response);
});



export { router };
