import { Statement } from "../abastract/ast";
import Environment from "../tools/environments";
import ReturnType from "../tools/returnType";
import { Primitive } from "../tools/types";
import Tree from "../tools/tree";
import { Node } from "../abastract/ast";
import Symbol from "../tools/symbol";
import { Exception } from "../errors";



interface Var  {
    id: string;
    type: Primitive;
}

export class Declaration implements Statement {
    public vars: Var[];
    public expression: Statement | undefined;
    public line: number;
    public column: number;

    constructor(vars: Var[], expression: Statement, line: number, column: number,){
        this.vars = vars;
        this.expression = expression;
        this.line = line;
        this.column = column;
    }

    getValue(tree: Tree, table: Environment): ReturnType {
        return new ReturnType(Primitive.NULL, undefined);
    }

    interpret(tree: Tree, table: Environment) {
        let value: ReturnType;
        let symbols: Symbol[] = [];


        for (const variable of this.vars) {
            symbols.push(new Symbol(variable.id.toLowerCase(), variable.type, null, this.line, this.column, table));
        }

        let result: any;

        if (this.expression === undefined) {
            for (const symbol of symbols){
                result = table.setSymbol(symbol);
            }
        } else {
            value = this.expression.getValue(tree, table);

            if (value.value instanceof Exception) {
                return value.value;
            }

            if (symbols[0].type !== value.type){
                return new Exception("Semantic", `Type: ${value.type} can't be assigned to variable of type: ${symbols[0].type}`, this.line, this.column, table.name);
            }

            symbols[0].value = value.value;
            result = table.setSymbol(symbols[0]);

        }

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
