import { Statement } from "../abastract/ast";
import Environment from "../tools/environments";
import ReturnType from "../tools/returnType";
import { Functions, Primitive } from "../tools/types";
import Tree from "../tools/tree";
import { Node } from "../abastract/ast";
import { Exception } from "../errors";
import { CodeBlock } from "./codeBlock";
import Symbol from "../tools/symbol";

export interface VarArgs {
    id: string, type: Primitive
}

export class Func {
    constructor(
        public id: string,
        public args: Array<VarArgs>,
        public block: CodeBlock,
        public line: number,
        public column: number,
        public retType?: Primitive){}
}

export class Function extends Func implements Statement {
    constructor(id: string, args: Array<VarArgs>, retType: Primitive, block: CodeBlock, line: number, column: number,){
        super(id, args, block, line, column, retType);
    }

    getValue(tree: Tree, table: Environment): ReturnType {
        return new ReturnType(Primitive.NULL, undefined);
    }

    interpret(tree: Tree, table: Environment) {
        let symbol: Symbol;

        symbol = new Symbol(
            this.id,
            Functions.FUNC,
            new Func(this.id, this.args, this.block, this.line, this.column, this.retType),
            this.line,
            this.column,
            table
        );


        let result: Exception | undefined = table.setSymbol(symbol);

        if (result instanceof Exception){
            return result;
        }

        return result;
    }

    getCST(): Node {
        return new Node("Node");
    }

    getAST(): Node {
        return new Node('NOde');
    }
}


export class Method extends Func implements Statement {
    constructor(id: string, args: Array<VarArgs>, block: CodeBlock, line: number, column: number,){
        super(id, args, block, line, column);
    }

    getValue(tree: Tree, table: Environment): ReturnType {
        return new ReturnType(Primitive.NULL, undefined);
    }

    interpret(tree: Tree, table: Environment) {
        let symbol: Symbol;

        symbol = new Symbol(
            this.id,
            Functions.METHOD,
            new Func(this.id, this.args, this.block, this.line, this.column),
            this.line,
            this.column,
            table
        );

        let result: Exception | undefined = table.setSymbol(symbol);

        if (result instanceof Exception){
            return result;
        }

        return result;
    }

    getCST(): Node {
        return new Node("Node");
    }

    getAST(): Node {
        return new Node('NOde');
    }
}
