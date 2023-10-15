import { Statement } from "../abastract/ast";
import Environment from "../tools/environments";
import ReturnType from "../tools/returnType";
import { Primitive } from "../tools/types";
import Tree from "../tools/tree";
import { Node } from "../abastract/ast";
import Symbol from "../tools/symbol";
import { Exception } from "../errors";




export class Declaration implements Statement {
    public type: Primitive;
    public id: string;
    public expression: Statement;
    public line: number;
    public column: number;

    constructor(type: Primitive, id: string, expression: Statement, line: number, column: number,){
        this.type = type;
        this.id = id;
        this.expression = expression;
        this.line = line;
        this.column = column;
    }

    getValue(tree: Tree, table: Environment): ReturnType {
        return new ReturnType(Primitive.NULL, undefined);
    }

    interpret(tree: Tree, table: Environment) {
        let value: ReturnType;
        let symbol: Symbol;

        value = this.expression.getValue(tree, table);

        if(value.value instanceof Exception){
            // semantic error
            return value.value;
        }

        if (this.type !== value.type){
            // semantic error
            return new Exception("Semantic", `Type: ${value.type} can't be assigned to variable of type: ${this.type}`, this.line, this.column, table.name);
        }

        let result: any = table.setSymbol(new Symbol(this.id, this.type, value.value, this.line, this.column, table.name));

        if (result instanceof Exception){
            return result;
        }

        return undefined;

    }

    getCST(): Node {

        return new Node("Node");
    }

    getAST(): Node {
        return new Node('NOde');
    }




}
