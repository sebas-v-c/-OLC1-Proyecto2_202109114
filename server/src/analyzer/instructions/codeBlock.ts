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

    interpret(tree: Tree, table: Environment): ReturnType | Exception | undefined {
        // In case want to initiate the new environment with a default symbol
        let retVar: ReturnType | Exception | undefined;
        for (let instruction of this.instructions){
            // TODO make sure that a break, continue, returned is called here in the interpret method
            retVar = instruction.interpret(tree, table);
            if (retVar instanceof Exception){
                tree.errors.push(retVar);
                tree.updateConsole(retVar.toString());
                // i'm going to return here to see what happens
                // TODO verify this behaviour
                return retVar;
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
        return new Node('NOde');
    }
}
