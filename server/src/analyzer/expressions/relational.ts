import { Node, Statement, WhereExp } from "../abastract/ast";
import Environment from "../tools/environments";
import ReturnType from "../tools/returnType";
import { Primitive, RelationalOperator } from "../tools/types";
import Tree from "../tools/tree";
import { Exception } from "../errors";
import Table, { Column } from "../tools/Table";
import { IdVar } from "./id";
import { array, boolean } from "joi";

type Ret = { left: ReturnType, right: ReturnType }


export class Relational implements WhereExp {
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

    getIndexValue(tree: Tree, table: Environment, dbTable: Table): number[] {
        let colName: string;
        let expr: Statement;

        if (this.leftExp instanceof IdVar){
            colName = this.leftExp.value;
            expr = this.rightExp;
        } else {
            colName = (this.rightExp as IdVar).value;
            expr = this.leftExp;
        }

        let ret: ReturnType;
        try {
            ret = expr.getValue(tree, table);
        } catch(err){
            tree.errors.push(err as Exception); throw err;
        }

        /**
         * All powerful function that returns the indexes of a column that matches a condition
         * @author: sebas-v-c
         * @param {Array} array The column array
         * @param {(element: T) => boolean} cond the condition that should be matched
         */
        function filterColumn<T>(
            array: T[],
            cond: (element: T) => boolean
        ): number[]{
            return array.map((element, index) => ({ element, index }))
                .filter(({element}) => cond(element))
                .map(({index}) => index);
        }

        switch(this.operator){
            case RelationalOperator.EQ: {
                try {
                    let col: Column = dbTable.getColumn(colName);
                    if (!col.isValidData(ret)){
                        // TODO change this as needed
                        // this will return an empty array, instead of throwing an error
                        return [];
                    }
                    let cleanCols: any[] = col.data.map(obj => obj.value);
                    if (col.type === Primitive.DATE){
                        cleanCols = cleanCols.map(obj => obj.getTime())
                        return filterColumn(cleanCols, (element: number) => element === ret.value.getTime());
                    }
                    return filterColumn(cleanCols, (element: number) => element === ret.value);
                } catch(err){
                    tree.errors.push(err as Exception); throw err;
                }
            }
            case RelationalOperator.GEQ: {
                try {
                    let col: Column = dbTable.getColumn(colName);
                    if (!col.isValidData(ret)){
                        // TODO change this as needed
                        // this will return an empty array, instead of throwing an error
                        return [];
                    }
                    const cleanCols: any[] = col.data.map(obj => obj.value);
                    return filterColumn(cleanCols, (element: number) => element >= ret.value);
                } catch(err){
                    tree.errors.push(err as Exception); throw err;
                }
            }
            case RelationalOperator.GREATER: {
                try {
                    let col: Column = dbTable.getColumn(colName);
                    if (!col.isValidData(ret)){
                        // TODO change this as needed
                        // this will return an empty array, instead of throwing an error
                        return [];
                    }
                    const cleanCols: any[] = col.data.map(obj => obj.value);
                    return filterColumn(cleanCols, (element: number) => element > ret.value);
                } catch(err){
                    tree.errors.push(err as Exception); throw err;
                }
            }
            case RelationalOperator.LEQ: {
                try {
                    let col: Column = dbTable.getColumn(colName);
                    if (!col.isValidData(ret)){
                        // TODO change this as needed
                        // this will return an empty array, instead of throwing an error
                        return [];
                    }
                    const cleanCols: any[] = col.data.map(obj => obj.value);
                    return filterColumn(cleanCols, (element: number) => element <= ret.value);
                } catch(err){
                    tree.errors.push(err as Exception); throw err;
                }
            }
            case RelationalOperator.LESS: {
                try {
                    let col: Column = dbTable.getColumn(colName);
                    if (!col.isValidData(ret)){
                        // TODO change this as needed
                        // this will return an empty array, instead of throwing an error
                        return [];
                    }
                    const cleanCols: any[] = col.data.map(obj => obj.value);
                    return filterColumn(cleanCols, (element: number) => element <= ret.value);
                } catch(err){
                    tree.errors.push(err as Exception); throw err;
                }
            }
            case RelationalOperator.NEQ: {
                try {
                    let col: Column = dbTable.getColumn(colName);
                    const cleanCols: any[] = col.data.map(obj => obj.value);
                    return filterColumn(cleanCols, (element: number) => element !== ret.value);
                } catch(err){
                    tree.errors.push(err as Exception); throw err;
                }
            }
        }
    }

    interpret(tree: Tree, table: Environment) {
        return undefined;
    }

    getValue(tree: Tree, table: Environment): ReturnType {
        switch(this.operator){
            case RelationalOperator.EQ: {
                try {
                    return this._equal_operation(table, tree);
                } catch(err){
                    tree.errors.push(err as Exception); throw err;
                }
            }
            case RelationalOperator.GREATER: {
                try {
                    return this._greater_operation(table, tree);
                } catch(err){
                    tree.errors.push(err as Exception); throw err;
                }
            }
            case RelationalOperator.GEQ: {
                try {
                    return this._geq_operation(table, tree);
                } catch(err){
                    tree.errors.push(err as Exception); throw err;
                }
            }
            case RelationalOperator.LESS: {
                try {
                    return this._less_operation(table, tree);
                } catch(err){
                    tree.errors.push(err as Exception); throw err;
                }
            }
            case RelationalOperator.LEQ: {
                try {
                    return this._leq_operation(table, tree);
                } catch(err){
                    tree.errors.push(err as Exception); throw err;
                }
            }
            case RelationalOperator.NEQ: {
                try {
                    return this._neq_operation(table, tree);
                } catch(err){
                    tree.errors.push(err as Exception); throw err;
                }
            }
        }
    }
    _neq_operation(table:Environment, tree: Tree): ReturnType {
        let leftResult: ReturnType;
        let rightResult: ReturnType;
        try {
            leftResult = this.leftExp.getValue(tree, table);
            rightResult = this.rightExp.getValue(tree, table);
        } catch (err){
            tree.errors.push(err as Exception); throw err;
        }

        return new ReturnType(
            Primitive.BOOLEAN,
            (leftResult.value !== rightResult.value) &&
                (leftResult.type !== rightResult.type)
        );
    }


