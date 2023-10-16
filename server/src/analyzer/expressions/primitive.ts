import { Node, Statement } from "../abastract/ast";
import Environment from "../tools/environments";
import ReturnType from "../tools/returnType";
import { Booleans, Numerics, Primitive, Strings } from "../tools/types";
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
            case Numerics.INT: {
                this.value = Number(this.value);
                break;
            }
            case Booleans.BOOLEAN: {
                this.value = this.value.toLowerCase() == 'true'? true : false;
                break;
            }
            case Numerics.DOUBLE: {
                this.value = Number(this.value);
                break;
            }
            case Booleans.NULL: {
                this.value = null;
                break;
            }
            case Strings.VARCHAR: {
                this.value = this.value.slice(1, -1);
                break;
            }
            case Strings.DATE: {
                this.value = this.value
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
