export interface QCObject{
    name: string;
    content: string;
}

// TODO change the error type
export interface Errors {
    lex: string[];
    syn: string[];
    sem: string[]
}

export interface SymTable {
    id: string;
    val: any;
}


export interface QCResponseObject extends QCObject {
    out?: string;
    tokens: string[];
    errors: Errors;
    symtable: SymTable;
    ast: string;
    status: number;
    error: number;
}
