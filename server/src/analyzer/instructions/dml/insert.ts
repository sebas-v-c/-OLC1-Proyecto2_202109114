import { Statement } from "../../abastract/ast";
import Environment from "../../tools/environments";
import ReturnType from "../../tools/returnType";
import { Primitive } from "../../tools/types";
import Tree from "../../tools/tree";
import { Node } from "../../abastract/ast";
import { Exception } from "../../errors";

export class Insert implements Statement {
    public cols: Array<string>;
    public vals: Array<Statement>;
    constructor(public id: string, cols: Array<string>, vals: Array<Statement>, public line: number, public column: number){
        this.cols = cols;
    }

    getValue(tree: Tree, table: Environment): ReturnType {
        return new ReturnType(Primitive.NULL, undefined);
    }


    // TODO
    interpret(tree: Tree, table: Environment) {
    }

    getCST(): Node {
        return new Node("Node");
    }

    getAST(): Node {
        return new Node('NOde');
    }
}
