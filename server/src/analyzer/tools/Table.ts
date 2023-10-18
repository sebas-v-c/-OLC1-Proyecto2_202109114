import { Exception } from "../errors";
import ReturnType from "./returnType";
import { Primitive } from "./types";

export default class Table {
    public id: string;
    public columns: Map<string, Column>;
    constructor(id: string){
        this.id = id;
        this.columns = new Map();
    }
    // DDL actions
    addColumn(name: string, type: Primitive, line, column): Exception | undefined{
        if (this.columns.has(name)){
            return new Exception("DB", `Table name ${name} is already defined`, line, column);
        }

        this.columns.set(name, new Column(name, type));
    }

    dropColumn(name: string): Exception | undefined{
        if (!this.columns.has(name)){
            return new Exception("DB", `Table name ${name} does not exist`, 0, 0);
        }

        this.columns.delete(name);
    }

    renameColumn(oldName: string, newName: string): Exception | undefined {
        if (!this.columns.has(oldName)){
            return new Exception("DB", `Table name ${oldName} does not exist`, 0, 0);
        }

        let oldCol = this.columns.get(oldName);
        if (oldCol !== undefined){
            this.columns.delete(oldName);
            oldCol.name = newName
            this.columns.set(newName, oldCol);
        }
    }

    updateColumn(col: Column): Exception | undefined{
        if (!this.columns.has(col.name)){
            return new Exception("DB", `Table name ${col.name} does not exist`, 0, 0);
        }

        this.columns.set(col.name, col);
    }

    getColumn(name: string): Exception | Column{
        if (!this.columns.has(name)){
            return new Exception("DB", `Table name ${name} does not exist`, 0, 0);
        } else {
            return this.columns.get(name) as Column;
        }
    }

    // DML actions
    deleteFromTable(){}
    truncateTable(){
        this.columns = new Map();
    }
}


export class Column {
    public data: Array<ReturnType>;

    constructor(public name: string, public type: Primitive){
        this.data = [];
    }

    validateData(value: ReturnType): boolean{
        return value.type === this.type;
    }

}
