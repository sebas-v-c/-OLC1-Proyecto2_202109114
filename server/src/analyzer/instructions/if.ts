import { Statement } from "../abastract/ast";
import Environment from "../tools/environments";
import ReturnType from "../tools/returnType";
import { Primitive } from "../tools/types";
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
        return new ReturnType(Primitive.NULL, undefined);
    }

    interpret(tree: Tree, table: Environment) {
        let flag: ReturnType | undefined;
        try {
            flag = this.condition?.getValue(tree, table);
        } catch (err){
            tree.errors.push(err as Exception); throw err;
        }

        if (flag === undefined){
            let err: Exception =new Exception('Semantic',`Invalid expression in IF condition`, this.line, this.column, table.name);
            tree.errors.push(err); throw err;
        }

        const ifEnv: Environment = new Environment(table, "if_env");
        if (flag.type === Primitive.BOOLEAN){
            if (flag.value === true){
                try{
                    return this.block.interpret(tree, ifEnv);
                } catch(err){
                    tree.errors.push(err as Exception); throw err;
                }
            } else if(this.elseBlock instanceof CodeBlock){
                try{
                    return this.block.interpret(tree, ifEnv);
                } catch(err){
                    tree.errors.push(err as Exception); throw err;
                }
            }
        }
    }

    getCST(): Node {

        return new Node("Node");
    }

    getAST(): Node {
        return new Node('NOde');
    }




}
