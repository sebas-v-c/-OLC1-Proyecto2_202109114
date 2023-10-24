import { Exception } from "../errors";
import ReturnType from "./returnType";
import { Primitive } from "./types";

// TODO set line and number in errors
export default class Table {
    public id: string;
    public columns: Map<string, Column>;
    constructor(id: string){
        this.id = id.toLowerCase();
        this.columns = new Map();
    }
    getTableLength(): number{
        const keyArr = Array.from(this.columns.keys());
        const col = this.columns.get(keyArr[0]);
        if (col === undefined){
            throw new Exception("DB", `Now column has been defined`, 0,0);
        }
        return col.data.length;

    }
    // DDL actions
    addColumn(name: string, type: Primitive, line: number, column: number): void{
        if (this.columns.has(name.toLowerCase())){
            throw new Exception("DB", `Column name ${name.toLowerCase()} is already defined`, line, column);
        }

        this.columns.set(name.toLowerCase(), new Column(name.toLowerCase(), type));
    }

    dropColumn(name: string): void{
        if (!this.columns.has(name.toLowerCase())){
            throw new Exception("DB", `Column name ${name.toLowerCase()} does not exist`, 0, 0);
        }

        this.columns.delete(name.toLocaleLowerCase());
    }

    renameColumn(oldName: string, newName: string): void {
        oldName = oldName.toLowerCase();
        newName = newName.toLowerCase();
        if (!this.columns.has(oldName)){
            throw new Exception("DB", `Column name '${oldName}' does not exist`, 0, 0);
        }

        let oldCol = this.columns.get(oldName);
        if (oldCol !== undefined){
            this.columns.delete(oldName);
            oldCol.name = newName.toLowerCase();
            this.columns.set(oldCol.name, oldCol);
        }
    }

    updateColumn(col: Column): void {
        if (!this.columns.has(col.name.toLowerCase())){
            throw new Exception("DB", `Column name '${col.name.toLowerCase()}' does not exist`, 0, 0);
        }

        this.columns.set(col.name.toLowerCase(), col);
    }

    getColumn(name: string): Column{
        if (!this.columns.has(name.toLowerCase())){
            throw new Exception("DB", `Column name '${name.toLowerCase()}' does not exist`, 0, 0);
        } else {
            return this.columns.get(name.toLowerCase()) as Column;
        }
    }

    fillNullValues(column: Column): void{
        const keyArr = Array.from(this.columns.keys());
        for (let i = 0; i < keyArr.length; i++){
            let col = this.columns.get(keyArr[i]);
            if (col instanceof Column){
                if (col.data.length < column.data.length){
                    col.data.push(new ReturnType(Primitive.NULL, null));
                }
            }
        }


        for (let col of this.columns.values()){
            if (col.data.length < column.data.length){
                for (let i = 0; column.data.length; i++){
                    col.data.push(new ReturnType(Primitive.NULL, null));
                }
            }
        }
    }

    // DML actions
    deleteFromTable(){}

    truncateTable(line: number, column: number){
        let colsArr: Array<Column> = [];
        for (let col of this.columns.values()){
            colsArr.push(col);
        }
        this.columns = new Map();
        for (let col of colsArr){
            this.addColumn(col.name, col.type, line, column);
        }
    }
}


export class Column {
    public data: Array<ReturnType>;
    public name: string;

    constructor(name: string, public type: Primitive){
        this.name = name.toLowerCase();
        this.data = [];
    }

    addData(value: ReturnType): void{
        if (!this.isValidData(value)){
            throw new Exception("Type Error", `Data of value ${value.type} can't be assigned to column of type ${this.type}`, 0, 0);
        }

        this.data.push(value);
    }

    isValidData(value: ReturnType): boolean{
        return value.type === this.type;
    }

}
