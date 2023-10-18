import { Statement } from "../../abastract/ast";
import Environment from "../../tools/environments";
import ReturnType from "../../tools/returnType";
import { Primitive } from "../../tools/types";
import Tree from "../../tools/tree";
import { Node } from "../../abastract/ast";
import { Exception } from "../../errors";
import { Column } from "../../tools/Table";

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
        let dbTable = table.getTable(this.id, this.line, this.column);
        if (dbTable instanceof Exception){
            return dbTable;
        }

        if (this.cols.length !== this.vals.length){
            return new ReturnType(Primitive.NULL, new Exception('Sementic', `Operation expected ${this.cols.length} parameters, ${this.vals.length} given`, this.line, this.column, table.name));
        }

        for (let i = 0; i < this.cols.length; i++){
            let col = dbTable.getColumn(this.cols[i]);

            if (col instanceof Exception){ return col; }
            let res: ReturnType = this.vals[i].getValue(tree, table);
            if (res.value instanceof Exception){
                return res.value;
            }

            if (!col.isValidData(res)){
                return new Exception("Type Error", `Value of type ${res.type} cannot be assigned to column of value ${col.type}`, this.line, this.column);
            }
        }

        let col: Column | Exception | undefined = undefined;
        for (let i = 0; i < this.cols.length; i++){
            col = dbTable.getColumn(this.cols[i]);

            if (col instanceof Exception){ return col; }

            let res: ReturnType = this.vals[i].getValue(tree, table);

            if (res.value instanceof Exception){
                return res.value;
            }
            let resCol: Exception | undefined = col.addData(res)
            if (resCol instanceof Exception){
                return resCol;
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
