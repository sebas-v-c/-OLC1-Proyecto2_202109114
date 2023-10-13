export enum Primitive {
    INT = "int",
    VARCHAR = "varchar",
    DATE = "date",
    BOOLEAN = "boolean",
    DOUBLE = "double",
    NULL = "null"
}

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

export enum Functions {
    FUNC = "func",
    METHOD = "method",
    NATIVE_FN = "native_fn"
}

export type ValueType = Primitive | Functions
