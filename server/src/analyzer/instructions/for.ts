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
        this.start = parseInt(start.toString());
        this.end = parseInt(end.toString());
        this.block = block;
        this.block.envName = "for_env";
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
        if (symbol.type !== Primitive.INT){
            return new Exception("Type Error", `Variable of type '${symbol.type}' is not assigname to type 'int'`, this.line, this.column, "for_env");
        }

        symbol.value = this.start;
        let res: any = undefined;
        for (let i = this.start; i < this.end; i++){
            res = this.block.interpret(tree, table)
            if (res !== undefined){
                if (res.value instanceof Exception){
                    return res;
                }
            }
            if (!(symbol instanceof Exception)){
                symbol = this.block.currentEnv.getSymbol(symbol);
                if (!(symbol instanceof Exception)){
                    symbol.value = i + 1;
                    this.block.currentEnv.updateSymbol(symbol);
                }
            }
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
