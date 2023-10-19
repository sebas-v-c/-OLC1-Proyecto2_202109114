import { Statement } from "../../abastract/ast";
import Environment from "../../tools/environments";
import ReturnType from "../../tools/returnType";
import { Primitive } from "../../tools/types";
import Tree from "../../tools/tree";
import { Node } from "../../abastract/ast";
import { Exception } from "../../errors";
import Table, { Column } from "../../tools/Table";
import { WherePredicate } from "./wherePredicate";
import { threadId } from "worker_threads";


export class Delete implements Statement {
    public cond: WherePredicate;
    constructor(public id: string, cond: WherePredicate ,public line: number, public column: number){
        this.cond = cond;
    }

    getValue(tree: Tree, table: Environment): ReturnType {
        return new ReturnType(Primitive.NULL, undefined);
    }


    interpret(tree: Tree, table: Environment) {
        let dbTable: Table;
        try{
            dbTable = table.getTable(this.id, this.line, this.column);
        } catch(err){
            tree.errors.push(err as Exception); throw err;
        }

        let arr: Array<number> = [];
        try {
            arr = this.cond.getColumnIndexes(tree, table, dbTable);
        } catch(err){
            tree.errors.push(err as Exception); throw err;
        }


        try {
            for (let index of arr){
                for (let key of dbTable.columns.keys()){
                    const col = dbTable.getColumn(key);
                    col.data.splice(index, 1);
                    dbTable.updateColumn(col);
                }
            }
        } catch(err){
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
