
import Symbol from "./symbol";
import { Exception } from "../errors";
import Table from "./Table";


export function createGlobalEnv() {
    const env = new Environment();
    // Define a native builtin method

    // TODO
    // delcare lower function
    //env.setSymbol(new Symbol("LOWER"))
    // declare upper function
    //env.setSymbol(new Symbol("UPPER"))
    // declare round function
    //env.setSymbol(new Symbol("ROUND"))
    // declare LENGHT function
    //env.setSymbol(new Symbol("LENGTH"))
    // declare TRUNCATE function
    //env.setSymbol(new Symbol("TRUNCATE"))
    // declare typeof function
    //env.setSymbol(new Symbol("TYPEOF"))

    return env;
}



export default class Environment {
    public name: string;
    public parent?: Environment;
    public table: Map<string, Symbol>;
    public db: Map<string, Table>

    constructor(parent?: Environment, name: string = "Global") {
        const global = parent ? true : false;
        this.parent = parent;
        this.table = new Map();
        this.name = name;
        this.db = new Map();
    }
    // DB OPERATIONS
    public setTable(table: Table, line: number, column: number): undefined | Exception{
        let env: Environment = this.getGlobalEnv();
        if (env.db.has(table.id)){
            return new Exception("Semantic", `Table name ${table.id} aready defined the Data Base`, line, column, "global");
        }

        env.db.set(table.id, table);
    }

    public updateTable(table: Table, line: number, column: number): undefined | Exception{
        const env = this.getGlobalEnv();

        if (!env.db.has(table.id)){
            return new Exception("Semantic", `Table ${table.id} isn't defined in the current scope`, line, column, this.name);
        }
        env.db.set(table.id, table);
    }

    public getTable(table: Table, line: number, column: number): Table | Exception{
        const env = this.getGlobalEnv();

        if (!env.db.has(table.id)){
            return new Exception("Semantic", `Table ${table.id} isn't defined in the current scope`, line, column, this.name);
        }

        return env.db.get(table.id) as Table
    }

    private getGlobalEnv(): Environment{
        if (this.parent !== undefined)
            return this.parent.getGlobalEnv();
        return this;
    }


    // LOGIC OPERATIONS
    public setSymbol(symbol: Symbol){
        let env: Environment | Exception = this.resolveSymbol(symbol);
        if (env instanceof Exception){
            symbol.id = symbol.id.toLowerCase();
            symbol.environment = this;
            this.table.set(symbol.id, symbol);
        } else {
            return new Exception("Semantic", `Variable name ${symbol.id} already defined on scope`, symbol.row, symbol.column, this.name);
        }
    }

    public updateSymbol(symbol: Symbol){
        const env = this.resolveSymbol(symbol);

        if (env instanceof Exception){
            return env;
        }

        let envVar = env.table.get(symbol.id);

        if (envVar !== undefined){
            if (envVar.type === symbol.type) {
                envVar.value = symbol.value;
                return undefined;
            }

            return new Exception("Semantic", `The variable: ${symbol.id} isn't type: ${symbol.type}`, symbol.row, symbol.column, this.name);
        }
    }

    public getSymbol(symbol: Symbol): Exception | Symbol{
        const env = this.resolveSymbol(symbol);
        if (env instanceof Exception){
            return env;
        }

        return env.table.get(symbol.id) as Symbol;
    }

    public resolveSymbol(symbol: Symbol): Environment | Exception {
        symbol.id = symbol.id.toLowerCase();

        if (this.table.has(symbol.id)) {
            return this;
        }

        if (this.parent == undefined) {
            return new Exception("Semantic", `Cannot resolve '${symbol.id}' as it does not exist.`, symbol.row, symbol.column, this.name);
        }

        return this.parent.resolveSymbol(symbol);
    }
}
