import { Statement } from "../../abastract/ast";
import Table from "../../tools/Table";


export class WherePredicate {
    constructor(public condition: Statement, public line: number , public column: number){
        console.log(JSON.stringify(condition, null, 2));
    }

    getColumnIndexesFromCondition(condition: Statement, table: Table): number[]{

        return [2];
    }

}
