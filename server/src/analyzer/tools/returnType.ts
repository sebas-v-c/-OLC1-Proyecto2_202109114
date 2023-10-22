import { ValueType } from "./types";


export default class ReturnType {
    constructor(public type: ValueType, public value: any){}

    public toString(): string {
        return this.value.toString();
    }

}
