import { describe, expect, test } from '@jest/globals';
import { readFile, readFileSync } from 'fs';
//@ts-ignore
import { lexErrors, synErrors, ast, grammar, parser} from '../analyzer/grammar.js';
import path from 'path';
import { Node, Statement } from '../analyzer/abastract/ast';
import Tree from '../analyzer/tools/tree';
import Environment, { createGlobalEnv } from '../analyzer/tools/environments';


describe("Testing Interpreter", function() {
    it("Testing good Input", function() {
        var testPath = path.join(__dirname, '..', '..', 'testFiles', 'good_declare_assign.test.qc');
        const data = readFileSync(testPath, 'utf8');

        let tree: Tree | null;
        let globalEnv: Environment | null;

        let instructions: Array<Statement>

        instructions = parser.parse(data);

        tree = new Tree(instructions);

        globalEnv = createGlobalEnv();
        tree.globalTable = globalEnv;

        for (let instruction of tree.instructions) {
            console.log(typeof(instruction))
            let value: any = instruction.interpret(tree, globalEnv)
        }

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
});
