import { Node, Statement, WhereExp } from "../abastract/ast";
import Environment from "../tools/environments";
import ReturnType from "../tools/returnType";
import { ArithmeticOperator, LogicalOperator, Primitive, RelationalOperator } from "../tools/types";
import Tree from "../tools/tree";
import { Exception } from "../errors";
import Symbol from "../tools/symbol";
import { PrimitiveVar } from "./primitive";
import Table from "../tools/Table";

type Ret = { left: ReturnType, right: ReturnType }

export class Logical implements WhereExp {
    public leftExp: Statement;
    public rightExp: Statement;
    public operator: LogicalOperator;
    public line: number;
    public column: number;

    constructor(leftExp: Statement, operator: LogicalOperator, rightExp: Statement, line: number, column: number,){
        this.leftExp = leftExp;
        this.operator = operator;
        this.rightExp = rightExp;
        this.line = line;
        this.column = column;
    }
    // TODO
    getIndexValue(tree: Tree, table: Environment, dbTable: Table): number[] {
        //throw new Error("Method not implemented.");
        return [0];
    }

    interpret(tree: Tree, table: Environment) {
        return undefined;
    }

    getValue(tree: Tree, table: Environment): ReturnType {
        switch(this.operator){
            case LogicalOperator.AND: {
                try {
                    return this._andOperation(table, tree);
                } catch(err){
                    tree.errors.push(err as Exception); throw err;
                }
            }
            case LogicalOperator.OR: {
                try {
                    return this._orOperation(table, tree);
                } catch(err){
                    tree.errors.push(err as Exception); throw err;
                }
            }
            case LogicalOperator.NOT: {
                try {
                    return this._notOperation(table, tree);
                } catch(err){
                    tree.errors.push(err as Exception); throw err;
                }
            }
        }
    }
    // I should change this but I'm a lazy bastard so IDC

    _andOperation(table: Environment, tree: Tree): ReturnType {
        let results: Ret;
        try{
            results = this._testOperators(table, tree);
        } catch(err){
            throw err;
        }
        let leftResult: ReturnType = results.left;
        let rightResult: ReturnType = results.right;

        if (leftResult.type === Primitive.BOOLEAN && rightResult.type === Primitive.BOOLEAN){
            return new ReturnType(Primitive.BOOLEAN, leftResult.value && rightResult.value);
        }

        throw new Exception("Type Error", `"AND" not supported between instances of ${leftResult.type} and ${rightResult.type}`, this.line, this.column, table.name);
    }

    _orOperation(table: Environment, tree: Tree): ReturnType {
        let results: Ret;
        try{
            results = this._testOperators(table, tree);
        } catch(err){
            throw err;
        }
        let leftResult: ReturnType = results.left;
        let rightResult: ReturnType = results.right;

        if (leftResult.type === Primitive.BOOLEAN && rightResult.type === Primitive.BOOLEAN){
            return new ReturnType(Primitive.BOOLEAN, leftResult.value || rightResult.value);
        }

        throw new Exception("Type Error", `"AND" not supported between instances of ${leftResult.type} and ${rightResult.type}`, this.line, this.column, table.name);
    }

    _notOperation(table: Environment, tree: Tree): ReturnType {
        let rightResult: ReturnType = this.rightExp.getValue(tree, table);

        if (rightResult.type === Primitive.BOOLEAN){
            return new ReturnType(Primitive.BOOLEAN, !rightResult.value);
        }

        throw new Exception("Type Error", `"NOT" not supported at instance of ${rightResult.type}`, this.line, this.column, table.name);
    }

    _testOperators(table: Environment, tree: Tree): Ret {
        let leftResult: ReturnType;
        let rightResult: ReturnType;
        try {
            leftResult = this.leftExp.getValue(tree, table);
            rightResult = this.rightExp.getValue(tree, table);
        } catch (err){
            throw err;
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
