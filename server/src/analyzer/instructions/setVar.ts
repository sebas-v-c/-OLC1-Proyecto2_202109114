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
        let symbol: Symbol | Exception;

        let result: any;

        symbol = table.getSymbol(new Symbol(this.id, Primitive.NULL, null,this.line, this.column, table));

        if (symbol instanceof Exception){
            return new Exception("Semantic", `Variable ${this.id} isn't defined in the current scope`, this.line, this.column, table.name);
        }

        value = this.expression.getValue(tree, table)

        if (value.value instanceof Exception){
            return value.value;
        }
        if (symbol.type !== value.type){
            return new Exception("Semantic", `Type: ${value.type} can't be assigned to variable of type: ${symbol.type}`, this.line, this.column, table.name);
        }

        result = table.updateSymbol(symbol);

        if (result instanceof Exception){
            return result;
        }

        return undefined;
    }

    getAST(): Node{
        return new Node("node");
    }

    getCST(): Node {
        return new Node("Node");
    }
}
