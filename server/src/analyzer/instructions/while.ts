import { Statement } from "../abastract/ast";
import Environment from "../tools/environments";
import ReturnType from "../tools/returnType";
import { Primitive } from "../tools/types";
import Tree from "../tools/tree";
import { Node } from "../abastract/ast";
import { Exception } from "../errors";
import { CodeBlock } from "./codeBlock";


export class While implements Statement {
    public condition: Statement;
    public block: CodeBlock;
    public line: number;
    public column: number;

    constructor(condition: Statement, block: CodeBlock, line: number, column: number,){
        this.block = block;
        this.condition = condition;
        this.line = line;
        this.column = column;
    }

    getValue(tree: Tree, table: Environment): ReturnType {
        return new ReturnType(Primitive.NULL, undefined);
    }

    interpret(tree: Tree, table: Environment) {
        let flag: ReturnType = this.condition.getValue(tree, table)
        if (flag === undefined){
            return new Exception('Semantic',`Invalid expression in WHILE condition`, this.line, this.column, table.name);
        }
        if (flag.value instanceof Exception){
            return flag.value;
        }
        if (flag.type !== Primitive.BOOLEAN){
            return new Exception('Semantic',`Invalid expression in WHILE condition`, this.line, this.column, table.name);
        }

        let res: any = undefined;
        while(flag.value){
            res = this.block.interpret(tree, table)
            if (res !== undefined){
                if (res.value instanceof Exception){
                    return res;
                }
            }

            flag = this.condition?.getValue(tree, table)
            if (flag === undefined) {
                return new Exception('Semantic', `Invalid expression in WHILE condition`, this.line, this.column, table.name);
            }
            if (flag.value instanceof Exception) {
                return flag.value;
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
