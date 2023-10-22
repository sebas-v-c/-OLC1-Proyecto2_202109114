import { Node, Statement } from "../abastract/ast";
import Environment from "../tools/environments";
import ReturnType from "../tools/returnType";
import { Any, Functions, Primitive } from "../tools/types";
import Tree from "../tools/tree";
import { Exception } from "../errors";
import Symbol from "../tools/symbol";
import { Func, NativeFunc } from "../instructions/function";


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
        try {
            return this.getValue(tree, table)
        } catch(err){
            tree.errors.push(err as Exception); throw err;
        }
    }

    getValue(tree: Tree, table: Environment): ReturnType {
        let symbol: Symbol;
        try{
            symbol = table.getSymbol(new Symbol(this.id, Primitive.NULL, null, this.line, this.column, table));
        } catch(err){
            throw err;
        }

        const calledFunc: Func = symbol.value;

        if (this.argExpr !== undefined && calledFunc.args !== undefined){
            if (this.argExpr.length !== calledFunc.args.length) {
                let err = new Exception('Sementic', `${this.id} expected ${calledFunc.args.length} parameters, ${this.argExpr.length} given`, this.line, this.column, table.name);
                tree.errors.push(err);
                throw err;
            }
        } else if (this.argExpr === undefined && calledFunc.args === undefined){

        } else {
            if (this.argExpr !== undefined){
                let err = new Exception('Sementic', `${this.id} expected ${this.argExpr.length} parameters, ${0} given`, this.line, this.column, table.name);
                tree.errors.push(err);
                throw err;
            } else {
                let err = new Exception('Sementic', `${this.id} expected ${0} parameters, ${calledFunc.args.length} given`, this.line, this.column, table.name);
                tree.errors.push(err);
                throw err;
            }
        }

        const funcEnv: Environment = new Environment(table, `func_env_${this.id}`);
        tree.envs.push(funcEnv);

        // save variables and verify types
        if (calledFunc.args !== undefined){
            for (let i = 0; i < calledFunc.args.length; i++) {
                const toSaveSym = new Symbol(calledFunc.args[i].id.toLowerCase(), calledFunc.args[i].type, null, this.line, this.column, funcEnv);
                const receivedSym = this.argExpr[i].getValue(tree, funcEnv);
                if (toSaveSym.type !== receivedSym.type) {
                    // if tosave symbol is of value any, then accept the symbol
                    if (toSaveSym.type !== Any.ANY) {
                        let err = new Exception("Type Error", `Variable of type '${receivedSym.type}' is not assignable to type '${toSaveSym.type}'`, this.line, this.column, funcEnv.name);
                        tree.errors.push(err);
                        throw err;
                    }
                }
                toSaveSym.value = receivedSym.value;
                //symbol = receivedSym.type;
                funcEnv.setSymbol(toSaveSym);
            }
        }

        let ret: ReturnType | void;
        if (symbol.type === Functions.NATIVE_FN){
            // to get the value from the Native func function
            try{
                ret = calledFunc.getValue(tree, funcEnv);
            } catch(err){
                tree.errors.push(err as Exception); throw err;
            }
        } else {
            try {
                ret = calledFunc.block.interpret(tree, funcEnv);
            } catch (err) {
                tree.errors.push(err as Exception); throw err;
            }
        }

        // a native function always returns a value too
        if (symbol.type === Functions.FUNC){
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

        if (symbol.type === Functions.NATIVE_FN){
            if (ret instanceof ReturnType){
                return ret;
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
        let node = new Node("CALL FUNCTION");
        node.addChild(this.id);
        if (this.argExpr !== undefined){
            let argsNode = new Node("ARGUMENTS");
            for (let arg of this.argExpr) {
                argsNode.addChildsNode(arg.getAST());
            }
            node.addChildsNode(argsNode);
        }
        return node;
    }


}
