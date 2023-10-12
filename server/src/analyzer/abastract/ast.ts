export enum NodeType {
    Program,
    NumerciLiteral,
    Identifier,
    BinaryExpr,
    CallExpr,
    FunctionDeclaration
}


export interface Stmt {
    kind: NodeType;
}

export interface Program extends Stmt {
    kind: NodeType.Program;
    body: Stmt[];
}


export interface Expr extends Stmt {}


export interface BinaryExpr extends Expr {
    kind: NodeType.BinaryExpr
    left: Expr;
    right: Expr;
    operator: string;
}


export interface Identifier extends Expr {
    kind: NodeType.Identifier;
    symbol: string ;
}

export interface NumericLiteral extends Expr {
    kind: NodeType.NumerciLiteral;
    value: number
}
