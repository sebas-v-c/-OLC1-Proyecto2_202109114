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

export enum AlterActions {
    ADD="add",
    DROP="drop",
    RENAMECOL="rename_col",
    RENAMETABLE="rename_table",
}

export interface AltPred {
    type: AlterActions;
}

interface AddCol extends AltPred {
    col: string
    colType: Primitive
}

interface Drop extends AltPred {
    col: string
}
interface RenameCol extends AltPred{
    col: string
    newId: string;
}
interface RenameTable extends AltPred{
    newId: string;
}


export class Alter implements Statement {
    public id: string;
    public line: number;
    public column: number;

    constructor(id: string, public predicate: AltPred,line: number, column: number,){
        this.id = id;
        this.line = line;
        this.column = column;
    }

    getValue(tree: Tree, table: Environment): ReturnType {
        return new ReturnType(Primitive.NULL, undefined);
    }

    interpret(tree: Tree, table: Environment) {
        switch(this.predicate.type){
            case AlterActions.ADD: {
                let dbTable: Table;
                try{
                    dbTable = table.getTable(this.id, this.line, this.column);
                } catch(err) {
                    tree.errors.push(err as Exception);
                    throw err;
                }
                let pred: AddCol = this.predicate as AddCol;

                try {
                    dbTable.addColumn(pred.col, pred.colType, this.line, this.column);
                    table.updateTable(dbTable, this.line, this.column);
                } catch(err){
                    tree.errors.push(err as Exception);
                    throw err;
                }
            }
            case AlterActions.DROP: {
                let dbTable: Table;
                try{
                    dbTable = table.getTable(this.id, this.line, this.column);
                } catch(err) {
                    tree.errors.push(err as Exception);
                    throw err;
                }
                let pred: Drop = this.predicate as Drop;

                try {
                    dbTable.dropColumn(pred.col);
                    table.updateTable(dbTable, this.line, this.column);
                } catch(err){
                    tree.errors.push(err as Exception);
                    throw err;
                }
            }
            case AlterActions.RENAMECOL: {
                let dbTable: Table;
                try{
                    dbTable = table.getTable(this.id, this.line, this.column);
                } catch(err) {
                    tree.errors.push(err as Exception);
                    throw err;
                }
                let pred: RenameCol = this.predicate as RenameCol;

                try {
                    dbTable.renameColumn(pred.col, pred.newId);
                    table.updateTable(dbTable, this.line, this.column);
                } catch(err){
                    tree.errors.push(err as Exception);
                    throw err;
                }
            }
            case AlterActions.RENAMETABLE: {
                let pred: RenameTable = this.predicate as RenameTable;
                try{
                    table.updateTableName(this.id, pred.newId);
                } catch(err){
                    tree.errors.push(err as Exception); throw err;
                }
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
