import { Statement } from "../../abastract/ast";
import Table from "../../tools/Table";
import Environment from "../../tools/environments";
import Tree from "../../tools/tree";


export class WherePredicate {
    constructor(public condition: Statement, public line: number , public column: number){
        console.log(JSON.stringify(condition, null, 2));
    }

    getColumnIndexes(tree: Tree, table: Environment, db: Table): number[]{

        return [2];
    }



}
