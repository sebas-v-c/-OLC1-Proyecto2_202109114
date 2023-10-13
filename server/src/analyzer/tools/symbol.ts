import Environment from "./environments";
import { Functions, Primitive, ValueType } from "./types";

export default interface Symbol {
    id: string;
    type: ValueType;
    value: any;
    row: number;
    column: number;
    environment?: string;
}

