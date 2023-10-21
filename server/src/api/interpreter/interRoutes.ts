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

    const lexer = new QCrypterLexer();
    let any = lexer.setInput(data, {})
        // TODO create a token list
    let tokens: Array<any> = [];

    while (!any.done){
        let token = any.next();
        if (typeof token === "string"){
            tokens.push(token)
        }
    }



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

    let len = 0;
    try {
        len = tree.instructions.length;
    } catch(err){}

    for (let i = 0; i < len; i++){
        let resValue: any;
        try{
            resValue = tree.instructions[i].interpret(tree, globalEnv);
        } catch(err){
            // TODO
            console.log("------------------------------------SEMANTIC ERROR------------------------------------")
            console.log(err);
            len = 0;
            tree.instructions = [];
        }
    }

    /*------------------------------AST------------------------------*/
    /*
    let rootCst: Node = new Node("Root");
    let nodeValue: Node = new Node("Statements");

    for (let i = 0; i < len; i++){
        nodeValue.addChildsNode(tree.instructions[i].getCST());
    }

    rootCst.addChildsNode(nodeValue);

    let graph = tree.getDot(rootCst);
    */

    let rootAst: Node = new Node("ROOT");
    let val: Node = new Node("INSTRUCTIONS");

    for (let i = 0; i < len; i++){
        val.addChildsNode(tree.instructions[i].getAST());
    }

    rootAst.addChildsNode(val);


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

    let statusCode = 0;
    if (lexErrors.length > 0 || synErrors.length > 0){
        statusCode = 1;
    } else if (synErrors.length > 0){
        statusCode = 2
    } else if(tree.errors.length > 0) {
        statusCode = 3;
    }


    const response: QCResponseObject = {
        status: statusCode,
        content: tree.stdOut,
        symtable: tree.getSymbols(),
        ast: ast,
        name: qcObj.name,
        err: errors,
        tokens: tokens
    }
    // TODO add return logic here
    /*
     * const response: QCResponseObject = await parseFile(qcObj)
     */

    //res.status(200).json(JSON.stringify(response));
    res.status(200).json(response);
});



export { router };
