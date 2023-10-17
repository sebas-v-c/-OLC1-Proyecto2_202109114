import { JisonParser, JisonParserApi, StateType, SymbolsType, TerminalsType, ProductionsType } from '@ts-jison/parser';
/**
 * parser generated by  @ts-jison/parser-generator 0.4.1-alpha.2
 * @returns Parser implementing JisonParserApi and a Lexer implementing JisonLexerApi.
 */

    // files to import should be the js files
    /*
    import { LexError, SynError } from "./errors.js" 
    */
    // use this import while testing
    const { LexError, SynError } = require("./errors");

    let ast = [];
    let errors = [];
    let lexErrors = [];
    let synErrors = [];
    const clean_errors = () => {
        errors = [];
    }


    // files to import should be the js files
    /*
    import { LexError, SynError } from "./errors.js" 
    */
    // use this import while testing
    const { Declaration } = require("./instructions/declaration");
    const { SetVar } = require("./instructions/setVar");
    const { If } = require("./instructions/if");
    const { SimpleCase, SearchedCase } = require("./instructions/case");
    const { For } = require("./instructions/for");
    const { CodeBlock } = require("./instructions/codeBlock");
    const { Primitive, RelationalOperator, ArithmeticOperator } = require("./tools/types");
    const { PrimitiveVar } = require("./expressions/primitive");
    const { Relational } = require("./expressions/relational");
    const { Arithmetic } = require("./expressions/arithmetic");
    const { CallVar } = require("./expressions/callVar");

export class QCrypterParser extends JisonParser implements JisonParserApi {
    $?: any;
    symbols_: SymbolsType = {"error":2,"ini":3,"instructions":4,"EOF":5,"instruction":6,"TK_SCOLON":7,"ddl":8,"dml":9,"if_struct":10,"case_struct":11,"while_struct":12,"for_struct":13,"RW_BREAK":14,"RW_CONTINUE":15,"declare_function":16,"declare_method":17,"declare_var":18,"set_var":19,"encapsulated":20,"cast":21,"print":22,"RW_CREATE":23,"RW_TABLE":24,"TK_ID":25,"TK_LPAR":26,"typed_arguments":27,"TK_RPAR":28,"RW_ALTER":29,"alter_actions":30,"RW_DROP":31,"RW_INSERT":32,"RW_INTO":33,"arguments":34,"RW_VALUES":35,"value_arguments":36,"select_stmt":37,"RW_UPDATE":38,"RW_SET":39,"set_arguments":40,"RW_WHERE":41,"expression":42,"RW_TRUNCATE":43,"RW_DELETE":44,"RW_FROM":45,"RW_ADD":46,"type":47,"RW_COLUMN":48,"RW_RENAME":49,"RW_TO":50,"RW_SELECT":51,"select_arguments":52,"FROM":53,"AS":54,"TK_STAR":55,"TK_COMA":56,"TK_EQ":57,"typed_var_arguments":58,"TK_VAR":59,"RW_INT":60,"RW_VARCHAR":61,"RW_DOUBLE":62,"RW_DATE":63,"RW_BOOLEAN":64,"RW_NULL":65,"RW_IF":66,"RW_THEN":67,"env":68,"RW_ELSE":69,"RW_END":70,"RW_BEGIN":71,"simple_case":72,"searched_case":73,"RW_CASE":74,"simple_case_cases":75,"primitive":76,"RW_AS":77,"RW_WHEN":78,"searched_case_cases":79,"relational":80,"RW_WHILE":81,"RW_FOR":82,"RW_IN":83,"TK_INT":84,"TK_DOT":85,"RW_LOOP":86,"END":87,"RW_FUNCTION":88,"RETURNS":89,"RW_PROCEDURE":90,"RW_DECLARE":91,"RW_DEFAULT":92,"logic":93,"arithmetic":94,"call_func_mth":95,"TK_GEQ":96,"TK_LEQ":97,"TK_GREATER":98,"TK_LESS":99,"TK_NOTEQ":100,"RW_AND":101,"RW_OR":102,"RW_NOT":103,"TK_DOUBLE":104,"TK_DATE":105,"TK_VARCHAR":106,"RW_TRUE":107,"RW_FALSE":108,"TK_PLUS":109,"TK_MINUS":110,"TK_DIV":111,"TK_MOD":112,"RW_CAST":113,"RW_PRINT":114,"$accept":0,"$end":1};
    terminals_: TerminalsType = {2:"error",5:"EOF",7:"TK_SCOLON",14:"RW_BREAK",15:"RW_CONTINUE",23:"RW_CREATE",24:"RW_TABLE",25:"TK_ID",26:"TK_LPAR",28:"TK_RPAR",29:"RW_ALTER",31:"RW_DROP",32:"RW_INSERT",33:"RW_INTO",35:"RW_VALUES",38:"RW_UPDATE",39:"RW_SET",41:"RW_WHERE",43:"RW_TRUNCATE",44:"RW_DELETE",45:"RW_FROM",46:"RW_ADD",48:"RW_COLUMN",49:"RW_RENAME",50:"RW_TO",51:"RW_SELECT",53:"FROM",54:"AS",55:"TK_STAR",56:"TK_COMA",57:"TK_EQ",59:"TK_VAR",60:"RW_INT",61:"RW_VARCHAR",62:"RW_DOUBLE",63:"RW_DATE",64:"RW_BOOLEAN",65:"RW_NULL",66:"RW_IF",67:"RW_THEN",69:"RW_ELSE",70:"RW_END",71:"RW_BEGIN",74:"RW_CASE",77:"RW_AS",78:"RW_WHEN",81:"RW_WHILE",82:"RW_FOR",83:"RW_IN",84:"TK_INT",85:"TK_DOT",86:"RW_LOOP",87:"END",88:"RW_FUNCTION",89:"RETURNS",90:"RW_PROCEDURE",91:"RW_DECLARE",92:"RW_DEFAULT",96:"TK_GEQ",97:"TK_LEQ",98:"TK_GREATER",99:"TK_LESS",100:"TK_NOTEQ",101:"RW_AND",102:"RW_OR",103:"RW_NOT",104:"TK_DOUBLE",105:"TK_DATE",106:"TK_VARCHAR",107:"RW_TRUE",108:"RW_FALSE",109:"TK_PLUS",110:"TK_MINUS",111:"TK_DIV",112:"TK_MOD",113:"RW_CAST",114:"RW_PRINT"};
    productions_: ProductionsType = [0,[3,2],[3,1],[4,3],[4,2],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[8,6],[8,4],[8,3],[9,10],[9,1],[9,6],[9,3],[9,5],[30,3],[30,3],[30,3],[30,5],[37,4],[37,6],[37,4],[37,2],[52,1],[52,1],[40,5],[40,3],[36,3],[36,1],[34,3],[34,1],[27,4],[27,2],[58,4],[58,2],[47,1],[47,1],[47,1],[47,1],[47,1],[47,1],[10,8],[10,6],[11,1],[11,1],[72,6],[72,8],[75,5],[75,4],[73,5],[73,7],[79,5],[79,4],[12,5],[13,11],[20,3],[16,11],[17,8],[18,2],[18,5],[19,4],[68,1],[68,0],[42,3],[42,1],[42,1],[42,1],[42,1],[42,1],[42,1],[42,1],[42,3],[80,3],[80,3],[80,3],[80,3],[80,3],[80,3],[93,3],[93,3],[93,2],[76,1],[76,1],[76,1],[76,1],[76,1],[76,1],[76,1],[94,3],[94,3],[94,3],[94,3],[94,3],[94,2],[95,4],[21,6],[22,2]];
    table: Array<StateType>;
    defaultActions: {[key:number]: any} = {3:[2,2],5:[2,5],6:[2,6],7:[2,7],8:[2,8],9:[2,9],10:[2,10],11:[2,11],12:[2,12],13:[2,13],14:[2,14],15:[2,15],16:[2,16],17:[2,17],18:[2,18],19:[2,19],24:[2,24],29:[2,56],30:[2,57],40:[2,1],83:[2,36],93:[2,22],96:[2,26],128:[2,68],143:[2,21],203:[2,66],215:[2,20],220:[2,28],221:[2,29],222:[2,30],229:[2,55],249:[2,63],252:[2,70],253:[2,31],256:[2,54],258:[2,59],264:[2,23],266:[2,69],267:[2,67]};

