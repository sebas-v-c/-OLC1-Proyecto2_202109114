%{
    // files to import should be the js files
    /*
    import { LexError, SynError } from "./errors.js" 
    */
    // use this import while testing
    const { LexError, SynError } = require("./errors");
%}

%{
    let ast = [];
    let errors = [];
    let lexErrors = [];
    let synErrors = [];
    const clean_errors = () => {
        errors = [];
    }
    let controlString = "";
%}

/*---------------------------lexical definitions---------------------------*/

%lex 
%options case-insensitive
%x string

%%

\s+                                         // spaces ignored
"--".*                                      // comment inline
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]         // MultiLineComment
[ \r\t]+
\n

/*---------------------------Reserved Words---------------------------*/

""                              return;
"CREATE"                        return "RW_CREATE";
"ALTER"                         return "RW_ALTER";
"DROP"                          return "RW_DROP";
"RENAME"                        return "RW_RENAME";

"INSERT"                        return "RW_INSERT";
"UPDATE"                        return "RW_UPDATE";
"TRUNCATE"                      return "RW_TRUNCATE";
"DELETE"                        return "RW_DELETE";
"SELECT"                        return "RW_SELECT";
"FROM"                          return "RW_FROM";
"WHERE"                         return "RW_WHERE";

"INTO"                          return "RW_INTO";
"VALUES"                        return "RW_VALUES";
"ADD"                           return "RW_ADD";
"COLUMN"                        return "RW_COLUMN";
"RENAME"                        return "RW_RENAME";
"TO"                            return "RW_TO";
"TABLE"                         return "RW_TABLE";

"INT"                           return "RW_INT";
"DOUBLE"                        return "RW_DOUBLE";
"DATE"                          return "RW_DATE";
"VARCHAR"                       return "RW_VARCHAR";
"BOOLEAN"                       return "RW_BOOLEAN";
"TRUE"                          return "RW_TRUE";
"FALSE"                         return "RW_FALSE";
"NULL"                          return "RW_NULL";

"NOT"                           return "RW_NOT"; 
"AND"                           return "RW_AND";
"OR"                            return "RW_OR";

"BEGIN"                         return "RW_BEGIN";
"END"                           return "RW_END";
"DECLARE"                       return "RW_DECLARE";
"DEFAULT"                       return "RW_DEFAULT";
"SET"                           return "RW_SET";
"AS"                            return "RW_AS";
"CAST"                          return "RW_CAST";
"PRINT"                         return "RW_PRINT";

"IF"                            return "RW_IF";
"THEN"                          return "RW_THEN";
"ELSE"                          return "RW_ELSE";
"CASE"                          return "RW_CASE";
"WHEN"                          return "RW_WHEN";
"WHILE"                         return "RW_WHILE";
"FOR"                           return "RW_FOR";
"IN"                            return "RW_IN";
"LOOP"                          return "RW_LOOP";
"BREAK"                         return "RW_BREAK";
"CONTINUE"                      return "RW_CONTINUE";

"FUNCTION"                      return "RW_FUNCTION";
"PROCEDURE"                     return "RW_PROCEDURE";
"RETURNS"                       return "RW_RETURNS";
"RETURN"                        return "RW_RETURN";

