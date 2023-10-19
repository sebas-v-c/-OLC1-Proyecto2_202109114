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

    // DDL actions
    public setTable(table: Table, line: number, column: number): void {
        let env: Environment = this.getGlobalEnv();
        if (env.db.has(table.id)){
            throw new Exception("Semantic", `Table name ${table.id} aready defined the Data Base`, line, column, "global");
        }

        env.db.set(table.id, table);
    }

    public updateTableName(oldName: string, newName: string){
        oldName = oldName.toLowerCase();
        newName = newName.toLowerCase();
        const env = this.getGlobalEnv();
        if (!env.db.has(oldName)){
            throw new Exception("DB", `Table name ${oldName} does not exist`, 0, 0);
        }

        let oldTable = env.db.get(oldName);
        if (oldTable !== undefined){
            env.db.delete(oldName);
            oldTable.id = newName;
            env.db.set(newName, oldTable);
        }
    }

    public updateTable(table: Table, line: number, column: number): void {
        const env = this.getGlobalEnv();

        if (!env.db.has(table.id)){
            throw new Exception("Semantic", `Table ${table.id} isn't defined in the current scope`, line, column, this.name);
        }
        env.db.set(table.id, table);
    }

    public dropTable(table: Table, line: number, column: number): void{
        const env = this.getGlobalEnv();
        if (!env.db.has(table.id)){
            throw new Exception("Semantic", `Table ${table.id} isn't defined in the current scope`, line, column, this.name);
        }
        env.db.delete(table.id);
    }

    public getTable(tableName: string, line: number, column: number): Table{
        const env = this.getGlobalEnv();

        if (!env.db.has(tableName.toLowerCase())){
            throw new Exception("Semantic", `Table ${tableName} isn't defined in the current scope`, line, column, this.name);
        }

        return env.db.get(tableName.toLowerCase()) as Table
    }

    public getGlobalEnv(): Environment{
        if (this.parent !== undefined)
            return this.parent.getGlobalEnv();
        return this;
    }

    // LOGIC OPERATIONS
    public setSymbol(symbol: Symbol){
        try {
            let env: Environment = this.resolveSymbol(symbol);
            throw new Exception("Semantic", `Variable name ${symbol.id} already defined on scope`, symbol.row, symbol.column, this.name);
        } catch(err){
            symbol.id = symbol.id.toLowerCase();
            symbol.environment = this;
            this.table.set(symbol.id, symbol);
        }
    }

    public updateSymbol(symbol: Symbol){
        const env = this.resolveSymbol(symbol);

        let envVar = env.table.get(symbol.id);

        if (envVar !== undefined){
            if (envVar.type === symbol.type) {
                envVar.value = symbol.value;
                return;
            }

            throw new Exception("Semantic", `The variable: ${symbol.id} isn't type: ${symbol.type}`, symbol.row, symbol.column, this.name);
        }
    }

    public getSymbol(symbol: Symbol): Symbol{
        const env = this.resolveSymbol(symbol);

        return env.table.get(symbol.id) as Symbol;
    }

    public resolveSymbol(symbol: Symbol): Environment {
        symbol.id = symbol.id.toLowerCase();

        if (this.table.has(symbol.id)) {
            return this;
        }

        if (this.parent == undefined) {
            throw new Exception("Semantic", `Cannot resolve '${symbol.id}' as it does not exist.`, symbol.row, symbol.column, this.name);
        }

        return this.parent.resolveSymbol(symbol);
    }
}