    constructor (yy = {}, lexer = new QCrypterLexer(yy)) {
      super(yy, lexer);

      // shorten static method to just `o` for terse STATE_TABLE
      const $V0=[1,11],$V1=[1,12],$V2=[1,20],$V3=[1,21],$V4=[1,22],$V5=[1,23],$V6=[1,25],$V7=[1,34],$V8=[1,26],$V9=[1,27],$Va=[1,38],$Vb=[1,28],$Vc=[1,35],$Vd=[1,39],$Ve=[1,31],$Vf=[1,32],$Vg=[1,33],$Vh=[1,36],$Vi=[1,37],$Vj=[1,71],$Vk=[1,53],$Vl=[1,61],$Vm=[1,60],$Vn=[1,69],$Vo=[1,63],$Vp=[1,62],$Vq=[1,64],$Vr=[1,65],$Vs=[1,66],$Vt=[1,67],$Vu=[1,68],$Vv=[1,70],$Vw=[2,75],$Vx=[5,14,15,23,29,31,32,38,39,43,44,51,66,69,70,71,74,81,82,87,91,113,114],$Vy=[1,110],$Vz=[1,99],$VA=[1,100],$VB=[1,101],$VC=[1,102],$VD=[1,103],$VE=[1,104],$VF=[1,105],$VG=[1,106],$VH=[1,107],$VI=[1,108],$VJ=[1,109],$VK=[1,111],$VL=[7,26,28,53,54,55,56,57,67,71,77,78,96,97,98,99,100,101,102,109,110,111,112],$VM=[2,77],$VN=[7,26,28,53,54,55,56,57,67,69,70,71,77,78,96,97,98,99,100,101,102,109,110,111,112],$VO=[1,119],$VP=[1,121],$VQ=[1,122],$VR=[1,123],$VS=[1,124],$VT=[1,125],$VU=[1,126],$VV=[1,128],$VW=[7,28],$VX=[2,41],$VY=[1,132],$VZ=[7,26,28,53,54,56,67,71,77,78,101,102],$V_=[1,169],$V$=[2,47],$V01=[7,28,56,77,92],$V11=[55,57,96,97,98,99,100,101,102,109,110,111,112],$V21=[1,186],$V31=[7,26,28,53,54,56,57,67,71,77,78,96,97,98,99,100,101,102],$V41=[7,26,28,53,54,56,57,67,71,77,78,96,97,98,99,100,101,102,109,110,112],$V51=[1,202],$V61=[28,56],$V71=[1,216],$V81=[69,78],$V91=[41,56];
      const o = JisonParser.expandParseTable;
      this.table = [{3:1,4:2,5:[1,3],6:4,8:5,9:6,10:7,11:8,12:9,13:10,14:$V0,15:$V1,16:13,17:14,18:15,19:16,20:17,21:18,22:19,23:$V2,29:$V3,31:$V4,32:$V5,37:24,38:$V6,39:$V7,43:$V8,44:$V9,51:$Va,66:$Vb,71:$Vc,72:29,73:30,74:$Vd,81:$Ve,82:$Vf,91:$Vg,113:$Vh,114:$Vi},{1:[3]},{5:[1,40],6:41,8:5,9:6,10:7,11:8,12:9,13:10,14:$V0,15:$V1,16:13,17:14,18:15,19:16,20:17,21:18,22:19,23:$V2,29:$V3,31:$V4,32:$V5,37:24,38:$V6,39:$V7,43:$V8,44:$V9,51:$Va,66:$Vb,71:$Vc,72:29,73:30,74:$Vd,81:$Ve,82:$Vf,91:$Vg,113:$Vh,114:$Vi},{1:[2,2]},{7:[1,42]},{7:[2,5]},{7:[2,6]},{7:[2,7]},{7:[2,8]},{7:[2,9]},{7:[2,10]},{7:[2,11]},{7:[2,12]},{7:[2,13]},{7:[2,14]},{7:[2,15]},{7:[2,16]},{7:[2,17]},{7:[2,18]},{7:[2,19]},{24:[1,43],88:[1,44],90:[1,45]},{24:[1,46]},{24:[1,47]},{33:[1,48]},{7:[2,24]},{25:[1,49]},{24:[1,50]},{45:[1,51]},{21:59,25:$Vj,26:$Vk,28:$Vl,42:52,59:$Vm,65:$Vn,76:56,80:54,84:$Vo,93:55,94:57,95:58,103:$Vp,104:$Vq,105:$Vr,106:$Vs,107:$Vt,108:$Vu,110:$Vv,113:$Vh},{7:[2,56]},{7:[2,57]},{21:59,25:$Vj,26:$Vk,28:$Vl,42:72,59:$Vm,65:$Vn,76:56,80:54,84:$Vo,93:55,94:57,95:58,103:$Vp,104:$Vq,105:$Vr,106:$Vs,107:$Vt,108:$Vu,110:$Vv,113:$Vh},{59:[1,73]},{58:74,59:[1,75]},{59:[1,76]},{4:78,6:4,8:5,9:6,10:7,11:8,12:9,13:10,14:$V0,15:$V1,16:13,17:14,18:15,19:16,20:17,21:18,22:19,23:$V2,29:$V3,31:$V4,32:$V5,37:24,38:$V6,39:$V7,43:$V8,44:$V9,51:$Va,66:$Vb,68:77,71:$Vc,72:29,73:30,74:$Vd,81:$Ve,82:$Vf,87:$Vw,91:$Vg,113:$Vh,114:$Vi},{26:[1,79]},{21:59,25:$Vj,26:$Vk,28:$Vl,42:80,59:$Vm,65:$Vn,76:56,80:54,84:$Vo,93:55,94:57,95:58,103:$Vp,104:$Vq,105:$Vr,106:$Vs,107:$Vt,108:$Vu,110:$Vv,113:$Vh},{21:59,25:$Vj,26:$Vk,28:$Vl,36:84,42:82,52:81,55:[1,83],59:$Vm,65:$Vn,76:56,80:54,84:$Vo,93:55,94:57,95:58,103:$Vp,104:$Vq,105:$Vr,106:$Vs,107:$Vt,108:$Vu,110:$Vv,113:$Vh},{21:59,25:$Vj,26:$Vk,28:$Vl,42:85,59:$Vm,65:$Vn,76:56,78:[1,87],79:86,80:54,84:$Vo,93:55,94:57,95:58,103:$Vp,104:$Vq,105:$Vr,106:$Vs,107:$Vt,108:$Vu,110:$Vv,113:$Vh},{1:[2,1]},{7:[1,88]},o($Vx,[2,4]),{25:[1,89]},{25:[1,90]},{25:[1,91]},{25:[1,92]},{25:[1,93]},{25:[1,94]},{39:[1,95]},{25:[1,96]},{25:[1,97]},{55:$Vy,57:$Vz,67:[1,98],96:$VA,97:$VB,98:$VC,99:$VD,100:$VE,101:$VF,102:$VG,109:$VH,110:$VI,111:$VJ,112:$VK},{37:112,51:$Va},o($VL,$VM),o($VL,[2,78]),o($VL,[2,79]),o($VL,[2,80]),o($VL,[2,81]),o($VL,[2,82]),o($VL,[2,83]),{21:59,25:$Vj,26:$Vk,28:$Vl,42:113,59:$Vm,65:$Vn,76:56,80:54,84:$Vo,93:55,94:57,95:58,103:$Vp,104:$Vq,105:$Vr,106:$Vs,107:$Vt,108:$Vu,110:$Vv,113:$Vh},{21:59,25:$Vj,26:$Vk,28:$Vl,42:114,59:$Vm,65:$Vn,76:56,80:54,84:$Vo,93:55,94:57,95:58,103:$Vp,104:$Vq,105:$Vr,106:$Vs,107:$Vt,108:$Vu,110:$Vv,113:$Vh},o($VN,[2,94]),o($VN,[2,95]),o($VN,[2,96]),o($VN,[2,97]),o($VN,[2,98]),o($VN,[2,99]),o($VN,[2,100]),{21:59,25:$Vj,26:$Vk,28:$Vl,42:115,59:$Vm,65:$Vn,76:56,80:54,84:$Vo,93:55,94:57,95:58,103:$Vp,104:$Vq,105:$Vr,106:$Vs,107:$Vt,108:$Vu,110:$Vv,113:$Vh},{26:[1,116]},{55:$Vy,57:$Vz,71:[1,117],96:$VA,97:$VB,98:$VC,99:$VD,100:$VE,101:$VF,102:$VG,109:$VH,110:$VI,111:$VJ,112:$VK},{83:[1,118]},{7:[2,71],56:$VO},{47:120,60:$VP,61:$VQ,62:$VR,63:$VS,64:$VT,65:$VU},{57:[1,127]},{87:$VV},o([69,70,87],[2,74],{8:5,9:6,10:7,11:8,12:9,13:10,16:13,17:14,18:15,19:16,20:17,21:18,22:19,37:24,72:29,73:30,6:41,14:$V0,15:$V1,23:$V2,29:$V3,31:$V4,32:$V5,38:$V6,39:$V7,43:$V8,44:$V9,51:$Va,66:$Vb,71:$Vc,74:$Vd,81:$Ve,82:$Vf,91:$Vg,113:$Vh,114:$Vi}),{21:59,25:$Vj,26:$Vk,28:$Vl,42:129,59:$Vm,65:$Vn,76:56,80:54,84:$Vo,93:55,94:57,95:58,103:$Vp,104:$Vq,105:$Vr,106:$Vs,107:$Vt,108:$Vu,110:$Vv,113:$Vh},{7:[2,109],55:$Vy,57:$Vz,96:$VA,97:$VB,98:$VC,99:$VD,100:$VE,101:$VF,102:$VG,109:$VH,110:$VI,111:$VJ,112:$VK},{53:[1,130]},o($VW,[2,35],{53:$VX,56:$VX,54:[1,131],55:$Vy,57:$Vz,96:$VA,97:$VB,98:$VC,99:$VD,100:$VE,101:$VF,102:$VG,109:$VH,110:$VI,111:$VJ,112:$VK}),{53:[2,36]},{53:[2,37],56:$VY},{55:$Vy,57:$Vz,75:133,78:[1,134],96:$VA,97:$VB,98:$VC,99:$VD,100:$VE,101:$VF,102:$VG,109:$VH,110:$VI,111:$VJ,112:$VK},{69:[1,135],78:[1,136]},{21:59,25:$Vj,26:$Vk,28:$Vl,42:138,59:$Vm,65:$Vn,76:56,80:137,84:$Vo,93:55,94:57,95:58,103:$Vp,104:$Vq,105:$Vr,106:$Vs,107:$Vt,108:$Vu,110:$Vv,113:$Vh},o($Vx,[2,3]),{26:[1,139]},{26:[1,140]},{58:141,59:[1,142]},{30:143,31:[1,145],46:[1,144],49:[1,146]},{7:[2,22]},{26:[1,147]},{25:[1,149],40:148},{7:[2,26]},{41:[1,150]},{4:78,6:4,8:5,9:6,10:7,11:8,12:9,13:10,14:$V0,15:$V1,16:13,17:14,18:15,19:16,20:17,21:18,22:19,23:$V2,29:$V3,31:$V4,32:$V5,37:24,38:$V6,39:$V7,43:$V8,44:$V9,51:$Va,66:$Vb,68:151,69:$Vw,71:[1,152],72:29,73:30,74:$Vd,81:$Ve,82:$Vf,91:$Vg,113:$Vh,114:$Vi},{21:59,25:$Vj,26:$Vk,28:$Vl,42:153,59:$Vm,65:$Vn,76:56,80:54,84:$Vo,93:55,94:57,95:58,103:$Vp,104:$Vq,105:$Vr,106:$Vs,107:$Vt,108:$Vu,110:$Vv,113:$Vh},{21:59,25:$Vj,26:$Vk,28:$Vl,42:154,59:$Vm,65:$Vn,76:56,80:54,84:$Vo,93:55,94:57,95:58,103:$Vp,104:$Vq,105:$Vr,106:$Vs,107:$Vt,108:$Vu,110:$Vv,113:$Vh},{21:59,25:$Vj,26:$Vk,28:$Vl,42:155,59:$Vm,65:$Vn,76:56,80:54,84:$Vo,93:55,94:57,95:58,103:$Vp,104:$Vq,105:$Vr,106:$Vs,107:$Vt,108:$Vu,110:$Vv,113:$Vh},{21:59,25:$Vj,26:$Vk,28:$Vl,42:156,59:$Vm,65:$Vn,76:56,80:54,84:$Vo,93:55,94:57,95:58,103:$Vp,104:$Vq,105:$Vr,106:$Vs,107:$Vt,108:$Vu,110:$Vv,113:$Vh},{21:59,25:$Vj,26:$Vk,28:$Vl,42:157,59:$Vm,65:$Vn,76:56,80:54,84:$Vo,93:55,94:57,95:58,103:$Vp,104:$Vq,105:$Vr,106:$Vs,107:$Vt,108:$Vu,110:$Vv,113:$Vh},{21:59,25:$Vj,26:$Vk,28:$Vl,42:158,59:$Vm,65:$Vn,76:56,80:54,84:$Vo,93:55,94:57,95:58,103:$Vp,104:$Vq,105:$Vr,106:$Vs,107:$Vt,108:$Vu,110:$Vv,113:$Vh},{21:59,25:$Vj,26:$Vk,28:$Vl,42:159,59:$Vm,65:$Vn,76:56,80:54,84:$Vo,93:55,94:57,95:58,103:$Vp,104:$Vq,105:$Vr,106:$Vs,107:$Vt,108:$Vu,110:$Vv,113:$Vh},{21:59,25:$Vj,26:$Vk,28:$Vl,42:160,59:$Vm,65:$Vn,76:56,80:54,84:$Vo,93:55,94:57,95:58,103:$Vp,104:$Vq,105:$Vr,106:$Vs,107:$Vt,108:$Vu,110:$Vv,113:$Vh},{21:59,25:$Vj,26:$Vk,28:$Vl,42:161,59:$Vm,65:$Vn,76:56,80:54,84:$Vo,93:55,94:57,95:58,103:$Vp,104:$Vq,105:$Vr,106:$Vs,107:$Vt,108:$Vu,110:$Vv,113:$Vh},{21:59,25:$Vj,26:$Vk,28:$Vl,42:162,59:$Vm,65:$Vn,76:56,80:54,84:$Vo,93:55,94:57,95:58,103:$Vp,104:$Vq,105:$Vr,106:$Vs,107:$Vt,108:$Vu,110:$Vv,113:$Vh},{21:59,25:$Vj,26:$Vk,28:$Vl,42:163,59:$Vm,65:$Vn,76:56,80:54,84:$Vo,93:55,94:57,95:58,103:$Vp,104:$Vq,105:$Vr,106:$Vs,107:$Vt,108:$Vu,110:$Vv,113:$Vh},{21:59,25:$Vj,26:$Vk,28:$Vl,42:164,59:$Vm,65:$Vn,76:56,80:54,84:$Vo,93:55,94:57,95:58,103:$Vp,104:$Vq,105:$Vr,106:$Vs,107:$Vt,108:$Vu,110:$Vv,113:$Vh},{21:59,25:$Vj,26:$Vk,28:$Vl,42:165,59:$Vm,65:$Vn,76:56,80:54,84:$Vo,93:55,94:57,95:58,103:$Vp,104:$Vq,105:$Vr,106:$Vs,107:$Vt,108:$Vu,110:$Vv,113:$Vh},{28:[1,166]},{26:[1,167],55:$Vy,57:$Vz,96:$VA,97:$VB,98:$VC,99:$VD,100:$VE,101:$VF,102:$VG,109:$VH,110:$VI,111:$VJ,112:$VK},o($VZ,[2,93],{55:$Vy,57:$Vz,96:$VA,97:$VB,98:$VC,99:$VD,100:$VE,109:$VH,110:$VI,111:$VJ,112:$VK}),o($VL,[2,106]),{25:$V_,34:168},{4:78,6:4,8:5,9:6,10:7,11:8,12:9,13:10,14:$V0,15:$V1,16:13,17:14,18:15,19:16,20:17,21:18,22:19,23:$V2,29:$V3,31:$V4,32:$V5,37:24,38:$V6,39:$V7,43:$V8,44:$V9,51:$Va,66:$Vb,68:170,70:$Vw,71:$Vc,72:29,73:30,74:$Vd,81:$Ve,82:$Vf,91:$Vg,113:$Vh,114:$Vi},{84:[1,171]},{59:[1,172]},o([7,56],$V$,{92:[1,173]}),o($V01,[2,48]),o($V01,[2,49]),o($V01,[2,50]),o($V01,[2,51]),o($V01,[2,52]),o($V01,[2,53]),{21:59,25:$Vj,26:$Vk,28:$Vl,42:174,59:$Vm,65:$Vn,76:56,80:54,84:$Vo,93:55,94:57,95:58,103:$Vp,104:$Vq,105:$Vr,106:$Vs,107:$Vt,108:$Vu,110:$Vv,113:$Vh},{7:[2,68]},{55:$Vy,57:$Vz,77:[1,175],96:$VA,97:$VB,98:$VC,99:$VD,100:$VE,101:$VF,102:$VG,109:$VH,110:$VI,111:$VJ,112:$VK},{25:[1,176]},{25:[1,177]},{21:59,25:$Vj,26:$Vk,28:$Vl,42:178,59:$Vm,65:$Vn,76:56,80:54,84:$Vo,93:55,94:57,95:58,103:$Vp,104:$Vq,105:$Vr,106:$Vs,107:$Vt,108:$Vu,110:$Vv,113:$Vh},{69:[1,179],78:[1,180]},{65:$Vn,76:181,84:$Vo,104:$Vq,105:$Vr,106:$Vs,107:$Vt,108:$Vu},{65:$Vn,76:182,84:$Vo,104:$Vq,105:$Vr,106:$Vs,107:$Vt,108:$Vu},{21:59,25:$Vj,26:$Vk,28:$Vl,42:138,59:$Vm,65:$Vn,76:56,80:183,84:$Vo,93:55,94:57,95:58,103:$Vp,104:$Vq,105:$Vr,106:$Vs,107:$Vt,108:$Vu,110:$Vv,113:$Vh},o($V11,$VM,{67:[1,184]}),{55:$Vy,57:$Vz,96:$VA,97:$VB,98:$VC,99:$VD,100:$VE,101:$VF,102:$VG,109:$VH,110:$VI,111:$VJ,112:$VK},{25:$V21,27:185},{25:$V21,27:187},{56:$VO,77:[1,188]},{47:189,60:$VP,61:$VQ,62:$VR,63:$VS,64:$VT,65:$VU},{7:[2,21]},{25:[1,190]},{48:[1,191]},{48:[1,193],50:[1,192]},{25:$V_,34:194},{41:[1,195],56:[1,196]},{57:[1,197]},{21:59,25:$Vj,26:$Vk,28:$Vl,42:198,59:$Vm,65:$Vn,76:56,80:54,84:$Vo,93:55,94:57,95:58,103:$Vp,104:$Vq,105:$Vr,106:$Vs,107:$Vt,108:$Vu,110:$Vv,113:$Vh},{69:[1,199]},o([70,87],$Vw,{6:4,8:5,9:6,10:7,11:8,12:9,13:10,16:13,17:14,18:15,19:16,20:17,21:18,22:19,37:24,72:29,73:30,4:78,68:200,14:$V0,15:$V1,23:$V2,29:$V3,31:$V4,32:$V5,38:$V6,39:$V7,43:$V8,44:$V9,51:$Va,66:$Vb,71:$Vc,74:$Vd,81:$Ve,82:$Vf,91:$Vg,113:$Vh,114:$Vi}),o($V31,[2,85],{55:$Vy,109:$VH,110:$VI,111:$VJ,112:$VK}),o($V31,[2,86],{55:$Vy,109:$VH,110:$VI,111:$VJ,112:$VK}),o($V31,[2,87],{55:$Vy,109:$VH,110:$VI,111:$VJ,112:$VK}),o($V31,[2,88],{55:$Vy,109:$VH,110:$VI,111:$VJ,112:$VK}),o($V31,[2,89],{55:$Vy,109:$VH,110:$VI,111:$VJ,112:$VK}),o($V31,[2,90],{55:$Vy,109:$VH,110:$VI,111:$VJ,112:$VK}),o($VZ,[2,91],{55:$Vy,57:$Vz,96:$VA,97:$VB,98:$VC,99:$VD,100:$VE,109:$VH,110:$VI,111:$VJ,112:$VK}),o([7,26,28,53,54,56,67,71,77,78,102],[2,92],{55:$Vy,57:$Vz,96:$VA,97:$VB,98:$VC,99:$VD,100:$VE,101:$VF,109:$VH,110:$VI,111:$VJ,112:$VK}),o($V41,[2,101],{55:$Vy,111:$VJ}),o($V41,[2,102],{55:$Vy,111:$VJ}),o($VL,[2,103]),o($VL,[2,104]),o($V41,[2,105],{55:$Vy,111:$VJ}),o($VL,[2,76]),o($VL,[2,84]),{28:[1,201],56:$V51},o($V61,[2,43]),{70:[1,203]},{85:[1,204]},{47:205,60:$VP,61:$VQ,62:$VR,63:$VS,64:$VT,65:$VU},{21:59,25:$Vj,26:$Vk,28:$Vl,42:206,59:$Vm,65:$Vn,76:56,80:54,84:$Vo,93:55,94:57,95:58,103:$Vp,104:$Vq,105:$Vr,106:$Vs,107:$Vt,108:$Vu,110:$Vv,113:$Vh},{7:[2,73],55:$Vy,57:$Vz,96:$VA,97:$VB,98:$VC,99:$VD,100:$VE,101:$VF,102:$VG,109:$VH,110:$VI,111:$VJ,112:$VK},{47:207,60:$VP,61:$VQ,62:$VR,63:$VS,64:$VT,65:$VU},o($VW,[2,32],{41:[1,208]}),o($VW,[2,34]),o([28,53,56],[2,40],{55:$Vy,57:$Vz,96:$VA,97:$VB,98:$VC,99:$VD,100:$VE,101:$VF,102:$VG,109:$VH,110:$VI,111:$VJ,112:$VK}),{65:$Vn,76:209,84:$Vo,104:$Vq,105:$Vr,106:$Vs,107:$Vt,108:$Vu},{65:$Vn,76:210,84:$Vo,104:$Vq,105:$Vr,106:$Vs,107:$Vt,108:$Vu},{67:[1,211]},{70:[1,212]},o($V11,$VM,{67:[1,213]}),{65:$Vn,76:214,84:$Vo,104:$Vq,105:$Vr,106:$Vs,107:$Vt,108:$Vu},{28:[1,215],56:$V71},{47:217,60:$VP,61:$VQ,62:$VR,63:$VS,64:$VT,65:$VU},{28:[1,218],56:$V71},{71:[1,219]},o([56,77],$V$),{47:220,60:$VP,61:$VQ,62:$VR,63:$VS,64:$VT,65:$VU},{25:[1,221]},{25:[1,222]},{25:[1,223]},{28:[1,224],56:$V51},{21:59,25:$Vj,26:$Vk,28:$Vl,42:225,59:$Vm,65:$Vn,76:56,80:54,84:$Vo,93:55,94:57,95:58,103:$Vp,104:$Vq,105:$Vr,106:$Vs,107:$Vt,108:$Vu,110:$Vv,113:$Vh},{25:[1,226]},{25:[1,227]},{7:[2,27],55:$Vy,57:$Vz,96:$VA,97:$VB,98:$VC,99:$VD,100:$VE,101:$VF,102:$VG,109:$VH,110:$VI,111:$VJ,112:$VK},{4:78,6:4,8:5,9:6,10:7,11:8,12:9,13:10,14:$V0,15:$V1,16:13,17:14,18:15,19:16,20:17,21:18,22:19,23:$V2,29:$V3,31:$V4,32:$V5,37:24,38:$V6,39:$V7,43:$V8,44:$V9,51:$Va,66:$Vb,68:228,70:$Vw,71:$Vc,72:29,73:30,74:$Vd,81:$Ve,82:$Vf,91:$Vg,113:$Vh,114:$Vi},{70:[1,229],87:$VV},o($VL,[2,107]),{25:[1,230]},{7:[2,66]},{85:[1,231]},o([7,56,77],[2,46]),{7:[2,72],55:$Vy,57:$Vz,96:$VA,97:$VB,98:$VC,99:$VD,100:$VE,101:$VF,102:$VG,109:$VH,110:$VI,111:$VJ,112:$VK},{28:[1,232]},{21:59,25:$Vj,26:$Vk,28:$Vl,42:233,59:$Vm,65:$Vn,76:56,80:54,84:$Vo,93:55,94:57,95:58,103:$Vp,104:$Vq,105:$Vr,106:$Vs,107:$Vt,108:$Vu,110:$Vv,113:$Vh},{70:[1,234]},{67:[1,235]},{65:$Vn,76:236,84:$Vo,104:$Vq,105:$Vr,106:$Vs,107:$Vt,108:$Vu},{7:[2,62],77:[1,237]},{65:$Vn,76:238,84:$Vo,104:$Vq,105:$Vr,106:$Vs,107:$Vt,108:$Vu},o($V81,[2,65]),{7:[2,20]},{25:[1,239]},o($V61,[2,45]),{89:[1,240]},{4:78,6:4,8:5,9:6,10:7,11:8,12:9,13:10,14:$V0,15:$V1,16:13,17:14,18:15,19:16,20:17,21:18,22:19,23:$V2,29:$V3,31:$V4,32:$V5,37:24,38:$V6,39:$V7,43:$V8,44:$V9,51:$Va,66:$Vb,68:241,70:$Vw,71:$Vc,72:29,73:30,74:$Vd,81:$Ve,82:$Vf,91:$Vg,113:$Vh,114:$Vi},{7:[2,28]},{7:[2,29]},{7:[2,30]},{50:[1,242]},{35:[1,243]},{7:[2,25],55:$Vy,57:$Vz,96:$VA,97:$VB,98:$VC,99:$VD,100:$VE,101:$VF,102:$VG,109:$VH,110:$VI,111:$VJ,112:$VK},{57:[1,244]},o($V91,[2,39]),{70:[1,245]},{7:[2,55]},o($V61,[2,42]),{84:[1,246]},o($VL,[2,108]),o($VW,[2,33],{55:$Vy,57:$Vz,96:$VA,97:$VB,98:$VC,99:$VD,100:$VE,101:$VF,102:$VG,109:$VH,110:$VI,111:$VJ,112:$VK}),{7:[2,58],77:[1,247]},{65:$Vn,76:248,84:$Vo,104:$Vq,105:$Vr,106:$Vs,107:$Vt,108:$Vu},o($V81,[2,61]),{25:[1,249]},o($V81,[2,64]),{47:250,60:$VP,61:$VQ,62:$VR,63:$VS,64:$VT,65:$VU},{65:$Vn,76:251,84:$Vo,104:$Vq,105:$Vr,106:$Vs,107:$Vt,108:$Vu},{70:[1,252]},{25:[1,253]},{28:[1,254]},{25:[1,255]},{66:[1,256]},{71:[1,257]},{59:[1,258]},o($V81,[2,60]),{7:[2,63]},o($V61,[2,44]),{71:[1,259]},{7:[2,70]},{7:[2,31]},{21:59,25:$Vj,26:$Vk,28:$Vl,36:260,42:261,59:$Vm,65:$Vn,76:56,80:54,84:$Vo,93:55,94:57,95:58,103:$Vp,104:$Vq,105:$Vr,106:$Vs,107:$Vt,108:$Vu,110:$Vv,113:$Vh},o($V91,[2,38]),{7:[2,54]},{4:78,6:4,8:5,9:6,10:7,11:8,12:9,13:10,14:$V0,15:$V1,16:13,17:14,18:15,19:16,20:17,21:18,22:19,23:$V2,29:$V3,31:$V4,32:$V5,37:24,38:$V6,39:$V7,43:$V8,44:$V9,51:$Va,66:$Vb,68:262,70:$Vw,71:$Vc,72:29,73:30,74:$Vd,81:$Ve,82:$Vf,91:$Vg,113:$Vh,114:$Vi},{7:[2,59]},{4:78,6:4,8:5,9:6,10:7,11:8,12:9,13:10,14:$V0,15:$V1,16:13,17:14,18:15,19:16,20:17,21:18,22:19,23:$V2,29:$V3,31:$V4,32:$V5,37:24,38:$V6,39:$V7,43:$V8,44:$V9,51:$Va,66:$Vb,68:263,70:$Vw,71:$Vc,72:29,73:30,74:$Vd,81:$Ve,82:$Vf,91:$Vg,113:$Vh,114:$Vi},{28:[1,264],56:$VY},o($V61,$VX,{55:$Vy,57:$Vz,96:$VA,97:$VB,98:$VC,99:$VD,100:$VE,101:$VF,102:$VG,109:$VH,110:$VI,111:$VJ,112:$VK}),{70:[1,265]},{70:[1,266]},{7:[2,23]},{86:[1,267]},{7:[2,69]},{7:[2,67]}];
    }