/*---------------------------Tokens---------------------------*/
(\d{4})("-")(\d{1,2})("-")(\d{1,2})     return "TK_DATE";
"@"(\_)*[a-zA-ZñÑ][a-zA-Z0-9ñÑ\_]*      return "TK_VAR";
[0-9]+("."[0-9]+)\b                     return "TK_DOUBLE";
[0-9]+\b                                return "TK_INT";
(\_)*[a-zA-ZñÑ][a-zA-Z0-9ñÑ\_]*         return "TK_ID";
//                              if this doesnt work use this.begin() instead
["]                             {controlString=""; this.pushState("string");}
<string>[^"\\]+                 {controlString+=yytext; }
<string>"\\\""                  {controlString+="\"";}
<string>"\\n"                   {controlString+="\n";}
<string>"\\t"                   {controlString+="\t";}
<string>"\\\\"                  {controlString+="\\";}
<string>"\\\'"                  {controlString+="\'";}
<string>["]                     {yytext=controlString; this.popState(); return 'TK_VARCHAR';}

"("                             return "TK_LPAR";
")"                             return "TK_RPAR";
";"                             return "TK_SCOLON";
"."                             return "TK_DOT";
","                             return "TK_COMA";

"+"                             return "TK_PLUS";
"-"                             return "TK_MINUS";
"*"                             return "TK_STAR";
"/"                             return "TK_DIV";
"%"                             return "TK_MOD";
">="                            return "TK_GEQ";
"<="                            return "TK_LEQ";
"=="                            return "TK_EQEQ";
"!="                            return "TK_NOTEQ";
">"                             return "TK_GREATER";
"<"                             return "TK_LESS";
"="                             return "TK_EQ";

<<EOF>>                           return 'EOF';
.                               { lexErrors.push(new LexError(yylloc.first_line, yylloc.first_column, yytext)); return "INVALID"; }

/lex

// IMPORTS FOR THE PARSER
%{

    // files to import should be the js files
    /*
    import { LexError, SynError } from "./errors.js" 
    */
    // use this import while testing
    const { Declaration } = require("./instructions/declaration");
    const { SetVar } = require("./instructions/setVar");
    const { If } = require("./instructions/if");
    const { SimpleCase, SearchedCase } = require("./instructions/case");
    const { Function, Method } = require("./instructions/function");
    const { For } = require("./instructions/for");
    const { Continue } = require("./instructions/continue");
    const { Break } = require("./instructions/break");
    const { Return } = require("./instructions/return");
    const { While } = require("./instructions/while");
    const { Print } = require("./instructions/print");
    const { CodeBlock } = require("./instructions/codeBlock");

    const { Create } = require("./instructions/ddl/create");
    const { Alter, AlterActions } = require("./instructions/ddl/alter");
    const { Drop } = require("./instructions/ddl/drop");

    const { Insert } = require("./instructions/dml/insert");
    const { Truncate } = require("./instructions/dml/truncate");
    const { Update } = require("./instructions/dml/update");
    const { WherePredicate } = require("./instructions/dml/wherePredicate");
    const { Delete } = require("./instructions/dml/delete");

    const { Primitive, RelationalOperator, ArithmeticOperator, LogicalOperator } = require("./tools/types");
    const { PrimitiveVar } = require("./expressions/primitive");
    const { IdVar } = require("./expressions/id");
    const { Logical } = require("./expressions/logical");
    const { Relational } = require("./expressions/relational");
    const { Arithmetic } = require("./expressions/arithmetic");
    const { CallVar } = require("./expressions/callVar");
    const { CallFunc } = require("./expressions/callFunc");
%}



/*---------------------------Operators Precedence---------------------------*/
//%nonassoc 
%left "RW_OR"
%left "RW_AND"
%right "RW_NOT"
%left "TK_EQ" "TK_NOTEQ"
%left "TK_LESS" "TK_LEQ" "TK_GREATER" "TK_GEQ"
%left "TK_PLUS" "TK_MINUS"
%left "TK_STAR" "TK_DIV" "TK_MOD"
%right "UMINUS"

/*to regonize this token we should call it with %prec UMINUS after delcaring a production



/*---------------------------Grammar Definition---------------------------*/
%start ini

// TODO add error handling
%%

ini: 
    instructions EOF    { return $1; }
|   EOF                 { return null }
;

instructions:
    instructions instruction TK_SCOLON  { $1.push($2); $$ = $1; }
|   instruction TK_SCOLON               { $$ = [$1]; }
;

instruction:
/*-------------------------------SQL LANGUAGE GRAMMARS-------------------------------*/
    ddl                     { $$ = $1; }
|   dml                     { $$ = $1; }
/*-------------------------------STRUCTURES-------------------------------*/
|   if_struct               { $$ = $1; }
|   case_struct             { $$ = $1; }
|   while_struct            { $$ = $1; }
|   for_struct              { $$ = $1; }
/*-------------------------------CONTROL-------------------------------*/
|   RW_BREAK                { $$ = new Break(@1.first_line, @1.first_column); }
|   RW_CONTINUE             { $$ = new Continue(@1.first_line, @1.first_column); }
|   RW_RETURN expression    { $$ = new Return($2, @1.first_line, @1.first_column); }
|   RW_RETURN               { $$ = new Return(undefined, @1.first_line, @1.first_column); }
/*-------------------------------FUNCTIONS&METHODS-------------------------------*/
|   call_func_mth           { $$ = $1; }    
|   declare_function        { $$ = $1; }
|   declare_method          { $$ = $1; }    
/*-------------------------------DECLARATION-------------------------------*/
|   declare_var             { $$ = $1; }
|   set_var                 { $$ = $1; }
/*-------------------------------ENV-------------------------------*/
|   encapsulated            { $$ = $1; }
/*-------------------------------UTILITY-------------------------------*/
|   cast                    { $$ = $1; }        
|   print                   { $$ = $1; }
//|   error               { synErrors.push(new SynError(this._$.first_line, this._$.first_column, "Algo salio mal al chile no c")); $$ = null; }
;

/*-------------------------------SQL LANGUAGE GRAMMARS-------------------------------*/
ddl:
    RW_CREATE RW_TABLE TK_ID TK_LPAR typed_arguments TK_RPAR    { $$ = new Create($3, $5, @1.first_line, @1.first_column); }
|   RW_ALTER RW_TABLE TK_ID alter_actions                       { $$ = new Alter($3, $4, @1.first_line, @1.first_column); }
|   RW_DROP RW_TABLE TK_ID                                      { $$ = new Drop($3, @1.first_line, @1.first_column); }
;

dml:
    RW_INSERT RW_INTO TK_ID TK_LPAR arguments TK_RPAR RW_VALUES TK_LPAR value_arguments TK_RPAR { $$ = new Insert($3, $5, $9, @1.first_line, @1.first_column); }
|   select_stmt                                                                                 { $$ = $1; }    
|   RW_UPDATE TK_ID RW_SET set_arguments RW_WHERE where_cond                                    { $$ = new Update($2, $4, $6 ,@1.first_line, @1.first_column); }
|   RW_TRUNCATE RW_TABLE TK_ID                                                                  { $$ = new Truncate($3, @1.first_line, @1.first_column); }
|   RW_DELETE RW_FROM TK_ID RW_WHERE where_cond                                                 { $$ = new Delete($3, $5, @1.first_line, @1.first_column); }
;

alter_actions:
    RW_ADD TK_ID type                       { $$ = {type: AlterActions.ADD, col: $2, colType: $3}; }
|   RW_DROP RW_COLUMN TK_ID                 { $$ = {type: AlterActions.DROP, col: $3}; }
|   RW_RENAME RW_TO TK_ID                   { $$ = {type: AlterActions.RENAMETABLE, newId: $3}; }
|   RW_RENAME RW_COLUMN TK_ID RW_TO TK_ID   { $$ = {type: AlterActions.RENAMECOL, col: $3, newId: $5}; }
;

select_stmt:
    RW_SELECT select_arguments FROM TK_ID                       {}
|   RW_SELECT select_arguments FROM TK_ID RW_WHERE expression   {}
// TODO I DONT KNOW IF THIS IS CORRECT
//|   RW_SELECT TK_VAR                                            {}
|   RW_SELECT expression AS TK_ID                               {}
|   RW_SELECT expression                                        {}
// TODO I DONT KNOW IF THIS IS CORRECT
//|   RW_SELECT TK_VAR AS TK_ID                                   {}
;

// I created this class because I'm lazy (I don't want write "new WherePred" every single time)
where_cond:
    expression  { $$ = new WherePredicate($1, @1.first_line, @1.first_column); }
;

/*
log_operator:
    RW_AND  { $$ = LogicalOperator.AND; }
|   RW_OR   { $$ = LogicalOperator.OR; }
|   RW_NOT  { $$ = LogicalOperator.NOT; }
;
*/

/*-------------------------------ARGUMENTS-------------------------------*/
select_arguments:
    TK_STAR         {}
|   value_arguments {}
;

// TODO make this save the specified value
set_arguments:
    set_arguments TK_COMA TK_ID TK_EQ expression { $1.push({col: $3, val: $5}); $$ = $1; }
|   TK_ID TK_EQ expression                       { $$ = [{col: $1, val: $3}]; }
;

value_arguments:
    value_arguments TK_COMA expression  { $1.push($3); $$ = $1; }
|   expression                          { $$ = [$1]; }
;

arguments:
    arguments TK_COMA TK_ID { $1.push($3); $$ = $1; }
|   TK_ID                   { $$ = [$1]; }
;

// TODO make this save the specified value
typed_arguments:
    typed_arguments TK_COMA TK_ID type  { $1.push({id: $3, type: $4}); $$ = $1; }
|   TK_ID type                          { $$ = [{id: $1, type: $2}]; }
;

// TODO make this save the specified value
typed_var_arguments:
    typed_var_arguments TK_COMA TK_VAR type { $1.push({id: $3, type: $4}); $$ = $1; }
|   TK_VAR type                             { $$ = [{id: $1, type: $2}];}
;

/*-------------------------------TYPE-------------------------------*/
type:
    RW_INT      { $$ = Primitive.INT; }
|   RW_VARCHAR  { $$ = Primitive.VARCHAR; }
|   RW_DOUBLE   { $$ = Primitive.DOUBLE; }
|   RW_DATE     { $$ = Primitive.DATE; }
|   RW_BOOLEAN  { $$ = Primitive.BOOLEAN; }
|   RW_NULL     { $$ = Primitive.NULL; }
;

/*-------------------------------STRUCTURES-------------------------------*/
// TODO wait for an official test file
if_struct:
    RW_IF expression RW_THEN env RW_ELSE env RW_END RW_IF  { $4.envName = "if_env";$6.envName = "else_env";$$ = new If($2, $4, $6, @1.first_line, @1.first_column, "if_env"); }
|   RW_IF expression RW_THEN RW_BEGIN env RW_END           { $5.envName = "if_env";$$ = new If($2, $5, undefined, @1.first_line, @1.first_column, "if_env"); }
;

case_struct:
    searched_case   { $$ = $1; }
|   simple_case     { $$ = $1; }
;

simple_case:
// TODO also change the last expression to a primitive
    RW_CASE expression simple_case_cases RW_ELSE primitive RW_END              { $$ = new SimpleCase($2, $3, $5, undefined,@1.first_line, @1.first_column); }
|   RW_CASE expression simple_case_cases RW_ELSE primitive RW_END RW_AS TK_VAR { $$ = new SimpleCase($2, $3, $5, $8 ,@1.first_line, @1.first_column); }
;

simple_case_cases:
    simple_case_cases RW_WHEN primitive RW_THEN primitive   { $1.push({when: $3, then: $5}); $$ = $1; }
|   RW_WHEN primitive RW_THEN primitive                     { $$ = [{when: $2, then: $4}];}
;

searched_case:
    RW_CASE searched_case_cases RW_ELSE primitive RW_END                { $$ = new SearchedCase($2, $4, undefined, @1.first_line, @1.first_column); }
|   RW_CASE searched_case_cases RW_ELSE primitive RW_END RW_AS TK_VAR   { $$ = new SearchedCase($2, $4, $7, @1.first_line, @1.first_column); }
;

searched_case_cases:
    searched_case_cases RW_WHEN expression RW_THEN primitive    { $1.push({when: $3, then: $5}); $$ = $1; }
|   RW_WHEN expression RW_THEN primitive                        { $$ = [{when: $2, then: $4}]; }
;

while_struct:
    RW_WHILE expression RW_BEGIN env RW_END { $$ = new While($2, $4, @1.first_line, @1.first_column); }
;

for_struct:
    RW_FOR TK_VAR RW_IN TK_INT TK_DOT TK_DOT TK_INT RW_BEGIN env RW_END RW_LOOP { $9.envName = "for_env";$$ = new For($2, $9, $4, $7, @1.first_line, @1.first_column); }
;

encapsulated:
    RW_BEGIN env END    { $$ = $2; }
;

/*-------------------------------FUNCTIONS&METHODS-------------------------------*/
declare_function:
    RW_CREATE RW_FUNCTION TK_ID TK_LPAR typed_var_arguments TK_RPAR RW_RETURNS type RW_BEGIN env RW_END { $$ = new Function($3, $5, $8, $10, @1.first_line, @1.first_column); }
;

declare_method:
    RW_CREATE RW_PROCEDURE TK_ID typed_var_arguments RW_AS RW_BEGIN env RW_END  { $$ = new Method($3, $4, $7, @1.first_line, @1.first_column); }
;

/*-------------------------------DECLARATION-------------------------------*/
// TODO chage this when official test file is released
declare_var:
    RW_DECLARE typed_var_arguments                  { $$ = new Declaration($2, undefined, @1.first_line, @1.first_column); }
|   RW_DECLARE TK_VAR type RW_DEFAULT expression    { $$ = new Declaration([{id: $2, type: $3}], $5, @1.first_line, @1.first_column); }
;

set_var:
    RW_SET TK_VAR TK_EQ expression  { $$ = new SetVar($2, $4, @1.first_line, @1.first_column); }
;

/*-------------------------------ENVIRONMENTS-------------------------------*/

env:
    instructions    { $$ = new CodeBlock($1, @1.first_line, @1.first_column); }
// THIS IS EMPTY I GUES
|                   { $$ = undefined; }
;

/*-------------------------------EXPRESSIONS-------------------------------*/
expression:
    logic                       { $$ = $1; }
|   relational                  { $$ = $1; }
|   primitive                   { $$ = $1; }
|   arithmetic                  { $$ = $1; }
|   call_func_mth               { $$ = $1; }
|   cast                        { $$ = $1; } 
|   TK_VAR                      { $$ = new CallVar($1, @1.first_line, @1.first_column); }
|   TK_ID                       { $$ = new IdVar($1, @1.first_line, @1.first_column); } // This will return a simple string that represents an id (interpreted as a column)
|   TK_LPAR expression TK_RPAR  { $$ = $2; }
|   TK_LPAR select_stmt TK_RPAR { $$ = $2; }
;

relational:
    expression TK_EQ expression         { $$ = new Relational($1, RelationalOperator.EQ, $3, @1.first_line, @1.first_column); }
|   expression TK_GEQ expression        { $$ = new Relational($1, RelationalOperator.GEQ, $3, @1.first_line, @1.first_column); }
|   expression TK_LEQ expression        { $$ = new Relational($1, RelationalOperator.LEQ, $3, @1.first_line, @1.first_column); }
|   expression TK_GREATER expression    { $$ = new Relational($1, RelationalOperator.GREATER, $3, @1.first_line, @1.first_column); }
|   expression TK_LESS expression       { $$ = new Relational($1, RelationalOperator.LESS, $3, @1.first_line, @1.first_column); }
|   expression TK_NOTEQ expression      { $$ = new Relational($1, RelationalOperator.NEQ, $3, @1.first_line, @1.first_column); }
;

logic:
    expression RW_AND expression    { $$ = new Logical($1, LogicalOperator.AND, $3, @1.first_line, @1.first_column); }
|   expression RW_OR expression     { $$ = new Logical($1, LogicalOperator.OR, $3, @1.first_line, @1.first_column); }
|   RW_NOT expression               { $$ = new Logical(undefined, LogicalOperator.NOT, $2, @1.first_line, @1.first_column); }
;

primitive:
    TK_INT      { $$ = new PrimitiveVar($1, Primitive.INT , @1.first_line, @1.first_column); }
|   TK_DOUBLE   { $$ = new PrimitiveVar($1, Primitive.DOUBLE , @1.first_line, @1.first_column); }
|   TK_DATE     { $$ = new PrimitiveVar($1, Primitive.DATE , @1.first_line, @1.first_column); }
|   TK_VARCHAR  { $$ = new PrimitiveVar($1, Primitive.VARCHAR, @1.first_line, @1.first_column); }
|   RW_TRUE     { $$ = new PrimitiveVar($1, Primitive.BOOLEAN , @1.first_line, @1.first_column); }
|   RW_FALSE    { $$ = new PrimitiveVar($1, Primitive.BOOLEAN, @1.first_line, @1.first_column); }
|   RW_NULL     { $$ = new PrimitiveVar(null, Primitive.NULL, @1.first_line, @1.first_column); }
;

arithmetic:
    expression TK_PLUS expression       { $$ = new Arithmetic($1, ArithmeticOperator.PLUS, $3, @1.first_line, @1.first_column); }
|   expression TK_MINUS expression      { $$ = new Arithmetic($1, ArithmeticOperator.MINUS, $3, @1.first_line, @1.first_column); }
|   expression TK_DIV expression        { $$ = new Arithmetic($1, ArithmeticOperator.DIV, $3, @1.first_line, @1.first_column); }
|   expression TK_STAR expression       { $$ = new Arithmetic($1, ArithmeticOperator.MULT, $3, @1.first_line, @1.first_column); }
|   expression TK_MOD expression        { $$ = new Arithmetic($1, ArithmeticOperator.MOD, $3, @1.first_line, @1.first_column); }
|   TK_MINUS expression %prec UMINUS    { $$ = new Arithmetic(undefined, ArithmeticOperator.UMINUS, $2, @1.first_line, @1.first_column); }
;

    
call_func_mth:
    TK_ID TK_LPAR value_arguments TK_RPAR { $$ = new CallFunc($1, $3, @1.first_line, @1.first_column); }
;

/*-------------------------------FUNCTIONS-------------------------------*/
cast:
    RW_CAST TK_LPAR expression RW_AS type TK_RPAR   {}
;

print:
    RW_PRINT expression { $$ = new Print($2, @1.first_line, @1.first_column); }
;