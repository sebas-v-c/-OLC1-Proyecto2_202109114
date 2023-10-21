import { Exception, LexError, SynError } from "../analyzer/errors";

export interface QCObject{
    name: string;
    content: string;
}

export type Errors = {
    lex: LexError[];
    syn: SynError[];
    sem: Exception[];
}

export interface SymTable {
    id: string;
    val: any;
}


export interface QCResponseObject extends QCObject {
    symtable: {};
    ast: string;
    status: number;
    err: Errors;
}
