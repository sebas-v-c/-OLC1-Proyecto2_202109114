import { Primitive } from "./types";


export default class ReturnType {
    constructor(public type: Primitive, public value: any){}

    public toString(): string {
        return this.value;
    }

}
