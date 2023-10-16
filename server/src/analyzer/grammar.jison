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
%}

/*---------------------------lexical definitions---------------------------*/

%lex 
%options case-insensitive

%%

\s+                                         // spaces ignored
"--".*                                      // comment inline
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]         // MultiLineComment
[ \r\t]+
\n

/*---------------------------Reserved Words---------------------------*/
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
\"[^\"]*\"                              return "TK_VARCHAR";
\'[^\"]*\'                              return "TK_VARCHAR";
\'(([^\n\"\\]|\\.)*)\'                  return "TK_VARCHAR";
\"(([^\n\"\\]|\\.)*)\"                  return "TK_VARCHAR";

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
    const { CodeBlock } = require("./instructions/codeBlock");
    const { Primitive } = require("./tools/types");
    const { PrimitiveVar } = require("./expressions/primitive");
    const { CallVar } = require("./expressions/callVar");
%}



/*---------------------------Operators Precedence---------------------------*/
//%nonassoc 
%left "RW_OR"
%left "RW_AND"
%right "RW_NOT"
%left "TK_EQEQ" "TK_NOTEQ" "TK_LESS" "TK_LEQ" "TK_GREATER" "TK_GEQ" "TK_EQ"
%left "TK_PLUS" "TK_MINUS" "TK_MOD"
%left "TK_STAR" "TK_DIV"
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
    ddl                 { $$ = $1; }
|   dml                 { $$ = $1; }
/*-------------------------------STRUCTURES-------------------------------*/
|   if_struct           { $$ = $1; }
|   case_struct         { $$ = $1; }
|   while_struct        { $$ = $1; }
|   for_struct          { $$ = $1; }
/*-------------------------------CONTROL-------------------------------*/
|   RW_BREAK            { $$ = $1; }
|   RW_CONTINUE         { $$ = $1; }
/*-------------------------------FUNCTIONS&METHODS-------------------------------*/
|   declare_function    { $$ = $1; }
|   declare_method      { $$ = $1; }    
/*-------------------------------DECLARATION-------------------------------*/
|   declare_var         { $$ = $1; }
|   set_var             { $$ = $1; }
/*-------------------------------ENV-------------------------------*/
|   encapsulated        { $$ = $1; }
/*-------------------------------UTILITY-------------------------------*/
|   cast                { $$ = $1; }        
|   print               { $$ = $1; }
//|   error               { synErrors.push(new SynError(this._$.first_line, this._$.first_column, "Algo salio mal al chile no c")); $$ = null; }
;

/*-------------------------------SQL LANGUAGE GRAMMARS-------------------------------*/
ddl:
    RW_CREATE RW_TABLE TK_ID TK_LPAR typed_arguments TK_RPAR    {  }
|   RW_ALTER RW_TABLE TK_ID alter_actions                       {  }
|   RW_DROP RW_TABLE TK_ID                                      {  }
;

dml:
    RW_INSERT RW_INTO TK_ID TK_LPAR arguments TK_RPAR RW_VALUES TK_RPAR value_arguments TK_RPAR {  }
|   select_stmt                                                                                 { $$ = $1; }    
|   RW_UPDATE TK_ID RW_SET set_arguments RW_WHERE expression                                    {  }
|   RW_TRUNCATE RW_TABLE TK_ID                                                                  {  }
|   RW_DELETE RW_FROM TK_ID RW_WHERE expression                                                 {  }
;

alter_actions:
    RW_ADD TK_ID type                       {}
|   RW_DROP RW_COLUMN TK_ID                 {}
|   RW_RENAME RW_TO TK_ID                   {}
|   RW_RENAME RW_COLUMN TK_ID RW_TO TK_ID   {}
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

/*-------------------------------ARGUMENTS-------------------------------*/
select_arguments:
    TK_STAR         {}
|   value_arguments {}
;

// TODO make this save the specified value
set_arguments:
    set_arguments TK_COMA TK_ID TK_EQ TK_ID {}
