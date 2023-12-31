import { Node, Statement } from "../abastract/ast";
import Environment from "../tools/environments";
import ReturnType from "../tools/returnType";
import { Id, Primitive } from "../tools/types";
import Tree from "../tools/tree";


export class IdVar implements Statement {
    public type: Id;
    public value: any;
    public line: number;
    public column: number;

    constructor(value: string, line: number, column: number,){
        this.value = value;
        this.line = line;
        this.column = column;
        this.type = Id.ID;
    }


    interpret(tree: Tree, table: Environment) {
        return undefined;
    }

    getValue(tree: Tree, table: Environment): ReturnType {
        return new ReturnType(Id.ID, this.value);
    }

    getCST(): Node {
        return new Node("Node");
    }

    getAST(): Node {
        let node: Node = new Node(this.value);
        return node;
    }


}
