import { describe, expect, test } from '@jest/globals';
import { readFileSync } from 'fs';
import { QCrypterParser, QCrypterLexer } from '../analyzer/grammar';
import path from 'path';
import { Node, Statement } from '../analyzer/abastract/ast';
import Tree from '../analyzer/tools/tree';
import Environment, { createGlobalEnv } from '../analyzer/tools/environments';
import { Exception } from '../analyzer/errors';
import Symbol from '../analyzer/tools/symbol';
import { Booleans, Numerics, Primitive, Strings } from '../analyzer/tools/types';


describe("Testing Interpreter", function() {
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
            let value: any = instruction.interpret(tree, globalEnv)
            let isException: boolean = value instanceof Exception;
            if (isException) {
                console.log(value);
                console.log(globalEnv);
            }

            expect(isException).toBeFalsy();
        }
        /*------------------------------VARIABLE TESTING------------------------------*/
        let tempSym: Symbol | Exception = new Symbol("@var1", Booleans.NULL, null,0, 0, globalEnv);
        tempSym = globalEnv.getSymbol(tempSym);
        if (tempSym instanceof Symbol){
            expect(tempSym.value).toBe(5);
            expect(tempSym.type).toBe(Numerics.INT);
        }
        tempSym = new Symbol("@var2", Booleans.NULL, null,0, 0, globalEnv);
        tempSym = globalEnv.getSymbol(tempSym);
        if (tempSym instanceof Symbol){
            expect(tempSym.value).toBe("simon");
            expect(tempSym.type).toBe(Strings.VARCHAR);
        }
        tempSym = new Symbol("@var3", Booleans.NULL, null,0, 0, globalEnv);
        tempSym = globalEnv.getSymbol(tempSym);
        if (tempSym instanceof Symbol){
            expect(tempSym.value).toBe(true);
            expect(tempSym.type).toBe(Booleans.BOOLEAN);
        }
        tempSym = new Symbol("@var4", Booleans.NULL, null,0, 0, globalEnv);
        tempSym = globalEnv.getSymbol(tempSym);
        if (tempSym instanceof Symbol){
            expect(tempSym.value).toBe(false);
            expect(tempSym.type).toBe(Booleans.BOOLEAN);
        }
        tempSym = new Symbol("@var5", Booleans.NULL, null,0, 0, globalEnv);
        tempSym = globalEnv.getSymbol(tempSym);
        if (tempSym instanceof Symbol){
            expect(tempSym.value).toBe(3.1415912);
            expect(tempSym.type).toBe(Numerics.DOUBLE);
        }
        tempSym = new Symbol("@var6", Booleans.NULL, null,0, 0, globalEnv);
        tempSym = globalEnv.getSymbol(tempSym);
        if (tempSym instanceof Symbol){
            expect(tempSym.value).toBe("2023-10-16");
            expect(tempSym.type).toBe(Strings.DATE);
        }
        tempSym = new Symbol("@var7", Booleans.NULL, null,0, 0, globalEnv);
        tempSym = globalEnv.getSymbol(tempSym);
        if (tempSym instanceof Symbol){
            expect(tempSym.value).toBe(null);
            expect(tempSym.type).toBe(Booleans.NULL);
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
            let value: any = instruction.interpret(tree, globalEnv)
            let isException: boolean = value instanceof Exception;
            if (isException) {
                console.log(value);
                console.log(globalEnv);
            }
            expect(isException).toBeFalsy();
        }
        console.log(globalEnv);
        /*------------------------------VARIABLE TESTING------------------------------*/
        let tempSym: Symbol | Exception = new Symbol("@var1", Booleans.NULL, null,0, 0, globalEnv);
        tempSym = globalEnv.getSymbol(tempSym);
        if (tempSym instanceof Symbol){
            expect(tempSym.value).toBe(5);
            expect(tempSym.type).toBe(Numerics.INT);
        }

    });


});
