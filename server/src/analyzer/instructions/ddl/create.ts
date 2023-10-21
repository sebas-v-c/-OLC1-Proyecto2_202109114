import { Statement } from "../../abastract/ast";
import Environment from "../../tools/environments";
import ReturnType from "../../tools/returnType";
import { Primitive } from "../../tools/types";
import Tree from "../../tools/tree";
import { Node } from "../../abastract/ast";
import Table from "../../tools/Table";
import { Exception } from "../../errors";

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
        try {
            table.setTable(newDbTable, this.line, this.column);
        } catch(err){
            tree.errors.push(err as Exception); throw err;
        }
    }

    getCST(): Node {
        return new Node("Node");
    }

    getAST(): Node {
        let node: Node = new Node("CREATE");
        node.addChild(this.id);
        let colNode = new Node("COLUMNS");
        for (let arg of this.args){
            colNode.addChild(arg.id);
            colNode.addChild(arg.type.toUpperCase());
        }
        node.addChildsNode(colNode);
        return node;
    }
}
