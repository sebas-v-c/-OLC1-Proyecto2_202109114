import { Node, Statement } from "../abastract/ast";
import Environment from "../tools/environments";
import ReturnType from "../tools/returnType";
import { Booleans, Numerics, Primitive, RelationalOperator, Strings } from "../tools/types";
import Tree from "../tools/tree";
import { Exception } from "../errors";
import Symbol from "../tools/symbol";
import { PrimitiveVar } from "./primitive";


export class Relational implements Statement {
    public leftExp: Statement;
    public rightExp: Statement;
    public operator: RelationalOperator;
    public line: number;
    public column: number;

    constructor(leftExp: Statement, operator: RelationalOperator, rightExp: Statement, line: number, column: number,){
        this.leftExp = leftExp;
        this.operator = operator;
        this.rightExp = rightExp;
        this.line = line;
        this.column = column;
    }

    interpret(tree: Tree, table: Environment) {
        return undefined;
    }

    getValue(tree: Tree, table: Environment): ReturnType {
        switch(this.operator){
            case RelationalOperator.EQ: {
                let leftResult: ReturnType = this.leftExp.getValue(tree, table);
                if (leftResult.value instanceof Exception) {return leftResult}
                let rightResult: ReturnType = this.rightExp.getValue(tree, table);
                if (rightResult.value instanceof Exception) {return rightResult}
                return new ReturnType(Booleans.BOOLEAN,
                                      (this.leftExp.getValue(tree, table).value === this.rightExp.getValue(tree, table).value) &&
                    (this.leftExp.getValue(tree, table).type === this.rightExp.getValue(tree, table).type)
                                     );
            }
            case RelationalOperator.GREATER: {
                try{
                    this._test_numeric_operation(table, tree)
                } catch (err){
                    return new ReturnType(Booleans.NULL, err);
                }

                return new ReturnType(Booleans.BOOLEAN, this.leftExp.getValue(tree, table) >= this.rightExp.getValue(tree, table));
            }
        }
    }

    _test_numeric_operation(table: Environment, tree: Tree) {
        let leftResult: ReturnType = this.leftExp.getValue(tree, table);
        if (leftResult.value instanceof Exception) {
            throw new Exception(leftResult.value.type, leftResult.value.description, this.line, leftResult.value.column, table.name);
        }
        let rightResult: ReturnType = this.rightExp.getValue(tree, table);
        if (rightResult.value instanceof Exception) {
            throw new Exception(rightResult.value.type, rightResult.value.description, this.line, rightResult.value.column, table.name);
        }

        if (!((rightResult.type === Numerics.INT || rightResult.type === Numerics.DOUBLE)
            && (leftResult.type === Numerics.INT || leftResult.type === Numerics.DOUBLE)) ||
            !(rightResult.type === Strings.DATE && leftResult.type === Strings.DATE)){
            throw new Exception("Type Error", `Operation not supported between ${leftResult.type} and ${rightResult.type}`, this.line, this.column, table.name);
        }
    }

    getCST(): Node {
        return new Node("Node");
    }

    getAST(): Node {
        return new Node('Node');
    }


}
