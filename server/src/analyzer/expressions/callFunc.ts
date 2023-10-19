import { Node, Statement } from "../abastract/ast";
import Environment from "../tools/environments";
import ReturnType from "../tools/returnType";
import { Functions, Primitive } from "../tools/types";
import Tree from "../tools/tree";
import { Exception } from "../errors";
import Symbol from "../tools/symbol";
import { Func } from "../instructions/function";


export class CallFunc implements Statement {
    public id: string;
    public argExpr: Array<Statement>
    public line: number;
    public column: number;

    constructor(id: string, argExpr: Array<Statement>,  line: number, column: number,){
        this.id = id;
        this.argExpr = argExpr;
        this.line = line;
        this.column = column;
    }

    interpret(tree: Tree, table: Environment) {
        const ret: ReturnType =  this.getValue(tree, table)
        if (ret.value instanceof Exception){
            return ret.value;
        }
        return undefined;
    }

    getValue(tree: Tree, table: Environment): ReturnType {
        let symbol: Symbol;
        try{
            symbol = table.getSymbol(new Symbol(this.id, Primitive.NULL, null, this.line, this.column, table));
        } catch(err){
            throw err;
        }

        const calledFunc: Func = symbol.value;

        if (this.argExpr.length !== calledFunc.args.length){
            let err = new Exception('Sementic', `${this.id} expected ${calledFunc.args.length} parameters, ${this.argExpr.length} given`, this.line, this.column, table.name);
            tree.errors.push(err);
            throw  err;
        }

        const funcEnv: Environment = new Environment(table, "func_env");

        // save variables and verify types
        for (let i = 0; i < calledFunc.args.length; i++){
            const toSaveSym = new Symbol(calledFunc.args[i].id.toLowerCase(), calledFunc.args[i].type, null, this.line, this.column, funcEnv);
            const receivedSym = this.argExpr[i].getValue(tree, funcEnv);
            if (toSaveSym.type !== receivedSym.type){
                let err =new Exception("Type Error", `Variable of type '${receivedSym.type}' is not assignable to type '${toSaveSym.type}'`, this.line, this.column, funcEnv.name);
                tree.errors.push(err);
                throw err;
            }
            toSaveSym.value = receivedSym.value;
            funcEnv.setSymbol(toSaveSym);
        }

        let ret: ReturnType | void;
        try {
            ret = calledFunc.block.interpret(tree, funcEnv);
        } catch(err){
            tree.errors.push(err as Exception); throw err;
        }
        // a native function always returns a value too
        if (symbol.type === Functions.FUNC || symbol.type === Functions.NATIVE_FN){
            if (ret instanceof ReturnType){
                if (ret.type === calledFunc.retType){
                    return ret;
                } else {
                    let err = new Exception("Type Error", `Variable of type '${ret.type}' can't return a '${calledFunc.retType}'`, this.line, this.column, funcEnv.name);
                    tree.errors.push(err);
                    throw err;
                }
            }
            if (ret === undefined){
                // here i return a type error because the function return indefined
                    let err = new Exception("Type Error", `Variable of type 'undefined' can't return a '${calledFunc.retType}'`, this.line, this.column, funcEnv.name);
                    tree.errors.push(err);
                    throw err;
            }
        }

        if (symbol.type === Functions.METHOD){
            if (ret instanceof Exception){
                return new ReturnType(Primitive.NULL, ret);
            }
            if (ret instanceof ReturnType){
                if (ret.value !== null){
                    let err = new Exception("Semantic", `A METHOD can't return a value`, this.line, this.column, funcEnv.name);
                    tree.errors.push(err);
                    throw err;
                }
            }
        }
        // default to return this
        return new ReturnType(Primitive.NULL, null);
    }

    getCST(): Node {
        return new Node("Node");
    }

    getAST(): Node {
        return new Node('Node');
    }


}
