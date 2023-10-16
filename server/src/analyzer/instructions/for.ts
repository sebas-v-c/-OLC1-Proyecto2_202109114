import { Statement } from "../abastract/ast";
import Environment from "../tools/environments";
import ReturnType from "../tools/returnType";
import { Primitive } from "../tools/types";
import Tree from "../tools/tree";
import { Node } from "../abastract/ast";
import { Exception } from "../errors";
import { CodeBlock } from "./codeBlock";
import Symbol from "../tools/symbol";


export class For implements Statement {
    public variableName: string;
    public block: CodeBlock;
    public start: number;
    public end: number;
    public line: number;
    public column: number;

    constructor(variableName: string, block: CodeBlock, start: number, end: number, line: number, column: number,){
        this.variableName = variableName;
        this.start = start;
        this.end = end;
        this.block = block;
        this.line = line;
        this.column = column;
    }

    getValue(tree: Tree, table: Environment): ReturnType {
        return new ReturnType(Primitive.NULL, undefined);
    }

    interpret(tree: Tree, table: Environment) {
        let symbol: Symbol | Exception = table.getSymbol(new Symbol(this.variableName, Primitive.NULL, null, 0, 0, table))

        if (symbol instanceof Exception){
            symbol = new Symbol(this.variableName, Primitive.INT, this.start, this.line, this.column, this.block.currentEnv)
            this.block.addSymbol(symbol);
        }

        let res: any = undefined;
        for (let i = this.start; i < this.end; i++){
            res = this.block.interpret(tree, table)
            symbol.environment = this.block.currentEnv;
            if (res !== undefined){
                if (res.value instanceof Exception){
                    return res;
                }
            }
            symbol.value = i+1;
            this.block.currentEnv.updateSymbol(symbol);
        }

        return res;
    }

    getCST(): Node {

        return new Node("Node");
    }

    getAST(): Node {
        return new Node('NOde');
    }




}
