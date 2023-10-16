export enum Numerics {
    INT = "int",
    DOUBLE = "double"
}

export enum Strings {
    VARCHAR = "varchar",
    DATE = "date"
}

export enum Booleans {
    BOOLEAN = "boolean",
    NULL = "null"
}

export type Primitive = Numerics | Strings | Booleans;

export enum ArithmeticOperator {
    PLUS = "+",
    MINUS = "-",
    MULT = "*",
    DIV = "/",
    MOD = "%"
}

export enum RelationalOperator {
    EQ = "=",
    NEQ = "!=",
    LESS = "<",
    GREATER = ">",
    LEQ = "<=",
    GEQ = ">="
}

export enum LogicalOperator {
    AND = "AND",
    OR = "OR",
    NOT = "NOT"
}

export enum Functions {
    FUNC = "func",
    METHOD = "method",
    NATIVE_FN = "native_fn"
}

export type ValueType = Primitive | Functions
