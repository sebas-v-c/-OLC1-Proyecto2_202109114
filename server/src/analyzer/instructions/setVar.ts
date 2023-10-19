import { Node, Statement } from "../abastract/ast";
import { Exception } from "../errors";
import Environment from "../tools/environments";
import ReturnType from "../tools/returnType";
import Tree from "../tools/tree";
import { Primitive } from "../tools/types";
import Symbol from "../tools/symbol";




export class SetVar implements Statement {
    public line;
    public column;
    public id: string;
    public expression: Statement;

    constructor(id: string, expression: Statement, line: number, column: number){
        this.id = id;
        this.expression = expression;
        this.line = line;
        this.column = column;
    }

    getValue(tree: Tree, table: Environment): ReturnType {
        return new ReturnType(Primitive.NULL, null);
    }

    interpret(tree: Tree, table: Environment) {
        let value: ReturnType;
        let symbol: Symbol;

        let result: any;

        try {
            symbol = table.getSymbol(new Symbol(this.id, Primitive.NULL, null,this.line, this.column, table));
        } catch(err){
            tree.errors.push(err as Exception); throw err;
        }

        try {
            value = this.expression.getValue(tree, table)
        }catch(err){
            tree.errors.push(err as Exception); throw err;
        }

        if (symbol.type !== value.type){
            let err = new Exception("Semantic", `Type: ${value.type} can't be assigned to variable of type: ${symbol.type}`, this.line, this.column, table.name);
            tree.errors.push(err); throw err;
        }

        try {
            result = table.updateSymbol(new Symbol(this.id, value.type, value.value, this.line, this.column, table));
        } catch(err){
            tree.errors.push(err as Exception); throw err;
        }
    }

    getAST(): Node{
        return new Node("node");
    }

    getCST(): Node {
        return new Node("Node");
    }
}
