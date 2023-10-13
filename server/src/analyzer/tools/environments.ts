/*
 * the following code is adapted from the Github repository:
 * Repostitory: https://github.com/tlaceby/guide-to-interpreters-series
 * File: /ep11-user-defined-functions/runtime/environments.ts
 * Author: tlaceby
 * Description: create an environment for the interpreter
 */

import Symbol from "./symbol";
import { Exception } from "../errors";


export function creteGlobalEnv() {
}



export default class Environment {
    private name: string;
    private parent?: Environment;
    private table: Map<string, Symbol>;

    constructor(parent?: Environment, name: string = "Global") {
        const global = parent ? true : false;
        this.parent = parent;
        this.table = new Map();
        this.name = name;
    }

    public setSymbol(symbol: Symbol){
        if (this.table.has(symbol.id)){
            return new Exception("Semantic", `Variable name ${symbol.id} already defined on scope`, symbol.row, symbol.column, this.name);
        }

        symbol.environment = this.name;
        this.table.set(symbol.id, symbol);
    }

    public updateSymbol(symbol: Symbol){
        const env = this.resolveSymbol(symbol);

        if (env instanceof Exception){
            return env;
        }

        let envVar = env.table.get(symbol.id);

        if (envVar !== undefined){
            if (envVar === symbol.type) {
                envVar.value = symbol.value;
                return undefined;
            }

            return new Exception("Semantic", `The variable: ${symbol.id} isn't type: ${symbol.type}`, symbol.row, symbol.column, this.name);
        }
    }

    public getSymbol(symbol: Symbol){
        const env = this.resolveSymbol(symbol);
        if (env instanceof Exception){
            return env;
        }

        return env.table.get(symbol.id) as Symbol;
    }


    public resolveSymbol(symbol: Symbol): Environment | Exception {
        if (this.table.has(symbol.id)) {
            return this;
        }

        if (this.parent == undefined) {
            return new Exception("Semantic", `Cannot resolve '${symbol.id}' as it does not exist.`, symbol.row, symbol.column, this.name);
        }

        return this.parent.resolveSymbol(symbol);
    }


}
