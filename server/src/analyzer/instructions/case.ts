import { Statement } from "../abastract/ast";
import Environment from "../tools/environments";
import ReturnType from "../tools/returnType";
import { Primitive } from "../tools/types";
import Tree from "../tools/tree";
import { Node } from "../abastract/ast";
import { Exception } from "../errors";
import { CodeBlock } from "./codeBlock";
import Symbol from "../tools/symbol";
import { PrimitiveVar } from "../expressions/primitive";
import { when } from "joi";

type SimpleStmts = { when: Statement, then: Statement }

export class SimpleCase implements Statement {
    public value: Statement;
    public stmts: Array<SimpleStmts>;
    public elseVal: PrimitiveVar;
    public asVar: string;
    public line: number;
    public column: number;

    constructor(value: Statement, stmts: Array<SimpleStmts>, elseVal: PrimitiveVar, asVar: string, line: number, column: number){
        this.value = value;
        this.stmts = stmts;
        this.elseVal = elseVal;
        this.asVar = asVar;
        this.line = line;
        this.column = column;
    }

    getValue(tree: Tree, table: Environment): ReturnType {
        return new ReturnType(Primitive.NULL, undefined);
    }

    interpret(tree: Tree, table: Environment) {
        let symbol: ReturnType = this.value.getValue(tree, table);
        let thenSym: ReturnType | undefined = undefined;
        if (symbol.value instanceof Exception){
            return symbol.value;
        }

        for (let item of this.stmts){
            if (symbol.value === item.when.getValue(tree, table).value){
                thenSym = item.then.getValue(tree, table);
                break;
            }
        }

        if (thenSym === undefined){
            thenSym = this.elseVal.getValue(tree, table);
            if (thenSym.value instanceof Exception){
                return thenSym.value
            }
        }

        if (this.asVar !== undefined){
            table.setSymbol(new Symbol(this.asVar, thenSym.type, thenSym.value, this.line, this.column, table));
        }

        return undefined;
    }

    getCST(): Node {

        return new Node("Node");
    }

    getAST(): Node {
        return new Node('NOde');
    }
}

type SearchedStmts = { when: Statement, then: Statement }

export class SearchedCase implements Statement {
    public stmts: Array<SimpleStmts>;
    public elseVal: PrimitiveVar;
    public asVar: string;
    public line: number;
    public column: number;

    constructor(stmts: Array<SimpleStmts>, elseVal: PrimitiveVar, asVar: string, line: number, column: number){
        this.stmts = stmts;
        this.elseVal = elseVal;
        this.asVar = asVar;
        this.line = line;
        this.column = column;
    }

    getValue(tree: Tree, table: Environment): ReturnType {
        return new ReturnType(Primitive.NULL, undefined);
    }

    interpret(tree: Tree, table: Environment) {
        let thenRet: ReturnType | undefined = undefined;
        for (let item of this.stmts){
            let whenRet: ReturnType = item.when.getValue(tree, table);
            if (whenRet.value instanceof Exception) {
                return whenRet.value;
            }
            if (!(whenRet.type === Primitive.BOOLEAN)){
                return new Exception("Semantic", `${whenRet.type} can't be evaluated to type 'bool'`, this.line, this.column);
            }

            if (whenRet.value === true){
                thenRet = item.then.getValue(tree, table);
                if (whenRet.value instanceof Exception) {
                    return whenRet.value;
                }
                break;
            }
        }

        if (thenRet === undefined){
            thenRet = this.elseVal.getValue(tree, table);
            if (thenRet.value instanceof Exception){
                return thenRet.value
            }
        }

        if (this.asVar !== undefined){
            table.setSymbol(new Symbol(this.asVar, thenRet.type, thenRet.value, this.line, this.column, table));
        }

        return undefined;
    }

    getCST(): Node {

        return new Node("Node");
    }

    getAST(): Node {
        return new Node('NOde');
    }
}
