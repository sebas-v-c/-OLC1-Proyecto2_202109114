export enum NodeType {
    Program,
    NumerciLiteral,
    Identifier,
    BinaryExpr,
    CallExpr,
    FunctionDeclaration
}


export interface Statement {
    row: number;
    column: number;

    getValue()
    kind: NodeType;
}

export class Node {
    public childs: Array<Node>;
    public value: string;

    constructor(value: string) {
        this.value = value;
        this.childs = [];
    }

    addChild(value: string) {
        this.childs.push(new Node(value));
    }

    addChilds(childs: Array<Node>){
        for (let item of childs){
            this.childs.push(item);
        }
    }

    addChildsNode(child: Node) {
        this.childs.push(child);
    }
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
