import { Statement } from "../abastract/ast";
import Environment from "../tools/environments";
import ReturnType from "../tools/returnType";
import { Primitive } from "../tools/types";
import Tree from "../tools/tree";
import { Node } from "../abastract/ast";
import { Exception } from "../errors";


export class Print implements Statement {
    public args: Statement;
    public line: number;
    public column: number;

    constructor(args: Statement, line: number, column: number,){
        this.args = args;
        this.line = line;
        this.column = column;
    }

    getValue(tree: Tree, table: Environment): ReturnType {
        return new ReturnType(Primitive.NULL, undefined);
    }

    interpret(tree: Tree, table: Environment) {
        let val: ReturnType = this.args.getValue(tree, table);
        if (val.value instanceof Exception){
            return val.value;
        }
        // TODO change this to be stdout
        tree.updateConsole(val.toString());
        return undefined
    }

    getCST(): Node {

        return new Node("Node");
    }

    getAST(): Node {
        return new Node('NOde');
    }




}
