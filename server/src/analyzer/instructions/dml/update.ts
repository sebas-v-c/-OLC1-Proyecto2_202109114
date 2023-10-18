import { Statement } from "../../abastract/ast";
import Environment from "../../tools/environments";
import ReturnType from "../../tools/returnType";
import { Primitive } from "../../tools/types";
import Tree from "../../tools/tree";
import { Node } from "../../abastract/ast";
import { Exception } from "../../errors";
import { Column } from "../../tools/Table";
import { WherePredicate } from "./whereType";

interface ColVal {
    col: string;
    val: Statement;
}


export class Update implements Statement {
    public colVal: Array<ColVal>;
    public cond: WherePredicate;
    constructor(public id: string, colVal: Array<ColVal>, cond: WherePredicate ,public line: number, public column: number){
        this.colVal = colVal;
        this.cond = cond;
    }

    getValue(tree: Tree, table: Environment): ReturnType {
        return new ReturnType(Primitive.NULL, undefined);
    }


    interpret(tree: Tree, table: Environment) {
    }

    getCST(): Node {
        return new Node("Node");
    }

    getAST(): Node {
        return new Node('NOde');
    }
}
