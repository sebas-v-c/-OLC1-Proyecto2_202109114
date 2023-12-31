import { Statement } from "../abastract/ast";
import Environment from "../tools/environments";
import ReturnType from "../tools/returnType";
import { Primitive, TransferOp } from "../tools/types";
import Tree from "../tools/tree";
import { Node } from "../abastract/ast";
import { Exception } from "../errors";
import Symbol from "../tools/symbol";


export class CodeBlock implements Statement {
    public instructions: Array<Statement>;
    public envName: string;
    public line: number;
    public column: number;
    public currentEnv: Environment;
    public symbol: Symbol | undefined;

    constructor(instructions: Array<Statement>, line: number, column: number, envName:string = "deft"){
        this.instructions = instructions;
        this.line = line;
        this.column = column;
        this.envName = envName;
        this.currentEnv = new Environment(undefined, this.envName);
        this.symbol = undefined;
    }

    getValue(tree: Tree, table: Environment): ReturnType {
        return new ReturnType(Primitive.NULL, undefined);
    }

    interpret(tree: Tree, table: Environment): ReturnType | void {
        // In case want to initiate the new environment with a default symbol
        let retVar: ReturnType | undefined;
        for (let instruction of this.instructions){
            try{
                retVar = instruction.interpret(tree, table);
            } catch(err){
                tree.errors.push(err as Exception);
                throw err
            }

            if (retVar instanceof ReturnType){
                if (retVar.type === TransferOp.BREAK || retVar.type === TransferOp.CONTINUE) {
                    // this operations return  an instance of type ReturnType({TransferOp.BREAK or TransferOp.CONTINUE}, null)
                    return retVar;
                }
                if (retVar.type === TransferOp.RETURN){
                    // this operations return  an instance of type ReturnType(TransferOp.RETURN, ReturnType)
                    return retVar.value;
                }
            }
        }

        return retVar;
    }

    getCST(): Node {

        return new Node("Node");
    }

    getAST(): Node {
        let node: Node = new Node("BLOCK")
        for (let inst of this.instructions){
            node.addChildsNode(inst.getAST());
        }
        return node;
    }
}
