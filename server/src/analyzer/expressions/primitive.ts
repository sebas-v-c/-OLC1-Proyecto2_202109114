import { Node, Statement } from "../abastract/ast";
import Environment from "../tools/environments";
import ReturnType from "../tools/returnType";
import { Primitive } from "../tools/types";
import Tree from "../tools/tree";


export class PrimitiveVar implements Statement {
    public value: any;
    public type: Primitive;
    public line: number;
    public column: number;

    constructor(value: string, type: Primitive,line: number, column: number,){
        this.value = value;
        this.type = type;
        this.line = line;
        this.column = column;
    }

    interpret(tree: Tree, table: Environment) {
        return this.getValue(tree, table);
    }

    getValue(tree: Tree, table: Environment): ReturnType {
        switch(this.type){
            case Primitive.INT: {
                this.value = parseInt(this.value);
                break;
            }
            case Primitive.BOOLEAN: {
                this.value = this.value.toLowerCase() == 'true'? true : false;
                break;
            }
            case Primitive.DOUBLE: {
                this.value = parseFloat(this.value);
                break;
            }
            case Primitive.NULL: {
                this.value = null;
                break;
            }
            case Primitive.VARCHAR: {
                this.value = this.value;
                break;
            }
            case Primitive.DATE: {
                this.value = new Date(this.value);
            }
        }
        return new ReturnType(this.type, this.value);
    }

    getCST(): Node {
        return new Node("Node");
    }

    getAST(): Node {
        return new Node('Node');
    }


}
