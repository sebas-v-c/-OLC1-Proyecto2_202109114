%{
    // files to import should be the js files
%}

%{
    let ast = [];
    let errors = [];
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
"@"                             return "TK_ATSIGN"
"."                             return "TK_DOT";

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
<string>["]                     { yytext = str; this.popState(); return 'VARCHAR'}

[0-9]+\b                                return "TK_INT";
[0-9]+\.[0-9]+                          return "TK_DOUBLE";
^\d{4}-(0[1-9]|1[0-2])-([0-2]\d|3[01])$ return "TK_DATE";
(\_)*[a-zA-ZñÑ][a-zA-Z0-9ñÑ\_]*         return "TK_ID";


<<EOF>>                           return 'EOF'
//                              Here is better to create an error class
.                                { errors.push({ type: "lex", error: yytext, line: yylloc.first_line, column: yylloc.first_column + 1 }); return "INVALID"}

/lex
/*---------------------------Operators Precedence---------------------------*/
//%nonassoc 
//%left "KW_OR"
//%left "KW_AND"
//%rigth "KW_NOT"
//%left "TK_EQEQ" "TK_NOTEQ" "TK_LESS" "TK_LEQ" "TK_GREATER" "TK_GEQ" 
//%left "TK_PLUS" "TK_MINUS"
//%left "TK_MULT" "TK_DIV"
%right 'UMINUS'

/*to regonize this token we should call it with %prec UMINUS after delcaring a production



/*---------------------------Grammar Definition---------------------------*/
%start ini

%%

ini: 
    instructions EOF    { inst = { instructions: $1, errors: errors }; errors = []; return inst; }
|   error EOF           { inst = { instructions: [], error } }
;

// $$ sign is the root 
instructions:
    instructions instruction    { $1.push($2); $$ = $1; }
|   instruction                 { $$ = $1 == null ? [] : [$1]; }
;

instruction:
    error       { errors.push(`Sintactic error ${yytext} in [${this._$.first_line}, ${this._$.first_column}]`); $$ = null }
;