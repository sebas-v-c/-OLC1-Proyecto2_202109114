export interface Error {
    line: number;
    column: number;
    print: () => void;
}


export class LexError implements Error {
    constructor(public line: number, public column: number, public character: string){
    }

    public print(): void {
        console.log(`Unrecognized Character: ${this.character} at LINE: ${this.line}, COLUMN: ${this.column}`)
    }
}

export class SynError implements Error {
    public line;
    public column;
    public token?: any;
    public type: string;
    constructor(line: number, column: number, type: string, /*TODO change this type*/token: any);
    constructor(line: number, column: number, type: string, /*TODO change this type*/token?: any){
        this.line = line;
        this.column = column;
        this.token = token;
        this.type = type;
    }

    public print(): void {
        console.log(`Syntax Error ${this.token? "at Line " + this.line + " Column " + this.column : ""}`
            + ". This Component was no expected: " + `${this.token? this.type + " = " + this.token : "EOF"}` + ".");
    }
}

export class SemError implements Error {
    constructor(public line: number, public column: number, public description: string){}

    public print(): void {
        console.log(`Semantic Error at: Line: ${this.line} Column: ${this.column}. ${this.description}`);
    }
}
