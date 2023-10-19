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


describe("Testing Interpreter Logics", function() {
    /*-------------------------------------------------TESTING-------------------------------------------------*/
    it("Testing good assign declare Input", function() {
        var testPath = path.join(__dirname, '..', '..', 'testFiles', 'good_declare_assign.test.qc');
        const data = readFileSync(testPath, 'utf8');

        /*------------------------------INSTRUCTIONS TESTING------------------------------*/
        let tree: Tree | null;
        let globalEnv: Environment | null;

        let instructions: Array<Statement>

        const lexer = new QCrypterLexer();
        let any = lexer.setInput(data, {})
        // TODO create a token list
        let tokens: Array<any> = [];

        while (!any.done){
            let token = any.next();
            if (token !== false ){
                tokens.push(token)
            }
        }

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
        let tempSym: Symbol | Exception = new Symbol("@var1", Primitive.NULL, null,0, 0, globalEnv);
        tempSym = globalEnv.getSymbol(tempSym);
        if (tempSym instanceof Symbol){
            expect(tempSym.value).toBe(5);
            expect(tempSym.type).toBe(Primitive.INT);
        }
        tempSym = new Symbol("@var2", Primitive.NULL, null,0, 0, globalEnv);
        tempSym = globalEnv.getSymbol(tempSym);
        if (tempSym instanceof Symbol){
            expect(tempSym.value).toBe("simon");
            expect(tempSym.type).toBe(Primitive.VARCHAR);
        }
        tempSym = new Symbol("@var3", Primitive.NULL, null,0, 0, globalEnv);
        tempSym = globalEnv.getSymbol(tempSym);
        if (tempSym instanceof Symbol){
            expect(tempSym.value).toBe(true);
            expect(tempSym.type).toBe(Primitive.BOOLEAN);
        }
        tempSym = new Symbol("@var4", Primitive.NULL, null,0, 0, globalEnv);
        tempSym = globalEnv.getSymbol(tempSym);
        if (tempSym instanceof Symbol){
            expect(tempSym.value).toBe(false);
            expect(tempSym.type).toBe(Primitive.BOOLEAN);
        }
        tempSym = new Symbol("@var5", Primitive.NULL, null,0, 0, globalEnv);
        tempSym = globalEnv.getSymbol(tempSym);
        if (tempSym instanceof Symbol){
            expect(tempSym.value).toBe(3.1415912);
            expect(tempSym.type).toBe(Primitive.DOUBLE);
        }
        tempSym = new Symbol("@var6", Primitive.NULL, null,0, 0, globalEnv);
        tempSym = globalEnv.getSymbol(tempSym);
        if (tempSym instanceof Symbol){
            expect(formatDate(tempSym.value)).toBe("2023-10-21");

            expect(tempSym.type).toBe(Primitive.DATE);
        }
        tempSym = new Symbol("@var7", Primitive.NULL, null,0, 0, globalEnv);
        tempSym = globalEnv.getSymbol(tempSym);
        if (tempSym instanceof Symbol){
            expect(tempSym.value).toBe(null);
            expect(tempSym.type).toBe(Primitive.NULL);
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
        let value: Node = new Node("Instructions");

        for (let item of tree.instructions) {
            value.addChildsNode(item.getAST());
        }

        rootAst.addChildsNode(value);

        let ast = tree.getDot(rootAst, false);

    });

    /*-------------------------------------------------TESTING-------------------------------------------------*/
    it("Testing good if structure Input", function() {
        var testPath = path.join(__dirname, '..', '..', 'testFiles', 'good_if.test.qc');
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
        let tempSym: Symbol | Exception = new Symbol("@var", Primitive.NULL, null,0, 0, globalEnv);
        tempSym = globalEnv.getSymbol(tempSym);
        if (tempSym instanceof Symbol){
            expect(tempSym.value).toBe(20);
            expect(tempSym.type).toBe(Primitive.INT);
        }
    });

    /*-------------------------------------------------TESTING-------------------------------------------------*/
    it("Testing good for structure Input", function() {
        var testPath = path.join(__dirname, '..', '..', 'testFiles', 'good_for.test.qc');
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
        let tempSym: Symbol | Exception = new Symbol("@sumatoria", Primitive.NULL, null,0, 0, globalEnv);
        tempSym = globalEnv.getSymbol(tempSym);
        if (tempSym instanceof Symbol){
            expect(tempSym.value).toBe(45);
            expect(tempSym.type).toBe(Primitive.INT);
        }
        tempSym = new Symbol("@chi", Primitive.NULL, null,0, 0, globalEnv);
        tempSym = globalEnv.getSymbol(tempSym);
        if (tempSym instanceof Symbol){
            expect(tempSym.value).toBe(21);
            expect(tempSym.type).toBe(Primitive.INT);
        }
    });

    /*-------------------------------------------------TESTING-------------------------------------------------*/
    it("Testing good cases structure Input", function() {
        var testPath = path.join(__dirname, '..', '..', 'testFiles', 'good_case.test.qc');
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
        let tempSym: Symbol | Exception = new Symbol("@mensaje", Primitive.NULL, null,0, 0, globalEnv);
        tempSym = globalEnv.getSymbol(tempSym);
        if (tempSym instanceof Symbol){
            expect(tempSym.value).toBe("Muy Bueno");
            expect(tempSym.type).toBe(Primitive.VARCHAR);
        }
        tempSym = new Symbol("@aprobado", Primitive.NULL, null,0, 0, globalEnv);
        tempSym = globalEnv.getSymbol(tempSym);
        if (tempSym instanceof Symbol){
            expect(tempSym.value).toBe("Aprobado");
            expect(tempSym.type).toBe(Primitive.VARCHAR);
        }
        tempSym = new Symbol("@mensaje2", Primitive.NULL, null,0, 0, globalEnv);
        tempSym = globalEnv.getSymbol(tempSym);
        if (tempSym instanceof Symbol){
            expect(tempSym.value).toBe("APROBADO");
            expect(tempSym.type).toBe(Primitive.VARCHAR);
        }
    });

    /*-------------------------------------------------TESTING-------------------------------------------------*/
    it("Testing good while structure Input", function() {
        var testPath = path.join(__dirname, '..', '..', 'testFiles', 'good_while.test.qc');
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
        let tempSym: Symbol | Exception = new Symbol("@contador", Primitive.NULL, null,0, 0, globalEnv);
        tempSym = globalEnv.getSymbol(tempSym);
        if (tempSym instanceof Symbol){
            expect(tempSym.value).toBe(10);
            expect(tempSym.type).toBe(Primitive.INT);
        }
    });


    /*-------------------------------------------------TESTING-------------------------------------------------*/
    it("Testing good print structure Input", function() {
        var testPath = path.join(__dirname, '..', '..', 'testFiles', 'good_print.test.qc');
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
        /*------------------------------VARIABLE TESTING------------------------------*/
        //printConsole(tree.console);
    });

    /*-------------------------------------------------TESTING-------------------------------------------------*/
    it("Testing functions and methods Input", function() {
        var testPath = path.join(__dirname, '..', '..', 'testFiles', 'good_function.test.qc');
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
        let tempSym: Symbol | Exception = new Symbol("@result", Primitive.NULL, null,0, 0, globalEnv);
        tempSym = globalEnv.getSymbol(tempSym);
        if (tempSym instanceof Symbol){
            expect(tempSym.value).toBe(78.53975);
            expect(tempSym.type).toBe(Primitive.DOUBLE);
        }
    });

    /*-------------------------------------------------TESTING-------------------------------------------------*/
    it("Testing native functions Input", function() {
        var testPath = path.join(__dirname, '..', '..', 'testFiles', 'good_native_funcs.test.qc');
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
        // Testing typeof
        let tempSym: Symbol = new Symbol("@res1", Primitive.NULL, null,0, 0, globalEnv);
        tempSym = globalEnv.getSymbol(tempSym);
        expect(tempSym.value).toBe(Primitive.INT);
        expect(tempSym.type).toBe(Primitive.VARCHAR);
        tempSym = new Symbol("@res2", Primitive.NULL, null,0, 0, globalEnv);
        tempSym = globalEnv.getSymbol(tempSym);
        expect(tempSym.value).toBe(Primitive.VARCHAR);
        expect(tempSym.type).toBe(Primitive.VARCHAR);
        tempSym = new Symbol("@res3", Primitive.NULL, null,0, 0, globalEnv);
        tempSym = globalEnv.getSymbol(tempSym);
        expect(tempSym.value).toBe(Primitive.BOOLEAN);
        expect(tempSym.type).toBe(Primitive.VARCHAR);
        tempSym = new Symbol("@res4", Primitive.NULL, null,0, 0, globalEnv);
        tempSym = globalEnv.getSymbol(tempSym);
        expect(tempSym.value).toBe(Primitive.BOOLEAN);
        expect(tempSym.type).toBe(Primitive.VARCHAR);
        tempSym = new Symbol("@res5", Primitive.NULL, null,0, 0, globalEnv);
        tempSym = globalEnv.getSymbol(tempSym);
        expect(tempSym.value).toBe(Primitive.DOUBLE);
        expect(tempSym.type).toBe(Primitive.VARCHAR);
        tempSym = new Symbol("@res6", Primitive.NULL, null,0, 0, globalEnv);
        tempSym = globalEnv.getSymbol(tempSym);
        expect(tempSym.value).toBe(Primitive.DATE);
        expect(tempSym.type).toBe(Primitive.VARCHAR);
        tempSym = new Symbol("@res7", Primitive.NULL, null,0, 0, globalEnv);
        tempSym = globalEnv.getSymbol(tempSym);
        expect(tempSym.value).toBe(Primitive.NULL);
        expect(tempSym.type).toBe(Primitive.VARCHAR);
        // testing lower
        tempSym = new Symbol("@resLower", Primitive.NULL, null,0, 0, globalEnv);
        tempSym = globalEnv.getSymbol(tempSym);
        expect(tempSym.value).toBe("simon");
        expect(tempSym.type).toBe(Primitive.VARCHAR);
        // testing upper
        tempSym = new Symbol("@resUpper", Primitive.NULL, null,0, 0, globalEnv);
        tempSym = globalEnv.getSymbol(tempSym);
        expect(tempSym.value).toBe("SIMON");
        expect(tempSym.type).toBe(Primitive.VARCHAR);
        // testing round
        tempSym = new Symbol("@resRound", Primitive.NULL, null,0, 0, globalEnv);
        tempSym = globalEnv.getSymbol(tempSym);
        expect(tempSym.value).toBe(3.1416);
        expect(tempSym.type).toBe(Primitive.DOUBLE);
        // testing len
        tempSym = new Symbol("@resLen", Primitive.NULL, null,0, 0, globalEnv);
        tempSym = globalEnv.getSymbol(tempSym);
        expect(tempSym.value).toBe(5);
        expect(tempSym.type).toBe(Primitive.INT);
        // testing truncate
        tempSym = new Symbol("@resTrunc", Primitive.NULL, null,0, 0, globalEnv);
        tempSym = globalEnv.getSymbol(tempSym);
        expect(tempSym.value).toBe(3.1415);
        expect(tempSym.type).toBe(Primitive.DOUBLE);

    });



    /*-------------------------------------------------TESTING-------------------------------------------------*/
    /*
    it("Testing all logical features Input", function() {
        var testPath = path.join(__dirname, '..', '..', 'testFiles', 'good_features.test.qc');
        const data = readFileSync(testPath, 'utf8');
    */
        /*------------------------------INSTRUCTIONS TESTING------------------------------*/
        /*
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
        */

        /*------------------------------VARIABLE TESTING------------------------------*/
        /*
        let tempSym: Symbol | Exception = new Symbol("@result", Primitive.NULL, null,0, 0, globalEnv);
        tempSym = globalEnv.getSymbol(tempSym);
        if (tempSym instanceof Symbol){
            expect(tempSym.value).toBe(78.53975);
            expect(tempSym.type).toBe(Primitive.DOUBLE);
        }

    });
    */

});


function printConsole(cons: string){
    if (cons.length !== 0){
        console.log(cons);
    }
}
