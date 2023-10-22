/*
 * the following code is adapted from the Github repository:
 * Repostitory: https://github.com/ElianEstrada/OLC1_Lecture_AST
 * File: /server/src/Analyxer/tools/Tree.ts
 * Author: ElianEstrada
 * Description: a tree class to obtain the AST diagram from the grammar
 */

import { Exception } from "../errors";
import Environment from "./environments";
import { Node, Statement } from "../abastract/ast";
import ReturnType from "./returnType";
import Symbol from "./symbol";


export default class Tree {
    public instructions: Array<Statement>;
    public errors: Array<Exception>
    public console: string;
    public stdOut: string;
    public globalTable: Environment;
    public dot: string;
    private count: number;

    constructor(instructions: Array<Statement>, globalTable: Environment){
        this.instructions = instructions;
        this.globalTable = globalTable;
        this.console = "";
        this.errors = [];
        this.dot = '';
        this.count = 0;
        this.stdOut = "";
    }

    public updateStdout(input: string){
        this.stdOut += `<div>${input}</div>`;
    }

    public updateConsole(input: string){
        this.console += `<div>${input}</div>`;
    }

    public getDot(root: Node, flag: boolean = true){
        this.dot = "";
        this.dot += `digraph {\nranksep="${flag ? 2 : 1}";\nbgcolor = "#282a36";\nedge[color="#cba6f7"];\nnode [style="filled" fillcolor = "#cba6f7" fontcolor = "#1e1e2e" color = "#cba6f7"];\n`;
        this.dot += `n0[label="${root.value.replace("\"", "\\\"")}"];\n`;
        this.count = 1;
        this.travelCst("n0", root);
        this.dot += "}";
        return this.dot;
    }

    public travelCst(idRoot: any, nodeRoot: Node){
        for (let item of nodeRoot.childs){
            let name_child = `n${this.count}`;
            this.dot += `${name_child} [label = "${item.value.replace("\"", "\\\"")}"];\n`;
            this.dot += `${idRoot} -> ${name_child};\n`;
            this.count++;
            this.travelCst(name_child, item);
        }
    }

    public getSymbols() {
        const arr: [string, Symbol][] = Array.from(this.globalTable.table);
        /*
        let object: {} = {};

        object = arr.forEach(([key, val]: any) =>{
            object[key] = val;
        })

        */
        return arr;
    }
}
