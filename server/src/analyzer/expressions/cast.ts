import { Node, Statement } from "../abastract/ast";
import Environment from "../tools/environments";
import ReturnType from "../tools/returnType";
import { Id, Primitive } from "../tools/types";
import Tree from "../tools/tree";
import { Exception } from "../errors";
import { string } from "joi";


export class Cast implements Statement {
    public expr: Statement;
    public toType: Primitive;
    constructor(expr: Statement, toType: Primitive, public line: number, public column: number){
        this.expr = expr;
        this.toType = toType;
    }

    interpret(tree: Tree, table: Environment) {
        return undefined;
    }

    getValue(tree: Tree, table: Environment): ReturnType {
        try {
            let res: ReturnType = this.expr.getValue(tree, table);
            let newRet = new ReturnType(Primitive.NULL, undefined);
            try {
                switch(this.toType){
                    case Primitive.BOOLEAN:{
                        newRet.value = Boolean(res.value);
                        newRet.type = Primitive.BOOLEAN;
                        return newRet;
                    }
                    case Primitive.DATE: {
                        newRet.value = new Date(res.value);
                        newRet.type = Primitive.DATE;
                        return newRet;
                    }
                    case Primitive.DOUBLE: {
                        let temp: string | number = String(res.value);
                        if (res.type === Primitive.DATE){
                            temp = Math.floor(res.value.getTime() / 1000)
                            newRet.value = temp;
                        } else {
                            newRet.value = parseFloat(temp);
                        }
                        newRet.type = Primitive.DOUBLE;
                        return newRet;
                    }
                    case Primitive.INT: {
                        let temp: string | number = String(res.value);
                        if (res.type === Primitive.DATE){
                            temp = Math.floor(res.value.getTime())
                            newRet.value = temp;
                        } else {
                            newRet.value = parseInt(temp);
                        }
                        newRet.type = Primitive.INT;
                        return newRet;
                    }
                    case Primitive.VARCHAR: {
                        newRet.value = String(res.value);
                        newRet.type = Primitive.VARCHAR;
                        return newRet;
                    }
                    case Primitive.NULL: {
                        newRet.value = null;
                        newRet.type = Primitive.NULL;
                        return newRet;
                    }
                }

            } catch(err){
                throw new Exception("Type Error", `Variable of type ${res.type} cannot be casted to type ${this.toType}`, 0, 0);
            }
        } catch (err){
            tree.errors.push(err as Exception); throw err;
        }
    }

    getCST(): Node {
        return new Node("Node");
    }

    getAST(): Node {
        let node: Node = new Node("CAST");
        node.addChildsNode(this.expr.getAST());
        node.addChild("TO");
        node.addChild(this.toType.toUpperCase());
        return node;
    }
}
