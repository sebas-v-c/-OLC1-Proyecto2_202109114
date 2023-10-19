import { WhereExp } from "../../abastract/ast";
import { Exception } from "../../errors";
import Table from "../../tools/Table";
import Environment from "../../tools/environments";
import Tree from "../../tools/tree";



export class WherePredicate {
    constructor(public condition: WhereExp, public line: number, public column: number) {
        console.log(JSON.stringify(condition, null, 4));
    }

    getColumnIndexes(tree: Tree, table: Environment, db: Table): Array<number> {
        let arr: Array<number>;
        try{
            arr = this.condition.getIndexValue(tree, table, db);
        } catch(err){
            tree.errors.push(err);
        }

        return arr;
    }



}
