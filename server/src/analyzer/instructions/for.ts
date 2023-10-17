import { Statement } from "../abastract/ast";
import Environment from "../tools/environments";
import ReturnType from "../tools/returnType";
import { Primitive, TransferOp } from "../tools/types";
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
        const newForEnv: Environment = new Environment(table, "for_env");

        if (symbol instanceof Exception){
            symbol = new Symbol(this.variableName, Primitive.INT, this.start, this.line, this.column, newForEnv);
            newForEnv.setSymbol(symbol);
        }
        if (symbol.type !== Primitive.INT){
            return new Exception("Type Error", `Variable of type '${symbol.type}' is not assigname to type 'int'`, this.line, this.column, "for_env");
        }


        symbol.value = this.start;
        let res: any = undefined;
        for (let i = this.start; i < this.end; i++){
            if (this.block instanceof CodeBlock){
                res = this.block.interpret(tree, newForEnv)
                if (res !== undefined){
                    if (res instanceof Exception){
                        return res;
                    }
                }
            }
            if (!(symbol instanceof Exception)){
                symbol = newForEnv.getSymbol(symbol);
                if (!(symbol instanceof Exception)){
                    symbol.value = i + 1;
                    newForEnv.updateSymbol(symbol);
                }
            }
            // To handle control words
            if (res instanceof ReturnType){
                if (res.type === TransferOp.BREAK){
                    break;
                }
                if (res.type === TransferOp.CONTINUE){
                    continue;
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
