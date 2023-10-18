import { Statement } from "../../abastract/ast";
import Environment from "../../tools/environments";
import ReturnType from "../../tools/returnType";
import { Primitive } from "../../tools/types";
import Tree from "../../tools/tree";
import { Node } from "../../abastract/ast";
import Table from "../../tools/Table";

interface Arg {
    id: string, type: Primitive
}

export class Create implements Statement {
    public id: string;
    public args: Array<Arg>;
    public line: number;
    public column: number;

    constructor(id: string, args: Array<Arg>, line: number, column: number,){
        this.id = id;
        this.args = args;
        this.line = line;
        this.column = column;
    }

    getValue(tree: Tree, table: Environment): ReturnType {
        return new ReturnType(Primitive.NULL, undefined);
    }

    interpret(tree: Tree, table: Environment) {
        const newDbTable = new Table(this.id);
        for (let arg of this.args){
            newDbTable.addColumn(arg.id, arg.type, this.line, this.column);
        }
        table.setTable(newDbTable, this.line, this.column);
        return undefined;
    }

    getCST(): Node {
        return new Node("Node");
    }

    getAST(): Node {
        return new Node('NOde');
    }
}
