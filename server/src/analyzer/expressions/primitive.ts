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
        return undefined;
    }

    getValue(tree: Tree, table: Environment): ReturnType {
        switch(this.type){
            case Primitive.INT: {
                this.value = Number(this.value);
                break;
            }
            case Primitive.BOOLEAN: {
                this.value = this.value.toLowerCase() == 'true'? true : false;
                break;
            }
            case Primitive.DOUBLE: {
                this.value = Number(this.value);
                break;
            }
            case Primitive.NULL: {
                this.value = null;
                break;
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
