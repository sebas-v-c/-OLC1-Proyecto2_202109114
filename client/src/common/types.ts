

export interface QCResponseObject extends QCObject {
    out?: string;
    tokens: string[];
    errors: Errors;
    symtable: SymTable;
    ast: string;
    status: number;
}
