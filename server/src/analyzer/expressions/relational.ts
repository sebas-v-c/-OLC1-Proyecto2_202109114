import { Node, Statement } from "../abastract/ast";
import Environment from "../tools/environments";
import ReturnType from "../tools/returnType";
import { Primitive, RelationalOperator } from "../tools/types";
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
                return new ReturnType(Primitive.BOOLEAN,
                                      (this.leftExp.getValue(tree, table).value === this.rightExp.getValue(tree, table).value) &&
                    (this.leftExp.getValue(tree, table).type === this.rightExp.getValue(tree, table).type)
                                     );
            }
            case RelationalOperator.GREATER: {
                try {
                    return this._greater_operation(table, tree);
                } catch(err){
                    return new ReturnType(Primitive.NULL, err);
                }
            }
            case RelationalOperator.GEQ: {
                try {
                    return this._geq_operation(table, tree);
                } catch(err){
                    return new ReturnType(Primitive.NULL, err);
                }
            }
            case RelationalOperator.LESS: {
                try {
                    return this._less_operation(table, tree);
                } catch(err){
                    return new ReturnType(Primitive.NULL, err);
                }
            }
            case RelationalOperator.LEQ: {
                try {
                    return this._leq_operation(table, tree);
                } catch(err){
                    return new ReturnType(Primitive.NULL, err);
                }
            }
            case RelationalOperator.NEQ: {
                let leftResult: ReturnType = this.leftExp.getValue(tree, table);
                if (leftResult.value instanceof Exception) {return leftResult}
                let rightResult: ReturnType = this.rightExp.getValue(tree, table);
                if (rightResult.value instanceof Exception) {return rightResult}
                return new ReturnType(Primitive.BOOLEAN,
                                      (this.leftExp.getValue(tree, table).value !== this.rightExp.getValue(tree, table).value) &&
                    (this.leftExp.getValue(tree, table).type !== this.rightExp.getValue(tree, table).type)
                                     );
            }
        }
    }

    _greater_operation(table: Environment, tree: Tree): ReturnType {
        let leftResult: ReturnType = this.leftExp.getValue(tree, table);
        if (leftResult.value instanceof Exception) {
            throw new Exception(leftResult.value.type, leftResult.value.description, this.line, leftResult.value.column, table.name);
        }
        let rightResult: ReturnType = this.rightExp.getValue(tree, table);
        if (rightResult.value instanceof Exception) {
            throw new Exception(rightResult.value.type, rightResult.value.description, this.line, rightResult.value.column, table.name);
        }

        if (leftResult.type === Primitive.DATE && rightResult.type === Primitive.DATE){
            return new ReturnType(Primitive.BOOLEAN, leftResult.value > rightResult.value);
        }
        if ((leftResult.type === Primitive.INT || leftResult.type === Primitive.DOUBLE) && (rightResult.type === Primitive.INT || rightResult.type === Primitive.DOUBLE)){
            return new ReturnType(Primitive.BOOLEAN, leftResult.value > rightResult.value);
        }

        throw new Exception("Type Error", `">" to supported between instances of ${leftResult.type} and ${rightResult.type}`, this.line, this.column, table.name);
    }

    _less_operation(table: Environment, tree: Tree): ReturnType {
        let leftResult: ReturnType = this.leftExp.getValue(tree, table);
        if (leftResult.value instanceof Exception) {
            throw new Exception(leftResult.value.type, leftResult.value.description, this.line, leftResult.value.column, table.name);
        }
        let rightResult: ReturnType = this.rightExp.getValue(tree, table);
        if (rightResult.value instanceof Exception) {
            throw new Exception(rightResult.value.type, rightResult.value.description, this.line, rightResult.value.column, table.name);
        }

        if (leftResult.type === Primitive.DATE && rightResult.type === Primitive.DATE){
            return new ReturnType(Primitive.BOOLEAN, leftResult.value < rightResult.value);
        }
        if ((leftResult.type === Primitive.INT || leftResult.type === Primitive.DOUBLE) && (rightResult.type === Primitive.INT || rightResult.type === Primitive.DOUBLE)){
            return new ReturnType(Primitive.BOOLEAN, leftResult.value < rightResult.value);
        }

        throw new Exception("Type Error", `">" to supported between instances of ${leftResult.type} and ${rightResult.type}`, this.line, this.column, table.name);
    }


    _geq_operation(table: Environment, tree: Tree): ReturnType {
        let leftResult: ReturnType = this.leftExp.getValue(tree, table);
        if (leftResult.value instanceof Exception) {
            throw new Exception(leftResult.value.type, leftResult.value.description, this.line, leftResult.value.column, table.name);
        }
        let rightResult: ReturnType = this.rightExp.getValue(tree, table);
        if (rightResult.value instanceof Exception) {
            throw new Exception(rightResult.value.type, rightResult.value.description, this.line, rightResult.value.column, table.name);
        }

        if (leftResult.type === Primitive.DATE && rightResult.type === Primitive.DATE){
            return new ReturnType(Primitive.BOOLEAN, leftResult.value >= rightResult.value);
        }
        if ((leftResult.type === Primitive.INT || leftResult.type === Primitive.DOUBLE) && (rightResult.type === Primitive.INT || rightResult.type === Primitive.DOUBLE)){
            return new ReturnType(Primitive.BOOLEAN, leftResult.value >= rightResult.value);
        }

        throw new Exception("Type Error", `">=" to supported between instances of ${leftResult.type} and ${rightResult.type}`, this.line, this.column, table.name);
    }

    _leq_operation(table: Environment, tree: Tree): ReturnType {
        let leftResult: ReturnType = this.leftExp.getValue(tree, table);
        if (leftResult.value instanceof Exception) {
            throw new Exception(leftResult.value.type, leftResult.value.description, this.line, leftResult.value.column, table.name);
        }
        let rightResult: ReturnType = this.rightExp.getValue(tree, table);
        if (rightResult.value instanceof Exception) {
            throw new Exception(rightResult.value.type, rightResult.value.description, this.line, rightResult.value.column, table.name);
        }

        if (leftResult.type === Primitive.DATE && rightResult.type === Primitive.DATE){
            return new ReturnType(Primitive.BOOLEAN, leftResult.value <= rightResult.value);
        }
        if ((leftResult.type === Primitive.INT || leftResult.type === Primitive.DOUBLE) && (rightResult.type === Primitive.INT || rightResult.type === Primitive.DOUBLE)){
            return new ReturnType(Primitive.BOOLEAN, leftResult.value <= rightResult.value);
        }

        throw new Exception("Type Error", `"<=" to supported between instances of ${leftResult.type} and ${rightResult.type}`, this.line, this.column, table.name);
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

        if (!((leftResult.type === Primitive.INT || leftResult.type === Primitive.DOUBLE) && (rightResult.type === Primitive.INT || rightResult.type === Primitive.DOUBLE))){
            throw new Exception(rightResult.value.type, rightResult.value.description, this.line, rightResult.value.column, table.name);
        }
    }

    getCST(): Node {
        return new Node("Node");
    }

    getAST(): Node {
        return new Node('Node');
    }


}
