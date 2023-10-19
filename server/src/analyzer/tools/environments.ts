import Symbol from "./symbol";
import { Exception } from "../errors";
import Table from "./Table";
import { Any, Functions, Id, Primitive, ValueType } from "./types";
import { Func, Function, NativeFunc } from "../instructions/function";
import { CodeBlock } from "../instructions/codeBlock";
import { Return } from "../instructions/return";
import { CallVar } from "../expressions/callVar";
import ReturnType from "./returnType";


export function createGlobalEnv() {
    const env = new Environment();
    // Define a native builtin functions
    env.setSymbol(new Symbol(
        "lower",
        Functions.NATIVE_FN,
        new NativeFunc(
            "LOWER",
            [{id: "@str", type: Primitive.VARCHAR}],
            (strVar) =>{
                strVar.value = (strVar.value as string).toLowerCase();
                return strVar;
            },
            0,0
        ), 0, 0, env
    ));

    env.setSymbol(new Symbol(
        "upper",
        Functions.NATIVE_FN,
        new NativeFunc(
            "UPPER",
            [{id: "@str", type: Primitive.VARCHAR}],

            (strVar) =>{
                strVar.value = (strVar.value as string).toUpperCase();
                return strVar;
            },
            0,0
        ), 0, 0, env
    ));

    env.setSymbol(new Symbol(
        "len",
        Functions.NATIVE_FN,
        new NativeFunc(
            "LEN",
            [{id: "@str", type: Primitive.VARCHAR}],
            (strVar) =>{
                strVar.value = (strVar.value as string).length;
                strVar.type = Primitive.INT;
                return strVar;
            },
            0,0
        ), 0, 0, env
    ));

    env.setSymbol(new Symbol(
        "round",
        Functions.NATIVE_FN,
        new NativeFunc(
            "ROUND",
            [{id: "@num", type: Primitive.DOUBLE}, {id: "@round", type: Primitive.INT}],
            (num, round) =>{
                let newNum: number = Number(num.value);
                let newRound: number = Number(round.value);
                const multiplier = Math.pow(10, newRound);
                num.value = Math.round(newNum * multiplier)/multiplier;
                num.type = Primitive.DOUBLE;
                return num;
            },
            0,0
        ), 0, 0, env
    ));

    // verify this
    env.setSymbol(new Symbol(
        "truncate",
        Functions.NATIVE_FN,
        new NativeFunc(
            "TRUNCATE",
            [{id: "@num", type: Primitive.DOUBLE}, {id: "@round", type: Primitive.INT}],
            (num, round) =>{
                let newNum: number = Number(num.value);
                let newRound: number = Number(round.value);
                const multiplier = Math.pow(10, newRound);
                num.value = Math.trunc(newNum * multiplier)/multiplier;
                num.type = Primitive.DOUBLE;
                return num;
            },
            0,0
        ), 0, 0, env
    ));

    env.setSymbol(new Symbol(
        "typeof",
        Functions.NATIVE_FN,
        new NativeFunc(
            "TYPEOF",
            [{id: "@val", type: Any.ANY}],
            (val) =>{
                let valType: Primitive = Primitive.NULL;
                if (Number.isInteger(val.value)){
                    valType = Primitive.INT;
                } else if (val.value instanceof Date){
                    valType = Primitive.DATE;
                } else if (val.value === null){
                    valType = Primitive.NULL;
                } else if (typeof val.value === 'boolean'){
                    valType = Primitive.BOOLEAN;
                } else if (typeof val.value === 'string'){
                    valType = Primitive.VARCHAR;
                } else {
                    valType = Primitive.DOUBLE;
                }
                return new ReturnType(Primitive.VARCHAR, valType);
            },
            0,0
        ), 0, 0, env
    ));
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
