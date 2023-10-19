import { describe, expect, test } from '@jest/globals';
import { readFileSync } from 'fs';
import { QCrypterParser, QCrypterLexer } from '../analyzer/grammar';
import path from 'path';
import { Node, Statement } from '../analyzer/abastract/ast';
import Tree from '../analyzer/tools/tree';
import Environment, { createGlobalEnv } from '../analyzer/tools/environments';
import { Exception } from '../analyzer/errors';
import Symbol from '../analyzer/tools/symbol';
import { Primitive } from '../analyzer/tools/types';
import Table, { Column } from '../analyzer/tools/Table';


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
            let value;
            try{
                value = instruction.interpret(tree, globalEnv)
            } catch(err){
                console.log("----------------------------------ERROR VAL----------------------------------")
                console.log(err);
                console.log("----------------------------------VALUE RETURNED----------------------------------")
                console.log(value);
                console.log("----------------------------------GLOBAL ENV----------------------------------")
                console.log(globalEnv);
                console.log("----------------------------------ERRORS FROM TREE----------------------------------")
                console.log(tree.errors);
                expect(err).toBeFalsy();
            }
        }
        //printConsole(tree.console);
        /*------------------------------VARIABLE TESTING------------------------------*/
        /*
        let tempSym: Symbol | Exception = new Symbol("@var", Primitive.NULL, null,0, 0, globalEnv);
        tempSym = globalEnv.getSymbol(tempSym);
        if (tempSym instanceof Symbol){
            expect(tempSym.value).toBe(20);
            expect(tempSym.type).toBe(Primitive.INT);
        }
        */
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
            let value;
            try{
                value = instruction.interpret(tree, globalEnv)
            } catch(err){
                console.log("----------------------------------ERROR VAL----------------------------------")
                console.log(err);
                console.log("----------------------------------VALUE RETURNED----------------------------------")
                console.log(value);
                console.log("----------------------------------GLOBAL ENV----------------------------------")
                console.log(globalEnv);
                console.log("----------------------------------ERRORS FROM TREE----------------------------------")
                console.log(tree.errors);
                expect(err).toBeFalsy();
            }
        }
        printConsole(tree.console);
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
            let value;
            try{
                value = instruction.interpret(tree, globalEnv)
            } catch(err){
                console.log("----------------------------------ERROR VAL----------------------------------")
                console.log(err);
                console.log("----------------------------------VALUE RETURNED----------------------------------")
                console.log(value);
                console.log("----------------------------------GLOBAL ENV----------------------------------")
                console.log(globalEnv);
                console.log("----------------------------------ERRORS FROM TREE----------------------------------")
                console.log(tree.errors);
                expect(err).toBeFalsy();
            }
        }
        printConsole(tree.console);
        /*------------------------------VARIABLE TESTING------------------------------*/
        /*ISERTING VALUES*/
        let env = globalEnv.db.get("clientes");
        if (env instanceof Table){
            let col = env.columns.get("id_cliente");
            if (col instanceof Column){
                expect(col.data[0].value).toBe(null);
            }
            col = env.columns.get("nombre");
            if (col instanceof Column){
                expect(col.data[0].value).toBe("Juan Perez");
            }
            col = env.columns.get("correoelectronico");
            if (col instanceof Column){
                expect(col.data[0].value).toBe("juan@example.com");
            }
        }
        let val: Column | undefined = globalEnv.db.get("clientes")?.getColumn("nombre");
        if (val instanceof Column){
            expect(val.data[0].value).toBe("Juan Perez");
        } else { throw new Exception("test", "Column doesnt exist", 0, 0); }
        val = globalEnv.db.get("clientes")?.getColumn("correoelectronico");

        if (val instanceof Column){
            expect(val.data[0].value).toBe("juan@example.com");
        } else { throw new Exception("test", "Column doesnt exist", 0, 0); }
        /*UPDATING VALUES*/
        env = globalEnv.db.get("clientes2");
        if (env instanceof Table){
            let col = env.columns.get("id_cliente");
            if (col instanceof Column){
                expect(col.data[1].value).toBe(1987344);
            }
            col = env.columns.get("nombre");
            if (col instanceof Column){
                expect(col.data[1].value).toBe("Aquiles Castro");
            }
            col = env.columns.get("correoelectronico");
            if (col instanceof Column){
                expect(col.data[0].value).toBe("correodiferente@maje.com");


            }

        }

        /*
        let tempSym: Symbol | Exception = new Symbol("@var", Primitive.NULL, null,0, 0, globalEnv);
        tempSym = globalEnv.getSymbol(tempSym);
        if (tempSym instanceof Symbol){
            expect(tempSym.value).toBe(20);
            expect(tempSym.type).toBe(Primitive.INT);
        }
        */
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
            let value;
            try{
                value = instruction.interpret(tree, globalEnv)
            } catch(err){
                console.log("----------------------------------ERROR VAL----------------------------------")
                console.log(err);
                console.log("----------------------------------VALUE RETURNED----------------------------------")
                console.log(value);
                console.log("----------------------------------GLOBAL ENV----------------------------------")
                console.log(globalEnv);
                console.log("----------------------------------ERRORS FROM TREE----------------------------------")
                console.log(tree.errors);
                expect(err).toBeFalsy();
            }
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
