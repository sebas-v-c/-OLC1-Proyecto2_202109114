import { Node, Statement } from "../abastract/ast";
import Environment from "../tools/environments";
import ReturnType from "../tools/returnType";
import { Primitive } from "../tools/types";
import Tree from "../tools/tree";
import { Exception } from "../errors";
import Symbol from "../tools/symbol";
import { PrimitiveVar } from "./primitive";


export class CallVar implements Statement {
    public id: string;
    public line: number;
    public column: number;

    constructor(id: string, line: number, column: number,){
        this.id = id;
        this.line = line;
        this.column = column;
    }

    interpret(tree: Tree, table: Environment) {
        return undefined;
    }

    getValue(tree: Tree, table: Environment): ReturnType {
        let symbol: Exception | Symbol;
        symbol = table.getSymbol(new Symbol(this.id, Primitive.NULL, null, this.line, this.column, table));

        if (symbol instanceof Exception){
            throw new Exception('Sementic', `Variable name: ${this.id} does not exist in current scope`, this.line, this.column, table.name);
        }

        return new ReturnType(symbol.type, symbol.value);
    }

    getCST(): Node {
        return new Node("Node");
    }

    getAST(): Node {
        return new Node('Node');
    }


}
