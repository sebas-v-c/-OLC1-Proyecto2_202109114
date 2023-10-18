import { Statement } from "../../abastract/ast";
import Environment from "../../tools/environments";
import ReturnType from "../../tools/returnType";
import { Primitive } from "../../tools/types";
import Tree from "../../tools/tree";
import { Node } from "../../abastract/ast";
import { Exception } from "../../errors";

export class Insert implements Statement {
    constructor(public id: string, public line: number, public column: number){}

    getValue(tree: Tree, table: Environment): ReturnType {
        return new ReturnType(Primitive.NULL, undefined);
    }


    // TODO
    interpret(tree: Tree, table: Environment) {
        let dbTable = table.getTable(this.id, this.line, this.column);
        if (dbTable instanceof Exception){
            return dbTable;
        }
        return table.dropTable(dbTable, this.line, this.column);
    }

    getCST(): Node {
        return new Node("Node");
    }

    getAST(): Node {
        return new Node('NOde');
    }
}
