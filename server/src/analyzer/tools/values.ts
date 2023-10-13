import Environment from "./environments";
import { primitive } from "./types";

export default interface Symbol {
    id: string;
    type: primitive;
    value: string;
    row: number;
    column: number;
    environment?: string;
}
