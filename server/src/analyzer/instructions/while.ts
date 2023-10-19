import { Statement } from "../abastract/ast";
import Environment from "../tools/environments";
import ReturnType from "../tools/returnType";
import { Primitive, TransferOp } from "../tools/types";
import Tree from "../tools/tree";
import { Node } from "../abastract/ast";
import { Exception } from "../errors";
import { CodeBlock } from "./codeBlock";
import Symbol from "../tools/symbol";


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
        let flag: ReturnType;
        try {
            flag = this.condition.getValue(tree, table)
        } catch(err){
            tree.errors.push(err as Exception);
            throw err;
        }

        if (flag.type !== Primitive.BOOLEAN){
            let err =new Exception('Semantic',`Invalid expression in WHILE condition`, this.line, this.column, table.name);
            tree.errors.push(err); throw err;
        }

        const newWhileEnv: Environment = new Environment(table, "while_env");

        let res: ReturnType | void = undefined;
        while(flag.value){
            if (this.block instanceof CodeBlock){
                try{
                    res = this.block.interpret(tree, newWhileEnv);
                } catch(err){
                    tree.errors.push(err as Exception);
                    throw err;
                }
            }

            try {
                flag = this.condition.getValue(tree, newWhileEnv)
            } catch(err){
                tree.errors.push(err as Exception);
                throw err;
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
