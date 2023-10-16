import { Primitive } from "./tools/types";


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


export class Exception implements Error {
    constructor(
        public type: string,
        public description: string,
        public line: number,
        public column: number,
        public environment?: string
    ) {}

    public print(): void {
        console.log(this.toString());
    }

    public toString(): string {
        return `--> ${this.type} - ${this.description} in ${this.environment} on [${this.line}, ${this.column}`;
    }

}
