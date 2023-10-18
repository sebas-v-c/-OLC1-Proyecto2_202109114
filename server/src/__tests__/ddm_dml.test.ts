import { describe, expect, test } from '@jest/globals';
import { readFileSync } from 'fs';
import { QCrypterParser, QCrypterLexer } from '../analyzer/grammar';
import path from 'path';
import { Node, Statement } from '../analyzer/abastract/ast';
import Tree from '../analyzer/tools/tree';
import Environment, { createGlobalEnv } from '../analyzer/tools/environments';
import { Exception } from '../analyzer/errors';
import Symbol from '../analyzer/tools/symbol';
import { formatDate } from '../analyzer/utils/utils';
import { Primitive } from '../analyzer/tools/types';
import { Column } from '../analyzer/tools/Table';


describe("Testing Interpreter DML and DDL", function() {
    /*-------------------------------------------------TESTING-------------------------------------------------*/
    it("Testing good Create Table Input", function() {
        var testPath = path.join(__dirname, '..', '..', 'testFiles', 'good_create.test.qc');
        const data = readFileSync(testPath, 'utf8');

        /*------------------------------INSTRUCTIONS TESTING------------------------------*/
        let tree: Tree | null;
        let globalEnv: Environment | null;

        let instructions: Array<Statement>

        const parser = new QCrypterParser()
        instructions = parser.parse(data);

        tree = new Tree(instructions);

        globalEnv = createGlobalEnv();
        tree.globalTable = globalEnv;


        for (let instruction of tree.instructions) {
            let value: any = instruction.interpret(tree, globalEnv)
            let isException: boolean = value instanceof Exception;
            if (isException) {
                console.log(value);
                console.log(globalEnv);
            }

            expect(isException).toBeFalsy();
        }
        //printConsole(tree.console);
        /*------------------------------VARIABLE TESTING------------------------------*/
        let tempSym: Symbol | Exception = new Symbol("@var", Primitive.NULL, null,0, 0, globalEnv);
        tempSym = globalEnv.getSymbol(tempSym);
        if (tempSym instanceof Symbol){
            expect(tempSym.value).toBe(20);
            expect(tempSym.type).toBe(Primitive.INT);
        }
    });


    /*-------------------------------------------------TESTING-------------------------------------------------*/
    it("Testing good DDL Input", function() {
        var testPath = path.join(__dirname, '..', '..', 'testFiles', 'good_ddl.test.qc');
        const data = readFileSync(testPath, 'utf8');

        /*------------------------------INSTRUCTIONS TESTING------------------------------*/
        let tree: Tree | null;
        let globalEnv: Environment | null;

        let instructions: Array<Statement>
        const parser = new QCrypterParser()
        instructions = parser.parse(data);

        tree = new Tree(instructions);

        globalEnv = createGlobalEnv();
        tree.globalTable = globalEnv;


        for (let instruction of tree.instructions) {
            let value: any = instruction.interpret(tree, globalEnv)
            let isException: boolean = value instanceof Exception;
            if (isException) {
                console.log(value);
                console.log(globalEnv);
            }

            expect(isException).toBeFalsy();
        }
        printConsole(tree.console);
        console.log(globalEnv);
        /*------------------------------VARIABLE TESTING------------------------------*/
        const db = globalEnv.db;
        expect(db.has("personas")).toBe(true);
        expect(db.has("clientes")).toBe(false);
        const table = db.get("personas");
        expect(table).toBeTruthy();
        const lbCol = table?.getColumn("KILOS");
        expect(lbCol?.type).toBe(Primitive.DOUBLE);
        // DROP TABLE
        expect(db.has("toy")).toBe(false);
    });

    /*-------------------------------------------------TESTING-------------------------------------------------*/
    it("Testing good DML Input", function() {
        var testPath = path.join(__dirname, '..', '..', 'testFiles', 'good_dml.test.qc');
        const data = readFileSync(testPath, 'utf8');

        /*------------------------------INSTRUCTIONS TESTING------------------------------*/
        let tree: Tree | null;
        let globalEnv: Environment | null;

        let instructions: Array<Statement>

        const parser = new QCrypterParser()
        instructions = parser.parse(data);

        tree = new Tree(instructions);

        globalEnv = createGlobalEnv();
        tree.globalTable = globalEnv;


        for (let instruction of tree.instructions) {
            let value: any = instruction.interpret(tree, globalEnv)
            let isException: boolean = value instanceof Exception;
            if (isException) {
                console.log(value);
                console.log(globalEnv);
            }

            expect(isException).toBeFalsy();
        }
        printConsole(tree.console);
        /*------------------------------VARIABLE TESTING------------------------------*/
        let tempSym: Symbol | Exception = new Symbol("@var", Primitive.NULL, null,0, 0, globalEnv);
        tempSym = globalEnv.getSymbol(tempSym);
        if (tempSym instanceof Symbol){
            expect(tempSym.value).toBe(20);
            expect(tempSym.type).toBe(Primitive.INT);
        }
    });




    /*-------------------------------------------------TESTING-------------------------------------------------*/
    it("Testing good DDL and DML Input", function() {
        var testPath = path.join(__dirname, '..', '..', 'testFiles', 'good_ddl_dml.test.qc');
        const data = readFileSync(testPath, 'utf8');

        /*------------------------------INSTRUCTIONS TESTING------------------------------*/
        let tree: Tree | null;
        let globalEnv: Environment | null;

        let instructions: Array<Statement>

        const parser = new QCrypterParser()
        instructions = parser.parse(data);

        tree = new Tree(instructions);

        globalEnv = createGlobalEnv();
        tree.globalTable = globalEnv;


        for (let instruction of tree.instructions) {
            let value: any = instruction.interpret(tree, globalEnv)
            let isException: boolean = value instanceof Exception;
            if (isException) {
                console.log(value);
                console.log(globalEnv);
            }

            expect(isException).toBeFalsy();
        }
        printConsole(tree.console);
        /*------------------------------VARIABLE TESTING------------------------------*/
        let tempSym: Symbol | Exception = new Symbol("@var", Primitive.NULL, null,0, 0, globalEnv);
        tempSym = globalEnv.getSymbol(tempSym);
        if (tempSym instanceof Symbol){
            expect(tempSym.value).toBe(20);
            expect(tempSym.type).toBe(Primitive.INT);
        }
    });


});


function printConsole(cons: string){
    if (cons.length !== 0){
        console.log(cons);
    }
}