    _equal_operation(table: Environment, tree: Tree): ReturnType {
        let leftResult: ReturnType;
        let rightResult: ReturnType;
        try {
            leftResult = this.leftExp.getValue(tree, table);
            rightResult = this.rightExp.getValue(tree, table);
        } catch (err){
            tree.errors.push(err as Exception); throw err;
        }

        return new ReturnType(
            Primitive.BOOLEAN,
            (leftResult.value === rightResult.value) &&
                (leftResult.type === rightResult.type)
        );
    }

    _greater_operation(table: Environment, tree: Tree): ReturnType {
        let results: Ret;
        try{
            results = this._testOperators(table, tree);
        } catch(err){
            throw err;
        }
        let leftResult: ReturnType = results.left;
        let rightResult: ReturnType = results.right;

        if (leftResult.type === Primitive.DATE && rightResult.type === Primitive.DATE){
            return new ReturnType(Primitive.BOOLEAN, leftResult.value > rightResult.value);
        }
        if ((leftResult.type === Primitive.INT || leftResult.type === Primitive.DOUBLE) && (rightResult.type === Primitive.INT || rightResult.type === Primitive.DOUBLE)){
            return new ReturnType(Primitive.BOOLEAN, leftResult.value > rightResult.value);
        }

        throw new Exception("Type Error", `''>' not supported between instances of ${leftResult.type} and ${rightResult.type}`, this.line, this.column, table.name);
    }

    _less_operation(table: Environment, tree: Tree): ReturnType {
        let results: Ret;
        try{
            results = this._testOperators(table, tree);
        } catch(err){
            throw err;
        }
        let leftResult: ReturnType = results.left;
        let rightResult: ReturnType = results.right;

        if (leftResult.type === Primitive.DATE && rightResult.type === Primitive.DATE){
            return new ReturnType(Primitive.BOOLEAN, leftResult.value < rightResult.value);
        }
        if ((leftResult.type === Primitive.INT || leftResult.type === Primitive.DOUBLE) && (rightResult.type === Primitive.INT || rightResult.type === Primitive.DOUBLE)){
            return new ReturnType(Primitive.BOOLEAN, leftResult.value < rightResult.value);
        }

        throw new Exception("Type Error", `'<' not supported between instances of ${leftResult.type} and ${rightResult.type}`, this.line, this.column, table.name);
    }


    _geq_operation(table: Environment, tree: Tree): ReturnType {
        let results: Ret;
        try{
            results = this._testOperators(table, tree);
        } catch(err){
            throw err;
        }
        let leftResult: ReturnType = results.left;
        let rightResult: ReturnType = results.right;

        if (leftResult.type === Primitive.DATE && rightResult.type === Primitive.DATE){
            return new ReturnType(Primitive.BOOLEAN, leftResult.value >= rightResult.value);
        }
        if ((leftResult.type === Primitive.INT || leftResult.type === Primitive.DOUBLE) && (rightResult.type === Primitive.INT || rightResult.type === Primitive.DOUBLE)){
            return new ReturnType(Primitive.BOOLEAN, leftResult.value >= rightResult.value);
        }

        throw new Exception("Type Error", `'>=' not supported between instances of ${leftResult.type} and ${rightResult.type}`, this.line, this.column, table.name);
    }

    _leq_operation(table: Environment, tree: Tree): ReturnType {
        let results: Ret;
        try{
            results = this._testOperators(table, tree);
        } catch(err){
            throw err;
        }
        let leftResult: ReturnType = results.left;
        let rightResult: ReturnType = results.right;

        if (leftResult.type === Primitive.DATE && rightResult.type === Primitive.DATE){
            return new ReturnType(Primitive.BOOLEAN, leftResult.value <= rightResult.value);
        }
        if ((leftResult.type === Primitive.INT || leftResult.type === Primitive.DOUBLE) && (rightResult.type === Primitive.INT || rightResult.type === Primitive.DOUBLE)){
            return new ReturnType(Primitive.BOOLEAN, leftResult.value <= rightResult.value);
        }

        throw new Exception("Type Error", `'<=' not supported between instances of ${leftResult.type} and ${rightResult.type}`, this.line, this.column, table.name);
    }



    _test_numeric_operation(table: Environment, tree: Tree) {
        let results: Ret;
        try{
            results = this._testOperators(table, tree);
        } catch(err){
            throw err;
        }
        let leftResult: ReturnType = results.left;
        let rightResult: ReturnType = results.right;

        if (!((leftResult.type === Primitive.INT || leftResult.type === Primitive.DOUBLE) && (rightResult.type === Primitive.INT || rightResult.type === Primitive.DOUBLE))){
            throw new Exception(rightResult.value.type, rightResult.value.description, this.line, rightResult.value.column, table.name);
        }
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
        let node: Node = new Node("Relational Expression");
        node.addChildsNode(this.leftExp.getCST());
        node.addChild(this.operator.toString());
        node.addChildsNode(this.rightExp.getCST());
        return node;
    }

    getAST(): Node {
        let node: Node = new Node(this.operator);
        node.addChildsNode(this.leftExp.getAST());
        node.addChildsNode(this.rightExp.getAST());
        return node;
    }


}
