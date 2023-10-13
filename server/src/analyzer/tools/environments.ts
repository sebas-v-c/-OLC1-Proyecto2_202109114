/*
 * the following code is adapted from the Github repository:
 * Repostitory: https://github.com/tlaceby/guide-to-interpreters-series
 * File: /ep11-user-defined-functions/runtime/environments.ts
 * Author: tlaceby
 * Description: create an environment for the interpreter
 */


export function creteGlobalEnv() {
    const env = new Environ
}



export default class Environment {
    private parent?: Environment;
    private variables: Map<string, Symbol>;

    constructor(parent?: Environment) {
        const global = parent ? true : false;
        this.parent = parent;
        this.variables = new Map();
    }
}