|   TK_ID TK_EQ TK_ID                       {}
;

value_arguments:
    value_arguments TK_COMA expression  {}
|   expression                          {}
;

arguments:
    arguments TK_COMA TK_ID {}
|   TK_ID                   {}
;

// TODO make this save the specified value
typed_arguments:
    typed_arguments TK_COMA TK_ID type  { $1.push({id: $3, type: $4}); $$ = $1; }
|   TK_ID type                          { $$ = $1 == null ? [{}] : [{id: $1, type: $2}]; }
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
    RW_IF expression RW_THEN RW_BEGIN env RW_END           { $$ = new If($2, $5, undefined, @1.first_line, @1.first_column); }
|   RW_IF expression RW_THEN env RW_ELSE env RW_END RW_IF  { $$ = new If($2, $4, $6, @1.first_line, @1.first_column); }
;

case_struct:
    simple_case     {}
|   searched_case   {}
;

simple_case:
// TODO also change the last expression to a primitive
    RW_CASE expression simple_case_cases RW_ELSE primitive RW_END              {}
|   RW_CASE expression simple_case_cases RW_ELSE primitive RW_END RW_AS TK_ID  {}
;

simple_case_cases:
    simple_case_cases RW_WHEN primitive RW_THEN primitive   {}
|   RW_WHEN primitive RW_THEN primitive                     {}
;

searched_case:
    RW_CASE searched_case_cases RW_ELSE primitive RW_END                {}
|   RW_CASE searched_case_cases RW_ELSE primitive RW_END RW_AS TK_ID    {}
;

searched_case_cases:
    searched_case_cases RW_WHEN relational RW_THEN primitive {}
|   RW_WHEN relational RW_THEN primitive                     {}
;

while_struct:
    RW_WHILE expression RW_BEGIN env RW_END {}
;

for_struct:
    RW_FOR TK_ID RW_IN TK_INT TK_DOT TK_DOT TK_DOT TK_INT RW_BEGIN env RW_END   {}
;

encapsulated:
    RW_BEGIN env END    {}
;

/*-------------------------------FUNCTIONS&METHODS-------------------------------*/
declare_function:
    RW_CREATE RW_FUNCTION TK_ID TK_LPAR typed_arguments TK_RPAR RETURNS primitive RW_BEGIN env RW_END   {}
;

declare_method:
    RW_CREATE RW_PROCEDURE TK_ID typed_var_arguments RW_AS RW_BEGIN env RW_END  {}
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
    TK_LPAR select_stmt TK_RPAR { $$ = $2; }
|   relational                  { $$ = $1; }
|   logic                       { $$ = $1; }
|   primitive                   { $$ = $1; }
|   arithmetic                  { $$ = $1; }
|   call_func_mth               { $$ = $1; }
|   cast                        { $$ = $1; } 
|   TK_VAR                      { $$ = new CallVar($1, @1.first_line, @1.first_column); }
|   TK_RPAR expression TK_LPAR  { $$ = $1; }
;

relational:
    expression TK_EQ expression         {}
|   expression TK_GEQ expression        {}
|   expression TK_LEQ expression        {}
|   expression TK_GREATER expression    {}
|   expression TK_LESS expression       {}
|   expression TK_NOTEQ expression      {}
;

logic:
    expression RW_AND expression    {}
|   expression RW_OR expression     {}
|   RW_NOT expression               {}
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
    expression TK_PLUS expression       {}
|   expression TK_MINUS expression      {}
|   expression TK_DIV expression        {}
|   expression TK_STAR expression       {}
|   expression TK_MOD expression        {}
|   TK_MINUS expression %prec UMINUS    {}
;

    
call_func_mth:
    TK_ID TK_LPAR arguments TK_RPAR {}
;

/*-------------------------------FUNCTIONS-------------------------------*/
cast:
    RW_CAST TK_LPAR expression RW_AS type TK_RPAR   {}
;

print:
    RW_PRINT expression {}
;