import { Statement } from "../../abastract/ast";
import Environment from "../../tools/environments";
import ReturnType from "../../tools/returnType";
import { Primitive } from "../../tools/types";
import Tree from "../../tools/tree";
import { Node } from "../../abastract/ast";
import { Exception } from "../../errors";
import Table from "../../tools/Table";

export class Drop implements Statement {
    constructor(public id: string, public line: number, public column: number,){}

    getValue(tree: Tree, table: Environment): ReturnType {
        return new ReturnType(Primitive.NULL, undefined);
    }


    interpret(tree: Tree, table: Environment) {
        let dbTable: Table;
        try {
            dbTable = table.getTable(this.id, this.line, this.column);
        } catch(err){
            tree.errors.push(err as Exception); throw err;
        }

        try{
            table.dropTable(dbTable, this.line, this.column);
        }catch(err){
            tree.errors.push(err as Exception); throw err;
        }
    }

    getCST(): Node {
        return new Node("Node");
    }

    getAST(): Node {
        return new Node('NOde');
    }
}
