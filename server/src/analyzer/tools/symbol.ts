import Environment from "./environments";
import { Functions, Primitive, ValueType } from "./types";

export default class Symbol{
    constructor(
        public id: string,
        public type: ValueType,
        public value: any,
        public row: number,
        public column: number,
        public environment: Environment
    ){}
}
