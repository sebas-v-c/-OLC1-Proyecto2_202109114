
import { Statement } from "../../abastract/ast";
import Environment from "../../tools/environments";
import ReturnType from "../../tools/returnType";
import { Primitive } from "../../tools/types";
import Tree from "../../tools/tree";
import { Node } from "../../abastract/ast";
import { Exception } from "../../errors";
import Table, { Column } from "../../tools/Table";
import { WherePredicate } from "./wherePredicate";


export class SelectTable implements Statement {
    public cols: Array<Statement>;
    public cond: WherePredicate;
    constructor(cols: Array<Statement>, public id: string,  cond: WherePredicate ,public line: number, public column: number){
        this.cols = cols;
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

        for (let colvalue of this.colVal){
            try{
                for (let index of arr){
                    const col = dbTable.getColumn(colvalue.col);
                    let res = colvalue.val.getValue(tree, table);
                    if (!col.isValidData(res)){
                        throw new Exception("Type Error", `Variable of type '${res.type}' cannot be assigned to column of type '${col.type}'`, 0, 0);
                    }
                    col.data[index] = colvalue.val.getValue(tree, table);
                    dbTable.updateColumn(col);
                }
            } catch(err){
                tree.errors.push(err as Exception); throw err;
            }

        }
    }


    getCST(): Node {
        return new Node("Node");
    }

    getAST(): Node {
        return new Node('NOde');
    }
}



export class SelectExpr implements Statement {
    public expr: Statement;
    public colName: string;
    constructor(expr: Statement, colName: string, public line: number, public column: number){
        this.expr = expr;
        this.colName = colName;
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

        for (let colvalue of this.colVal){
            try{
                for (let index of arr){
                    const col = dbTable.getColumn(colvalue.col);
                    let res = colvalue.val.getValue(tree, table);
                    if (!col.isValidData(res)){
                        throw new Exception("Type Error", `Variable of type '${res.type}' cannot be assigned to column of type '${col.type}'`, 0, 0);
                    }
                    col.data[index] = colvalue.val.getValue(tree, table);
                    dbTable.updateColumn(col);
                }
            } catch(err){
                tree.errors.push(err as Exception); throw err;
            }

        }
    }


    getCST(): Node {
        return new Node("Node");
    }

    getAST(): Node {
        return new Node('NOde');
    }
}
