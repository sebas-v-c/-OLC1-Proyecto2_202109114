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
                let dbTable = table.getTable(this.id, this.line, this.column);
                if (dbTable instanceof Exception){
                    return dbTable;
                }
                let pred: AddCol = this.predicate as AddCol;
                let res: Exception | undefined;
                res = dbTable.addColumn(pred.col, pred.colType, this.line, this.column)
                if (res instanceof Exception){
                    return res
                }
                res = table.updateTable(dbTable, this.line, this.column);
                return res;
            }
            case AlterActions.DROP: {
                let dbTable = table.getTable(this.id, this.line, this.column);
                if (dbTable instanceof Exception){
                    return dbTable;
                }
                let pred: Drop = this.predicate as Drop;
                let res: Exception | undefined;
                res = dbTable.dropColumn(pred.col);
                if (res instanceof Exception){
                    return res
                }
                res = table.updateTable(dbTable, this.line, this.column);
                return res;
            }
            case AlterActions.RENAMECOL: {
                let dbTable = table.getTable(this.id, this.line, this.column);
                if (dbTable instanceof Exception){
                    return dbTable;
                }

                let pred: RenameCol = this.predicate as RenameCol;
                let res: Exception | undefined;
                res = dbTable.renameColumn(pred.col, pred.newId)
                if (res instanceof Exception){
                    return res
                }
                res = table.updateTable(dbTable, this.line, this.column);
                return res;
            }
            case AlterActions.RENAMETABLE: {
                let pred: RenameTable = this.predicate as RenameTable;
                let res = table.updateTableName(this.id, pred.newId)
                if (res instanceof Exception){
                    return res;
                }
                return undefined;
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
