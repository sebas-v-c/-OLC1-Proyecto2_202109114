import { Statement } from "../../abastract/ast";
import Environment from "../../tools/environments";
import ReturnType from "../../tools/returnType";
import { Primitive } from "../../tools/types";
import Tree from "../../tools/tree";
import { Node } from "../../abastract/ast";
import { Exception } from "../../errors";
import Table, { Column } from "../../tools/Table";

export class Insert implements Statement {
    public cols: Array<string>;
    public vals: Array<Statement>;
    constructor(public id: string, cols: Array<string>, vals: Array<Statement>, public line: number, public column: number){
        this.cols = cols;
        this.vals = vals;
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

        if (this.cols.length !== this.vals.length){
            throw new Exception('Sementic', `Operation expected ${this.cols.length} parameters, ${this.vals.length} given`, this.line, this.column, table.name);
        }

        for (let i = 0; i < this.cols.length; i++){
            let col: Column;
            try {
                col = dbTable.getColumn(this.cols[i]);
            } catch (err){
                tree.errors.push(err as Exception); throw err;
            }
            let res: ReturnType;
            try {
                res= this.vals[i].getValue(tree, table);
            } catch(err){
                tree.errors.push(err as Exception); throw err;
            }

            if (!col.isValidData(res)){
                throw new Exception("Type Error", `Value of type ${res.type} cannot be assigned to column of value ${col.type}`, this.line, this.column);
            }
        }

        let col: Column | undefined = undefined;
        for (let i = 0; i < this.cols.length; i++){
            try{
                col = dbTable.getColumn(this.cols[i]);
            } catch(err){
                tree.errors.push(err as Exception); throw err;
            }

            let res: ReturnType;
            try {
                res = this.vals[i].getValue(tree, table);
            } catch(err){
                tree.errors.push(err as Exception); throw err;
            }

            try {
                col.addData(res);
            } catch(err){
                tree.errors.push(err as Exception); throw err;
            }
        }

        // fill the rest of the table with null types
        if (col !== undefined){
            dbTable.fillNullValues(col);
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
