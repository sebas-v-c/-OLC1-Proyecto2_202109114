
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
    public toPrint: boolean;
    constructor(cols: Array<Statement>, public id: string,  cond: WherePredicate ,public line: number, public column: number){
        this.cols = cols;
        this.cond = cond;
        this.toPrint = true;
    }

    getValue(tree: Tree, table: Environment): ReturnType {
        this.toPrint = false;
        let res = this.interpret(tree, table)
        if (res instanceof ReturnType){
            return res;
        }
        throw new Exception("Semantic", `Incorrect use of Select at line: ${this.line}, column: ${this.column}`, this.line,this.column);
    }

    interpret(tree: Tree, table: Environment) {
        let dbTable: Table;
        try{
            dbTable = table.getTable(this.id, this.line, this.column);
        } catch(err){
            tree.errors.push(err as Exception); throw err;
        }

        let arr: Array<number> = [];
        if (this.cond !== undefined){
            try {
                arr = this.cond.getColumnIndexes(tree, table, dbTable);
            } catch (err) {
                tree.errors.push(err as Exception); throw err;
            }
        } else {
            let len: number =0;
            try {
                len = dbTable.getTableLength();
            } catch (err){}
            arr = Array.from({ length: len }, (_, index) => index)
        }

        let resArr: Array<string> = [];

        for (let item of this.cols){
            try{
                resArr.push(item.getValue(tree, table).value.toLowerCase());
            } catch(err){
                tree.errors.push(err as Exception); throw err;
            }
        }


        // all cols from the table
        let tableRows: Array<Array<ReturnType>> = [];
        let colNames: Array<string>;
        try{
            colNames = [...dbTable.columns.keys()];
        } catch(err){
            tree.errors.push(err as Exception); throw err;
        }
        if (resArr[0] === "*"){
            try {
                for (let item of arr){
                    let row: Array<ReturnType> = [];
                    for (let key of dbTable.columns.keys()) {
                        let col = dbTable.getColumn(key);
                        row.push(col.data[item]);
                    }
                    tableRows.push(row);
                }
            } catch(err){
                tree.errors.push(err as Exception); throw err;
            }
        } else {
            try {
                colNames = [...dbTable.columns.keys()];
                for (let item of arr){
                    let row: Array<ReturnType> = [];
                    for (let i = 0; i < colNames.length; i++) {
                        if (resArr.includes(colNames[i])){
                            let col = dbTable.getColumn(colNames[i]);
                            row.push(col.data[item]);
                        }
                    }
                    tableRows.push(row);
                }
            } catch(err){
                tree.errors.push(err as Exception); throw err;
            }
        }
        if (this.toPrint){
            if (resArr[0] !== "*"){
                printTable(tableRows, colNames.filter((item) => resArr.includes(item)), this.id,tree);
            } else {
                printTable(tableRows, colNames, this.id, tree);
            }
        } else {
            // TODO changes this as needed
            // return the first item of the first row by default, this allow us to treat this as an expression
            return tableRows[0][0];
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
    public toPrint: boolean;
    constructor(expr: Statement, colName: string, public line: number, public column: number){
        this.expr = expr;
        this.colName = colName;
        this.toPrint = true;
    }

    getValue(tree: Tree, table: Environment): ReturnType {
        this.toPrint = false;
        let res: any;
        res = this.interpret(tree, table)
        if (res instanceof ReturnType){
            return res;
        }
        throw new Exception("Semantic", `Incorrect use of Select at line: ${this.line}, column: ${this.column}`, this.line,this.column);
    }

    interpret(tree: Tree, table: Environment) {
        let res: ReturnType = new ReturnType(Primitive.NULL, undefined);
        try {
            res = this.expr.getValue(tree, table);
            if (this.colName === undefined){
                this.toPrint = false;
            }
        } catch(err){
            tree.errors.push(err as Exception); throw err;
        }

        if (this.toPrint){
            printTable([[res]], [this.colName], "" ,tree)
            return undefined;
        } else {
            return res;
        }
    }


    getCST(): Node {
        return new Node("Node");
    }

    getAST(): Node {
        return new Node('NOde');
    }
}


function printTable(tableRows: Array<Array<ReturnType>>, columns: Array<string>, tableName: string, tree: Tree): void {
        const tbRows = tableRows.map(rowData => {
            const cells = rowData.map(cellData => `<td>${cellData.value}</td>`).join('');
            return `<tr>${cells}</tr>`;
        });

        const table =`
    <table>
        <caption>${tableName}</caption>
      <thead>
        <tr>
          ${columns.map(columnName => `<th>${columnName}</th>`).join('')}
        </tr>
      </thead>
      <tbody>
        ${tbRows.join('')}
      </tbody>
    </table>
`;
        tree.updateStdout(table);
    }
