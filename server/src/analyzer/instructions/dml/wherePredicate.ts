import { WhereExp } from "../../abastract/ast";
import { Exception } from "../../errors";
import { Logical } from "../../expressions/logical";
import { Relational } from "../../expressions/relational";
import Table from "../../tools/Table";
import Environment from "../../tools/environments";
import Tree from "../../tools/tree";



export class WherePredicate {
    constructor(public condition: WhereExp, public line: number, public column: number) {
        //console.log(JSON.stringify(condition, null, 4));
    }

    getColumnIndexes(tree: Tree, table: Environment, db: Table): Array<number> {
        if (!(this.condition instanceof Logical || this.condition instanceof Relational)){
            throw new Exception("Semantic", `Condition of type '${typeof this.condition}' isn't of Type 'Logical' or 'Expression'`, this.line, this.column);
        }
        let arr: Array<number>;
        arr = this.condition.getIndexValue(tree, table, db);
        return arr;
    }
}
