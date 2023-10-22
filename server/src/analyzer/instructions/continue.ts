import { Node, Statement } from "../abastract/ast";
import { Exception } from "../errors";
import Environment from "../tools/environments";
import ReturnType from "../tools/returnType";
import Tree from "../tools/tree";
import { Primitive } from "../tools/types";
import Symbol from "../tools/symbol";



export class Continue implements Statement {
    public line;
    public column;

    constructor(line: number, column: number){
        this.line = line;
        this.column = column;
    }

    getValue(tree: Tree, table: Environment): ReturnType {
        return new ReturnType(Primitive.NULL, null);
    }

    interpret(tree: Tree, table: Environment) {
        return this.getValue(tree, table);
    }

    getAST(): Node{
        return new Node("Continue");
    }

    getCST(): Node {
        return new Node("Node");
    }
}
