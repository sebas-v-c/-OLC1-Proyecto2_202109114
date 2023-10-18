import ReturnType from "./returnType";
import { Primitive } from "./types";

export default class Table {
    public id: string;
    public columns: Map<string, Column>;
    constructor(id: string){
        this.id = id;
        this.columns = new Map();
    }
    // DML actions

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
