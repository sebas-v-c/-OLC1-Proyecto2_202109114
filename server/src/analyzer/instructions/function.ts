import { Statement } from "../abastract/ast";
import Environment from "../tools/environments";
import ReturnType from "../tools/returnType";
import { Any, Functions, Primitive } from "../tools/types";
import Tree from "../tools/tree";
import { Node } from "../abastract/ast";
import { Exception } from "../errors";
import { CodeBlock } from "./codeBlock";
import Symbol from "../tools/symbol";
import { CallVar } from "../expressions/callVar";

export interface VarArgs {
    id: string, type: Primitive | Any
}


export abstract class Func implements Statement{
    constructor(
        public id: string,
        public args: Array<VarArgs>,
        public block: CodeBlock,
        public line: number,
        public column: number,
        public retType?: Primitive){}
    abstract getValue(tree: Tree, table: Environment): ReturnType;
    abstract interpret(tree: Tree, table: Environment): any;
    abstract getCST(): Node;
    abstract getAST(): Node;
}

export class Function extends Func {
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
            this,
            this.line,
            this.column,
            table
        );

        try{
            table.setSymbol(symbol);
        }catch(err){
            tree.errors.push(err as Exception); throw err;
        }
    }

    getCST(): Node {
        return new Node("Node");
    }

    getAST(): Node {
        return new Node('NOde');
    }
}

export class NativeFunc extends Func {
    constructor(public id: string, public args: Array<VarArgs>, public func: (...args: ReturnType[]) => ReturnType, public line: number, public column: number,){
        super(id, args, new CodeBlock([], line, column), line, column);
    }
    getValue(tree: Tree, table: Environment): ReturnType {
        let resVal: Array<ReturnType> = [];
        for (let arg of this.args){
            let callvar = new CallVar(arg.id, 0, 0);
            resVal.push(callvar.getValue(tree, table));
        }
        return this.func(...resVal);

    }
    interpret(tree: Tree, table: Environment) {
        throw new Error("Method not implemented.");
    }
    getCST(): Node {
        throw new Error("Method not implemented.");
    }
    getAST(): Node {
        throw new Error("Method not implemented.");
    }
}


export class Method extends Func {
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
            this,
            this.line,
            this.column,
            table
        );

        try {
            table.setSymbol(symbol);
        } catch(err){
            tree.errors.push(err as Exception); throw err;
        }
    }

    getCST(): Node {
        return new Node("Node");
    }

    getAST(): Node {
        return new Node('NOde');
    }
}
