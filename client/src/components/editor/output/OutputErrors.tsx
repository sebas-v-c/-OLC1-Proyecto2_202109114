import "../../../scss/Errors.scss"

interface Table {
    lex: string;
    line: number;
    column: number;
}

interface Token extends Table {
    token: string;
}

interface LexError extends Table {
    desc: string;
}

interface SynError extends LexError {
}

interface Symbol {
    var: string;
    type: string;
    value: any;
}


type ResObj = {
    tokens: Token[];
    lexErr: LexError[];
    synErr: SynError[];
    symTable: Symbol[];
}

type Props = {
    content: string;
}

export default function OutputErrors({ content }: Props){

    return(
        <div className="terminal">
            <h1>Tokens</h1>
            <h1>Errors</h1>
            <h2>Lexical Errors</h2>
            <h2>Syntax Errors</h2>
            <h1>Symbols Table</h1>
        </div>
    );
}