    performAction (yytext:string, yyleng:number, yylineno:number, yy:any, yystate:number /* action[1] */, $$:any /* vstack */, _$:any /* lstack */): any {
/* this == yyval */
          var $0 = $$.length - 1;
        switch (yystate) {
case 1:
 return $$[$0-1]; 
break;
case 2:
 return null 
break;
case 3:
 $$[$0-2].push($$[$0-1]); this.$ = $$[$0-2]; 
break;
case 4:
 this.$ = [$$[$0-1]]; 
break;
case 5: case 6: case 7: case 8: case 9: case 10: case 11: case 12: case 13: case 14: case 15: case 16: case 17: case 18: case 19: case 24: case 56: case 57: case 77: case 78: case 79: case 80: case 81: case 82:
 this.$ = $$[$0]; 
break;
case 20: case 21: case 22: case 23: case 25: case 26: case 27:
  
break;
case 44: case 46:
 $$[$0-3].push({id: $$[$0-1], type: $$[$0]}); this.$ = $$[$0-3]; 
break;
case 45:
 this.$ = $$[$0-1] == null ? [{}] : [{id: $$[$0-1], type: $$[$0]}]; 
break;
case 47:
 this.$ = [{id: $$[$0-1], type: $$[$0]}];
break;
case 48:
 this.$ = Primitive.INT; 
break;
case 49:
 this.$ = Primitive.VARCHAR; 
break;
case 50:
 this.$ = Primitive.DOUBLE; 
break;
case 51:
 this.$ = Primitive.DATE; 
break;
case 52:
 this.$ = Primitive.BOOLEAN; 
break;
case 53:
 this.$ = Primitive.NULL; 
break;
case 54:
 $$[$0-4].envName = "if_env";$$[$0-2].envName = "else_env";this.$ = new If($$[$0-6], $$[$0-4], $$[$0-2], _$[$0-7].first_line, _$[$0-7].first_column, "if_env"); 
break;
case 55:
 $$[$0-1].envName = "if_env";this.$ = new If($$[$0-4], $$[$0-1], undefined, _$[$0-5].first_line, _$[$0-5].first_column, "if_env"); 
break;
case 58:
 this.$ = new SimpleCase($$[$0-4], $$[$0-3], $$[$0-1], undefined,_$[$0-5].first_line, _$[$0-5].first_column); 
break;
case 59:
 this.$ = new SimpleCase($$[$0-6], $$[$0-5], $$[$0-3], $$[$0] ,_$[$0-7].first_line, _$[$0-7].first_column); 
break;
case 60:
 $$[$0-4].push({when: $$[$0-2], then: $$[$0]}); this.$ = $$[$0-4]; 
break;
case 61:
 this.$ = [{when: $$[$0-2], then: $$[$0]}];
break;
case 67:
 $$[$0-2].envName = "for_env";this.$ = new For($$[$0-9], $$[$0-2], $$[$0-7], $$[$0-4], _$[$0-10].first_line, _$[$0-10].first_column); 
break;
case 68: case 76:
 this.$ = $$[$0-1]; 
break;
case 71:
 this.$ = new Declaration($$[$0], undefined, _$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 72:
 this.$ = new Declaration([{id: $$[$0-3], type: $$[$0-2]}], $$[$0], _$[$0-4].first_line, _$[$0-4].first_column); 
break;
case 73:
 this.$ = new SetVar($$[$0-2], $$[$0], _$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 74:
 this.$ = new CodeBlock($$[$0], _$[$0].first_line, _$[$0].first_column); 
break;
case 75:
 this.$ = undefined; 
break;
case 83:
 this.$ = new CallVar($$[$0], _$[$0].first_line, _$[$0].first_column); 
break;
case 84:
 this.$ = $$[$0-2]; 
break;
case 85:
 this.$ = new Relational($$[$0-2], RelationalOperator.EQ, $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 86:
 this.$ = new Relational($$[$0-2], RelationalOperator.GEQ, $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 87:
 this.$ = new Relational($$[$0-2], RelationalOperator.LEQ, $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 88:
 this.$ = new Relational($$[$0-2], RelationalOperator.GREATER, $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 89:
 this.$ = new Relational($$[$0-2], RelationalOperator.LESS, $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 90:
 this.$ = new Relational($$[$0-2], RelationalOperator.NEQ, $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 94:
 this.$ = new PrimitiveVar($$[$0], Primitive.INT , _$[$0].first_line, _$[$0].first_column); 
break;
case 95:
 this.$ = new PrimitiveVar($$[$0], Primitive.DOUBLE , _$[$0].first_line, _$[$0].first_column); 
break;
case 96:
 this.$ = new PrimitiveVar($$[$0], Primitive.DATE , _$[$0].first_line, _$[$0].first_column); 
break;
case 97:
 this.$ = new PrimitiveVar($$[$0], Primitive.VARCHAR, _$[$0].first_line, _$[$0].first_column); 
break;
case 98:
 this.$ = new PrimitiveVar($$[$0], Primitive.BOOLEAN , _$[$0].first_line, _$[$0].first_column); 
break;
case 99:
 this.$ = new PrimitiveVar($$[$0], Primitive.BOOLEAN, _$[$0].first_line, _$[$0].first_column); 
break;
case 100:
 this.$ = new PrimitiveVar(null, Primitive.NULL, _$[$0].first_line, _$[$0].first_column); 
break;
case 101:
 this.$ = new Arithmetic($$[$0-2], ArithmeticOperator.PLUS, $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 102:
 this.$ = new Arithmetic($$[$0-2], ArithmeticOperator.MINUS, $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 103:
 this.$ = new Arithmetic($$[$0-2], ArithmeticOperator.DIV, $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 104:
 this.$ = new Arithmetic($$[$0-2], ArithmeticOperator.MULT, $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 105:
 this.$ = new Arithmetic($$[$0-2], ArithmeticOperator.MOD, $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 106:
 this.$ = new Arithmetic(undefined, ArithmeticOperator.UMINUS, $$[$0], _$[$0-1].first_line, _$[$0-1].first_column); 
break;
        }
    }
}


/* generated by @ts-jison/lexer-generator 0.4.1-alpha.2 */
import { JisonLexer, JisonLexerApi } from '@ts-jison/lexer';

export class QCrypterLexer extends JisonLexer implements JisonLexerApi {
    options: any = {"case-insensitive":true,"moduleName":"QCrypter"};
    constructor (yy = {}) {
        super(yy);
    }

    rules: RegExp[] = [
        /^(?:\s+)/i,
        /^(?:--.*)/i,
        /^(?:[/][*][^*]*[*]+(?:[^/*][^*]*[*]+)*[/])/i,
        /^(?:[ \r\t]+\nCREATE\b)/i,
        /^(?:ALTER\b)/i,
        /^(?:DROP\b)/i,
        /^(?:RENAME\b)/i,
        /^(?:INSERT\b)/i,
        /^(?:UPDATE\b)/i,
        /^(?:TRUNCATE\b)/i,
        /^(?:DELETE\b)/i,
        /^(?:SELECT\b)/i,
        /^(?:FROM\b)/i,
        /^(?:WHERE\b)/i,
        /^(?:INTO\b)/i,
        /^(?:VALUES\b)/i,
        /^(?:ADD\b)/i,
        /^(?:COLUMN\b)/i,
        /^(?:RENAME\b)/i,
        /^(?:TO\b)/i,
        /^(?:TABLE\b)/i,
        /^(?:INT\b)/i,
        /^(?:DOUBLE\b)/i,
        /^(?:DATE\b)/i,
        /^(?:VARCHAR\b)/i,
        /^(?:BOOLEAN\b)/i,
        /^(?:TRUE\b)/i,
        /^(?:FALSE\b)/i,
        /^(?:NULL\b)/i,
        /^(?:NOT\b)/i,
        /^(?:AND\b)/i,
        /^(?:OR\b)/i,
        /^(?:BEGIN\b)/i,
        /^(?:END\b)/i,
        /^(?:DECLARE\b)/i,
        /^(?:DEFAULT\b)/i,
        /^(?:SET\b)/i,
        /^(?:AS\b)/i,
        /^(?:CAST\b)/i,
        /^(?:PRINT\b)/i,
        /^(?:IF\b)/i,
        /^(?:THEN\b)/i,
        /^(?:ELSE\b)/i,
        /^(?:CASE\b)/i,
        /^(?:WHEN\b)/i,
        /^(?:WHILE\b)/i,
        /^(?:FOR\b)/i,
        /^(?:IN\b)/i,
        /^(?:LOOP\b)/i,
        /^(?:BREAK\b)/i,
        /^(?:CONTINUE\b)/i,
        /^(?:FUNCTION\b)/i,
        /^(?:PROCEDURE\b)/i,
        /^(?:RETURNS\b)/i,
        /^(?:RETURN\b)/i,
        /^(?:\d{4}-\d{1,2}-\d{1,2})/i,
        /^(?:@_*[a-zA-Z\xf1\xd1][a-zA-Z0-9\xf1\xd1\_]*)/i,
        /^(?:[0-9]+\.[0-9]+\b)/i,
        /^(?:[0-9]+\b)/i,
        /^(?:_*[a-zA-Z\xf1\xd1][a-zA-Z0-9\xf1\xd1\_]*)/i,
        /^(?:"[^\"]*")/i,
        /^(?:'[^\"]*')/i,
        /^(?:'(?:[^\n\"\\]|\\.)*')/i,
        /^(?:"(?:[^\n\"\\]|\\.)*")/i,
        /^(?:\()/i,
        /^(?:\))/i,
        /^(?:;)/i,
        /^(?:\.)/i,
        /^(?:,)/i,
        /^(?:\+)/i,
        /^(?:-)/i,
        /^(?:\*)/i,
        /^(?:\/)/i,
        /^(?:%)/i,
        /^(?:>=)/i,
        /^(?:<=)/i,
        /^(?:==)/i,
        /^(?:!=)/i,
        /^(?:>)/i,
        /^(?:<)/i,
        /^(?:=)/i,
        /^(?:$)/i,
        /^(?:.)/i
    ];
    conditions: any = {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82],"inclusive":true}}
    performAction (yy:any,yy_:any,$avoiding_name_collisions:any,YY_START:any): any {
          var YYSTATE=YY_START;
        switch($avoiding_name_collisions) {
    case 0:// spaces ignored
      break;
    case 1:// comment inline
      break;
    case 2:// MultiLineComment
      break;
    case 3:return "RW_CREATE";
      break;
    case 4:return "RW_ALTER";
      break;
    case 5:return "RW_DROP";
      break;
    case 6:return "RW_RENAME";
      break;
    case 7:return "RW_INSERT";
      break;
    case 8:return "RW_UPDATE";
      break;
    case 9:return "RW_TRUNCATE";
      break;
    case 10:return "RW_DELETE";
      break;
    case 11:return "RW_SELECT";
      break;
    case 12:return "RW_FROM";
      break;
    case 13:return "RW_WHERE";
      break;
    case 14:return "RW_INTO";
      break;
    case 15:return "RW_VALUES";
      break;
    case 16:return "RW_ADD";
      break;
    case 17:return "RW_COLUMN";
      break;
    case 18:return "RW_RENAME";
      break;
    case 19:return "RW_TO";
      break;
    case 20:return "RW_TABLE";
      break;
    case 21:return "RW_INT";
      break;
    case 22:return "RW_DOUBLE";
      break;
    case 23:return "RW_DATE";
      break;
    case 24:return "RW_VARCHAR";
      break;
    case 25:return "RW_BOOLEAN";
      break;
    case 26:return "RW_TRUE";
      break;
    case 27:return "RW_FALSE";
      break;
    case 28:return "RW_NULL";
      break;
    case 29:return "RW_NOT"; 
      break;
    case 30:return "RW_AND";
      break;
    case 31:return "RW_OR";
      break;
    case 32:return "RW_BEGIN";
      break;
    case 33:return "RW_END";
      break;
    case 34:return "RW_DECLARE";
      break;
    case 35:return "RW_DEFAULT";
      break;
    case 36:return "RW_SET";
      break;
    case 37:return "RW_AS";
      break;
    case 38:return "RW_CAST";
      break;
    case 39:return "RW_PRINT";
      break;
    case 40:return "RW_IF";
      break;
    case 41:return "RW_THEN";
      break;
    case 42:return "RW_ELSE";
      break;
    case 43:return "RW_CASE";
      break;
    case 44:return "RW_WHEN";
      break;
    case 45:return "RW_WHILE";
      break;
    case 46:return "RW_FOR";
      break;
    case 47:return "RW_IN";
      break;
    case 48:return "RW_LOOP";
      break;
    case 49:return "RW_BREAK";
      break;
    case 50:return "RW_CONTINUE";
      break;
    case 51:return "RW_FUNCTION";
      break;
    case 52:return "RW_PROCEDURE";
      break;
    case 53:return "RW_RETURNS";
      break;
    case 54:return "RW_RETURN";
      break;
    case 55:return "TK_DATE";
      break;
    case 56:return "TK_VAR";
      break;
    case 57:return "TK_DOUBLE";
      break;
    case 58:return "TK_INT";
      break;
    case 59:return "TK_ID";
      break;
    case 60:return "TK_VARCHAR";
      break;
    case 61:return "TK_VARCHAR";
      break;
    case 62:return "TK_VARCHAR";
      break;
    case 63:return "TK_VARCHAR";
      break;
    case 64:return "TK_LPAR";
      break;
    case 65:return "TK_RPAR";
      break;
    case 66:return "TK_SCOLON";
      break;
    case 67:return "TK_DOT";
      break;
    case 68:return "TK_COMA";
      break;
    case 69:return "TK_PLUS";
      break;
    case 70:return "TK_MINUS";
      break;
    case 71:return "TK_STAR";
      break;
    case 72:return "TK_DIV";
      break;
    case 73:return "TK_MOD";
      break;
    case 74:return "TK_GEQ";
      break;
    case 75:return "TK_LEQ";
      break;
    case 76:return "TK_EQEQ";
      break;
    case 77:return "TK_NOTEQ";
      break;
    case 78:return "TK_GREATER";
      break;
    case 79:return "TK_LESS";
      break;
    case 80:return "TK_EQ";
      break;
    case 81:return 5;
      break;
    case 82: lexErrors.push(new LexError(yy_.yylloc.first_line, yy_.yylloc.first_column, yy_.yytext)); return "INVALID"; 
      break;
        }
    }
}


