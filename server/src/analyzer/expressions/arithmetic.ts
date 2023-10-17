import { Node, Statement } from "../abastract/ast";
import Environment from "../tools/environments";
import ReturnType from "../tools/returnType";
import { ArithmeticOperator, Primitive, RelationalOperator } from "../tools/types";
import Tree from "../tools/tree";
import { Exception } from "../errors";
import Symbol from "../tools/symbol";
import { PrimitiveVar } from "./primitive";

type Ret = { left: ReturnType, right: ReturnType }

export class Arithmetic implements Statement {
    public leftExp: Statement;
    public rightExp: Statement;
    public operator: ArithmeticOperator;
    public line: number;
    public column: number;

    constructor(leftExp: Statement, operator: ArithmeticOperator, rightExp: Statement, line: number, column: number,){
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
            case ArithmeticOperator.PLUS: {
                try {
                    return this._plusOperation(table, tree);
                } catch(err){
                    return new ReturnType(Primitive.NULL, null);
                }
            }
            case ArithmeticOperator.MINUS: {
                try {
                    return this._greater_operation(table, tree);
                } catch(err){
                    return new ReturnType(Primitive.NULL, err);
                }
            }
            case ArithmeticOperator.MULT: {
                try {
                    return this._geq_operation(table, tree);
                } catch(err){
                    return new ReturnType(Primitive.NULL, err);
                }
            }
            case ArithmeticOperator.DIV: {
                try {
                    return this._less_operation(table, tree);
                } catch(err){
                    return new ReturnType(Primitive.NULL, err);
                }
            }
            case ArithmeticOperator.MOD: {
                try {
                    return this._leq_operation(table, tree);
                } catch(err){
                    return new ReturnType(Primitive.NULL, err);
                }
            }
            case ArithmeticOperator.UMINUS: {
                try {
                    return this._greater_operation(table, tree);
                } catch(err){
                    return new ReturnType(Primitive.NULL, err);
                }
            }
        }
    }

    _plusOperation(table: Environment, tree: Tree): ReturnType {
        let results: Ret;
        try{
            results = this._testOperators(table, tree);
        } catch(err){
            throw err;
        }
        let leftResult: ReturnType = results.left;
        let rightResult: ReturnType = results.right;

        if (leftResult.type === Primitive.INT && rightResult.type === Primitive.INT){
            return new ReturnType(Primitive.INT, leftResult.value + rightResult.value);
        }
        if ((leftResult.type === Primitive.DOUBLE || leftResult.type === Primitive.INT) && (rightResult.type === Primitive.INT || rightResult.type === Primitive.DOUBLE)){
            return new ReturnType(Primitive.DOUBLE, leftResult.value + rightResult.value);
        }
        if ((leftResult.type === Primitive.DATE) && (rightResult.type === Primitive.INT || rightResult.type === Primitive.DOUBLE)){
            leftResult.value.setDate(leftResult.value.getDate() + rightResult.value);
            return new ReturnType(Primitive.DATE, leftResult.value);
        }
        if ((rightResult.type === Primitive.DATE) && (leftResult.type === Primitive.INT || leftResult.type === Primitive.DOUBLE)){
            rightResult.value.setDate(leftResult.value + rightResult.value.getDate());
            return new ReturnType(Primitive.DATE, rightResult.value);
        }
        if (leftResult.type === Primitive.VARCHAR && rightResult.type === Primitive.VARCHAR){
            return new ReturnType(Primitive.VARCHAR, leftResult.value + rightResult.value);
        }

        throw new Exception("Type Error", `"+" not supported between instances of ${leftResult.type} and ${rightResult.type}`, this.line, this.column, table.name);
    }

    _minusOperation(table: Environment, tree: Tree): ReturnType {
        let results: Ret;
        try{
            results = this._testOperators(table, tree);
        } catch(err){
            throw err;
        }
        let leftResult: ReturnType = results.left;
        let rightResult: ReturnType = results.right;

        if (leftResult.type === Primitive.INT && rightResult.type === Primitive.INT){
            return new ReturnType(Primitive.INT, leftResult.value - rightResult.value);
        }
        if ((leftResult.type === Primitive.DOUBLE || leftResult.type === Primitive.INT) && (rightResult.type === Primitive.INT || rightResult.type === Primitive.DOUBLE)){
            return new ReturnType(Primitive.DOUBLE, leftResult.value - rightResult.value);
        }
        if ((leftResult.type === Primitive.DATE) && (rightResult.type === Primitive.INT || rightResult.type === Primitive.DOUBLE)){
            leftResult.value.setDate(leftResult.value.getDate() - rightResult.value);
            return new ReturnType(Primitive.DATE, leftResult.value);
        }
        if ((rightResult.type === Primitive.DATE) && (leftResult.type === Primitive.INT || leftResult.type === Primitive.DOUBLE)){
            rightResult.value.setDate(leftResult.value - rightResult.value.getDate());
            return new ReturnType(Primitive.DATE, rightResult.value);
        }

        throw new Exception("Type Error", `"-" not supported between instances of ${leftResult.type} and ${rightResult.type}`, this.line, this.column, table.name);
    }


    _multOperation(table: Environment, tree: Tree): ReturnType {
        let results: Ret;
        try{
            results = this._testOperators(table, tree);
        } catch(err){
            throw err;
        }
        let leftResult: ReturnType = results.left;
        let rightResult: ReturnType = results.right;

        if (leftResult.type === Primitive.INT && rightResult.type === Primitive.INT){
            return new ReturnType(Primitive.INT, leftResult.value * rightResult.value);
        }
        if ((leftResult.type === Primitive.DOUBLE || leftResult.type === Primitive.INT) && (rightResult.type === Primitive.INT || rightResult.type === Primitive.DOUBLE)){
            return new ReturnType(Primitive.DOUBLE, leftResult.value * rightResult.value);
        }

        throw new Exception("Type Error", `"*" not supported between instances of ${leftResult.type} and ${rightResult.type}`, this.line, this.column, table.name);
    }

    _divOperation(table: Environment, tree: Tree): ReturnType {
        let results: Ret;
        try{
            results = this._testOperators(table, tree);
        } catch(err){
            throw err;
        }
        let leftResult: ReturnType = results.left;
        let rightResult: ReturnType = results.right;

        if (leftResult.type === Primitive.INT && rightResult.type === Primitive.INT){
            return new ReturnType(Primitive.INT, Math.round(leftResult.value / rightResult.value));
        }
        if ((leftResult.type === Primitive.DOUBLE || leftResult.type === Primitive.INT) && (rightResult.type === Primitive.INT || rightResult.type === Primitive.DOUBLE)){
            return new ReturnType(Primitive.DOUBLE, leftResult.value / rightResult.value);
        }

        throw new Exception("Type Error", `"/" not supported between instances of ${leftResult.type} and ${rightResult.type}`, this.line, this.column, table.name);
    }

    _modOperation(table: Environment, tree: Tree): ReturnType {
        let results: Ret;
        try{
            results = this._testOperators(table, tree);
        } catch(err){
            throw err;
        }
        let leftResult: ReturnType = results.left;
        let rightResult: ReturnType = results.right;

        if (leftResult.type === Primitive.INT && rightResult.type === Primitive.INT){
            return new ReturnType(Primitive.INT, leftResult.value % rightResult.value);
        }
        if ((leftResult.type === Primitive.DOUBLE || leftResult.type === Primitive.INT) && (rightResult.type === Primitive.INT || rightResult.type === Primitive.DOUBLE)){
            return new ReturnType(Primitive.DOUBLE, (leftResult.value % rightResult.value));
        }

        throw new Exception("Type Error", `"%" not supported between instances of ${leftResult.type} and ${rightResult.type}`, this.line, this.column, table.name);
    }

    _uminusOperation(table: Environment, tree: Tree): ReturnType {
        let rightResult: ReturnType = this.rightExp.getValue(tree, table);
        if (rightResult.value instanceof Exception){
            throw rightResult.value;
        }

        if (rightResult.type === Primitive.INT){
            return new ReturnType(Primitive.INT, rightResult.value * -1);
        }
        if (rightResult.type === Primitive.DOUBLE){
            return new ReturnType(Primitive.DOUBLE, rightResult.value * -1.0);
        }

        throw new Exception("Type Error", `"-" not supported at instance of ${rightResult.type}`, this.line, this.column, table.name);
    }




    _testOperators(table: Environment, tree: Tree): Ret {
        let leftResult: ReturnType = this.leftExp.getValue(tree, table);
        if (leftResult.value instanceof Exception) {
            throw new Exception(leftResult.value.type, leftResult.value.description, this.line, leftResult.value.column, table.name);
        }
        let rightResult: ReturnType = this.rightExp.getValue(tree, table);
        if (rightResult.value instanceof Exception) {
            throw new Exception(rightResult.value.type, rightResult.value.description, this.line, rightResult.value.column, table.name);
        }

        return { left: leftResult, right: rightResult };
    }

    getCST(): Node {
        return new Node("Node");
    }

    getAST(): Node {
        return new Node('Node');
    }


}
