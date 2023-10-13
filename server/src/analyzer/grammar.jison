%{
    // files to import should be the js files
    import { LexErrors, SynErrors } from "./errors.js" 
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
%x string

%%

\s+                                         // spaces ignored
"--".*                                      // comment inline
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]         // MultiLineComment



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


[ \r\t]+                        {}
\n                              {}

//                              if this doesnt work use this.begin() instead
["]                             { str = ''; this.pushState("string"); }
<string>[^"\\]+                 { str += yytext; }
<string>"\\n"                   { str += "\n"; }
<string>"\\\\"                  { str += "\\"; }
<string>"\\\""                  { str += "\""; }
<string>"\\t"                   { str += "\t"; }
<string>"\\\'"                  { str += "\'"; }
<string>\s                      { str += " "; }
<string>"\\r"                   { str += "\r"; }
<string>["]                     { yytext = str; this.popState(); return 'TK_VARCHAR'}

[0-9]+\b                                return "TK_INT";
[0-9]+\.[0-9]+                          return "TK_DOUBLE";
^\d{4}-(0[1-9]|1[0-2])-([0-2]\d|3[01])$ return "TK_DATE";
(\_)*[a-zA-ZñÑ][a-zA-Z0-9ñÑ\_]*         return "TK_ID";
@(\_)*[a-zA-ZñÑ][a-zA-Z0-9ñÑ\_]*        return "TK_VAR";


<<EOF>>                           return 'EOF'
//                              Here is better to create an error class
.                               { lexErrors.push(new LexErrors(yylloc.first_line, yylloc.first_column, yytext)); return "INVALID"; }

/lex

// IMPORTS FROM THE PARSER
%{

%}



/*---------------------------Operators Precedence---------------------------*/
//%nonassoc 
%left "RW_OR"
%left "RW_AND"
%right "RW_NOT"
%left "TK_EQEQ" "TK_NOTEQ" "TK_LESS" "TK_LEQ" "TK_GREATER" "TK_GEQ" "TK_EQ"
%left "TK_PLUS" "TK_MINUS"
%left "TK_STAR" "TK_DIV"
%right 'UMINUS'

/*to regonize this token we should call it with %prec UMINUS after delcaring a production



/*---------------------------Grammar Definition---------------------------*/
%start ini

// TODO add error handling
%%

ini: 
    instructions EOF    { ast = { instructions: $1, synErrors: synErrors, lexErrors: lexErrors }; errors = []; return ast; }
;

// $$ sign is the root 
instructions:
    instructions instruction TK_SCOLON  { $1.push($2); $$ = $1; }
|   instruction TK_SCOLON               { $$ = $1 == null ? [] : [$1]; }
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
|   RW_BREAK            {}
|   RW_CONTINUE         {}
/*-------------------------------FUNCTIONS&METHODS-------------------------------*/
|   declare_function    {}
|   declare_method      {}    
/*-------------------------------DECLARATION-------------------------------*/
|   declare_var         { $$ = $1; }
|   set_var             { $$ = $1; }
/*-------------------------------ENV-------------------------------*/
|   encapsulated        {}
/*-------------------------------UTILITY-------------------------------*/
|   cast                { $$ = $1; }        
|   print               { $$ = $1; }
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
|   RW_SELECT expression                                        {}
// TODO I DONT KNOW IF THIS IS CORRECT
//|   RW_SELECT TK_VAR AS TK_ID                                   {}
|   RW_SELECT expression AS TK_ID                               {}
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
    typed_arguments TK_COMA TK_ID type  { $1.push($2); $$ = $1; }
|   TK_ID type                          { $$ = $1 == null ? [] : [$1]; }
;

// TODO make this save the specified value
typed_var_arguments:
    typed_var_arguments TK_COMA TK_VAR type {}
|   TK_VAR type                             {}
;

/*-------------------------------TYPE-------------------------------*/
type:
    RW_INT      {}
|   RW_VARCHAR  {}
|   RW_DOUBLE   {}
|   RW_DATE     {}
|   RW_BOOLEAN  {}
|   RW_NULL     {}
;

/*-------------------------------STRUCTURES-------------------------------*/
// TODO wait for an official test file
if_struct:
    RW_IF expression RW_THEN env RW_ELSE env2 RW_END RW_IF  {}
|   RW_IF expression RW_THEN RW_BEGIN env RW_END            {}
;

case_struct:
    simple_case     {}
|   searched_case   {}
;

simple_case:
// TODO also change the last expression to a primitive
    RW_CASE expression simple_case_cases RW_ELSE primitive RW_END              {}
    RW_CASE expression simple_case_cases RW_ELSE primitive RW_END RW_AS TK_ID  {}
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
    searched_case_cases RW_WHEN relation RW_THEN primitive {}
|   RW_WHEN relation RW_THEN primitive                     {}
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
delcare_function:
    RW_CREATE RW_FUNCTION TK_ID TK_LPAR typed_arguments TK_RPAR RETURNS primitive RW_BEGIN env RW_END   {}
;

declare_method:
    RW_CREATE RW_PROCEDURE TK_ID typed_var_arguments RW_AS RW_BEGIN env RW_END  {}
;

/*-------------------------------DECLARATION-------------------------------*/
// TODO chage this when official test file is released
declare_var:
    RW_DECLARE typed_var_arguments                  {}
|   RW_DECLARE TK_VAR type RW_DEFAULT expression    {}
;

set_var:
    RW_SET TK_VAR TK_EQ expression  {}
;

/*-------------------------------ENVIRONMENTS-------------------------------*/

env:
    instructions    {}
// THIS IS EMPTY I GUES
|                   {}
;

/*-------------------------------EXPRESSIONS-------------------------------*/
expression:
    TK_LPAR select_stmt TK_RPAR { $$ = $1; }
|   relation                    { $$ = $1; }
|   logic                       { $$ = $1; }
|   arithmetic                  { $$ = $1; }
|   primitive                   { $$ = $1; }
|   call_func_mth               { $$ = $1; }
|   cast                        { $$ = $1; } 
|   TK_VAR                      { $$ = $1; }
|   TK_RPAR expression TK_LPAR  { $$ = $1; }
;

relation:
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

arithmetic:
    expression TK_PLUS expression       {}
|   expression TK_MINUS expression      {}
|   expression TK_DIV expression        {}
|   expression TK_STAR expression       {}
|   expression TK_MOD expression        {}
|   TK_MINUS expression %prec UMINUS    {}
;

primitive:
    TK_VARCHAR  {}
|   TK_INT      {}
|   TK_DOUBLE   {}
|   TK_DATE     {}
|   RW_TRUE     {}
|   RW_FALSE    {}
|   RW_NULL     {}
;
    
call_func_mth:
    TK_ID TK_LPAR arguments TK_RPAR {}
|
;

/*-------------------------------FUNCTIONS-------------------------------*/
cast:
    RW_CAST TK_LPAR expression RW_AS type TK_RPAR   {}
;

print:
    RW_PRINT expression
;