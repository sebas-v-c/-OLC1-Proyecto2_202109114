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
        tree.envs.push(ifEnv);
        if (flag.type === Primitive.BOOLEAN){
            if (flag.value === true){
                try{
                    return this.block.interpret(tree, ifEnv);
                } catch(err){
                    tree.errors.push(err as Exception); throw err;
                }
            } else if(this.elseBlock instanceof CodeBlock){
                try{
                    return this.elseBlock.interpret(tree, ifEnv);
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
        let node: Node = new Node("IF");
        if (this.condition !== undefined){
            node.addChildsNode(this.condition.getAST());
        }

        let insTrue: Node = new Node("TRUE");
        // doing this to not add the BLOCK node
        for (let item of this.block.instructions){
            insTrue.addChildsNode(item.getAST());
        }
        //insTrue.addChildsNode(this.block.getAST());
        node.addChildsNode(insTrue);

        if (this.elseBlock !== undefined){
            let insFalse: Node = new Node("FALSE");
            for (let item of this.elseBlock.instructions){
                insFalse.addChildsNode(item.getAST());
            }
            //insFalse.addChildsNode(this.elseBlock.getAST());

            node.addChildsNode(insFalse);
        }
        return node;
    }




}
