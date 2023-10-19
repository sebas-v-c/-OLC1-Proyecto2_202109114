import { Node, Statement } from "../abastract/ast";
import { Exception } from "../errors";
import Environment from "../tools/environments";
import ReturnType from "../tools/returnType";
import Tree from "../tools/tree";
import { Primitive, TransferOp } from "../tools/types";
import Symbol from "../tools/symbol";



export class Return implements Statement {
    public line;
    public column;
    public expression: Statement;

    constructor(expression: Statement, line: number, column: number, public func?:(arg: ReturnType) => ReturnType ){
        this.expression = expression;
        this.line = line;
        this.column = column;
    }

    getValue(tree: Tree, table: Environment): ReturnType {
        if (this.expression === undefined){
            return new ReturnType(TransferOp.RETURN, null);
        }

        let res: ReturnType;
        try {
            res = this.expression.getValue(tree, table);
            if (this.func !== undefined){
                res = this.func(res)
            }

        } catch(err){
            tree.errors.push(err as Exception); throw err;
        }

        return new ReturnType(TransferOp.RETURN, res);
    }

    interpret(tree: Tree, table: Environment) {
        return this.getValue(tree, table);
    }

    getAST(): Node{
        return new Node("node");
    }

    getCST(): Node {
        return new Node("Node");
    }
}
