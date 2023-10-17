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
    MOD = "%",
    UMINUS = "- ",
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

export enum TransferOp {
    RETURN = "return",
    BREAK = "break",
    CONTINUE = "continue"
}

export enum Functions {
    FUNC = "func",
    METHOD = "method",
    NATIVE_FN = "native_fn"
}

export type ValueType = Primitive | Functions | TransferOp;
