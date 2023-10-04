export interface QCObject{
    name: string;
    content: string;
}

export interface Errors {
    lex: string[];
    syn: string[];
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
}
