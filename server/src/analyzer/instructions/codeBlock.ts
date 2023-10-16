import { Statement } from "../abastract/ast";
import Environment from "../tools/environments";
import ReturnType from "../tools/returnType";
import { Booleans, Primitive } from "../tools/types";
import Tree from "../tools/tree";
import { Node } from "../abastract/ast";
import { Exception } from "../errors";


export class CodeBlock implements Statement {
    public instructions: Array<Statement>;
    public line: number;
    public column: number;

    constructor(instructions: Array<Statement>, line: number, column: number,){
        this.instructions = instructions;
        this.line = line;
        this.column = column;
    }

    getValue(tree: Tree, table: Environment): ReturnType {
        return new ReturnType(Booleans.NULL, undefined);
    }

    interpret(tree: Tree, table: Environment) {
        const newEnv: Environment = new Environment(table, "if_env");

        for (let instruction of this.instructions){
            const retVar = instruction.interpret(tree, newEnv);

            if (retVar instanceof Exception){
                tree.errors.push(retVar);
                tree.updateConsole(retVar.toString());
                // i'm going to return here to see what happens
                // TODO verify this behaviour
                return retVar;
            }
        }

        return undefined;
    }

    getCST(): Node {

        return new Node("Node");
    }

    getAST(): Node {
        return new Node('NOde');
    }
}
