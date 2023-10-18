import { Statement } from "../abastract/ast";
import Environment from "../tools/environments";
import ReturnType from "../tools/returnType";
import { Primitive } from "../tools/types";
import Tree from "../tools/tree";
import { Node } from "../abastract/ast";
import { Exception } from "../errors";
import { CodeBlock } from "./codeBlock";

interface Arg {
    id: string, type: Primitive
}

export class Create implements Statement {
    public id: string;
    public args: Array<Arg>;
    public line: number;
    public column: number;

    constructor(id: string, args: Array<Arg>, line: number, column: number,){
        this.id = id;
        this.args = args;
        this.line = line;
        this.column = column;
    }

    getValue(tree: Tree, table: Environment): ReturnType {
        return new ReturnType(Primitive.NULL, undefined);
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
        if (flag.type === Primitive.BOOLEAN){
            if (flag.value === true){
                retVar = this.block.interpret(tree, table);
            } else if(this.elseBlock instanceof CodeBlock){
                retVar = this.elseBlock.interpret(tree, table);
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
