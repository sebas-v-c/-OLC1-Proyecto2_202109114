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
                try {
                    result = table.setSymbol(symbol)
                } catch(err){
                    tree.errors.push(err as Exception); throw err;
                }
            }
        } else {
            try {
                value = this.expression.getValue(tree, table);
            }catch(err){
                tree.errors.push(err as Exception); throw err;
            }

            if (symbols[0].type !== value.type){
                let err = new Exception("Semantic", `Type: ${value.type} can't be assigned to variable of type: ${symbols[0].type}`, this.line, this.column, table.name);
                tree.errors.push(err); throw err;
            }

            symbols[0].value = value.value;
            try {
                table.setSymbol(symbols[0]);
            }catch(err){
                tree.errors.push(err as Exception); throw err;
            }
        }
    }

    getCST(): Node {
        let node: Node = new Node("Declaration");

        return new Node("Node");
    }

    getAST(): Node {
        let node: Node = new Node("DECLARE")
        for (let variable of this.vars){
            node.addChild(variable.id);
            node.addChild(variable.type.toUpperCase());
            if (this.expression !== undefined){
                node.addChildsNode(this.expression.getAST());
            }
        }
        return node;
    }




}
