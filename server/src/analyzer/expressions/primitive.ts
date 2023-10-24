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
                this.value.setDate(this.value.getDate());
            }
        }
        return new ReturnType(this.type, this.value);
    }

    getCST(): Node {
        let node: Node = new Node("Primitive");
        node.addChild(this.value);
        return node;
    }

    getAST(): Node {
        let node: Node;
        if (this.type === Primitive.VARCHAR){
            let val: string = this.value;
            val = val.replace(/\n/g, "/n");
            val= val.replace(/\"/g, '/');
            val= val.replace(/\'/g, "/");
            val= val.replace(/\t/g, "‎/t");
            val= val.replace(/\\/g, "//");
            node = new Node(val);
        } else {
            node = new Node(`${this.value}`);
        }
        return node;
    }
}
