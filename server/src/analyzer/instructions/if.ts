import { Statement } from "../abastract/ast";
import Environment from "../tools/environments";
import ReturnType from "../tools/returnType";
import { Booleans, Primitive } from "../tools/types";
import Tree from "../tools/tree";
import { Node } from "../abastract/ast";
import { Exception } from "../errors";
import { CodeBlock } from "./codeBlock";


export class If implements Statement {
    public condition: Statement | undefined;
    public block: CodeBlock;
    public elseBlock: CodeBlock;
    public line: number;
    public column: number;

    constructor(condition: Statement, block: CodeBlock, elseBlock: CodeBlock, line: number, column: number,){
        this.block = block;
        this.elseBlock = elseBlock;
        this.condition = condition;
        this.line = line;
        this.column = column;
    }

    getValue(tree: Tree, table: Environment): ReturnType {
        return new ReturnType(Booleans.NULL, undefined);
    }

    interpret(tree: Tree, table: Environment) {
        let flag: ReturnType | undefined = this.condition?.getValue(tree, table);

        if (flag === undefined){
            return new Exception('Semantic',`Invalid expression in IF condition`, this.line, this.column, table.name);
        }

        if (flag.value instanceof Exception){
            return flag.value;
        }

        let retVar: any = undefined;
        if (flag.type === Booleans.BOOLEAN){
            if (flag.value){
                retVar = this.block.interpret(tree, table);
            } else if(this.elseBlock !== undefined){
                retVar = this.elseBlock.interpret(tree, table)
            }
        }
        return retVar;
    }

    getCST(): Node {

        return new Node("Node");
    }

    getAST(): Node {
        return new Node('NOde');
    }




}
