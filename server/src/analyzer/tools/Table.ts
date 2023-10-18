import { Exception } from "../errors";
import ReturnType from "./returnType";
import { Primitive } from "./types";

export default class Table {
    public id: string;
    public columns: Map<string, Column>;
    constructor(id: string){
        this.id = id.toLowerCase();
        this.columns = new Map();
    }
    // DDL actions
    addColumn(name: string, type: Primitive, line: number, column: number): Exception | undefined{
        if (this.columns.has(name.toLowerCase())){
            return new Exception("DB", `Column name ${name.toLowerCase()} is already defined`, line, column);
        }

        this.columns.set(name.toLowerCase(), new Column(name.toLowerCase(), type));
    }

    dropColumn(name: string): Exception | undefined{
        if (!this.columns.has(name.toLowerCase())){
            return new Exception("DB", `Column name ${name.toLowerCase()} does not exist`, 0, 0);
        }

        this.columns.delete(name.toLocaleLowerCase());
    }

    renameColumn(oldName: string, newName: string): Exception | undefined {
        oldName = oldName.toLowerCase();
        newName = newName.toLowerCase();
        if (!this.columns.has(oldName)){
            console.log("-----------------------DEBUG-----------------");
            console.log(this.columns);
            console.log("-----------------------END DEBUG-----------------");
            return new Exception("DB", `Column name '${oldName}' does not exist`, 0, 0);
        }

        let oldCol = this.columns.get(oldName);
        if (oldCol !== undefined){
            this.columns.delete(oldName);
            oldCol.name = newName.toLowerCase();
            this.columns.set(oldCol.name, oldCol);
        }
    }

    updateColumn(col: Column): Exception | undefined{
        if (!this.columns.has(col.name.toLowerCase())){
            return new Exception("DB", `Column name '${col.name.toLowerCase()}' does not exist`, 0, 0);
        }

        this.columns.set(col.name.toLowerCase(), col);
    }

    getColumn(name: string): Exception | Column{
        if (!this.columns.has(name.toLowerCase())){
            return new Exception("DB", `Column name '${name.toLowerCase()}' does not exist`, 0, 0);
        } else {
            return this.columns.get(name.toLowerCase()) as Column;
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
    public name: string;

    constructor(name: string, public type: Primitive){
        this.name = name.toLowerCase();
        this.data = [];
    }

    validateData(value: ReturnType): boolean{
        return value.type === this.type;
    }

}
