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
    //const { LexError, SynError } = require("./errors");
    import {LexError, SynError } from "./errors";

    export const ast = [];
    export let errors = [];
    export let lexErrors: Array<LexError> = [];
    export let synErrors: Array<SynError> = [];
    export const clean_errors = () => {
        lexErrors = [];
        synErrors = [];
        errors = [];
    }
    let controlString = "";


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
    const { SelectTable, SelectExpr } = require("./instructions/dml/select");

    const { Primitive, RelationalOperator, ArithmeticOperator, LogicalOperator } = require("./tools/types");
    const { PrimitiveVar } = require("./expressions/primitive");
    const { IdVar } = require("./expressions/id");
    const { Logical } = require("./expressions/logical");
    const { Relational } = require("./expressions/relational");
    const { Arithmetic } = require("./expressions/arithmetic");
    const { CallVar } = require("./expressions/callVar");
    const { CallFunc } = require("./expressions/callFunc");
    const { Cast } = require("./expressions/cast");

export class QCrypterParser extends JisonParser implements JisonParserApi {
    $?: any;
    symbols_: SymbolsType = {"error":2,"ini":3,"instructions":4,"EOF":5,"instruction":6,"TK_SCOLON":7,"ddl":8,"dml":9,"if_struct":10,"case_struct":11,"while_struct":12,"for_struct":13,"RW_BREAK":14,"RW_CONTINUE":15,"RW_RETURN":16,"expression":17,"call_func_mth":18,"declare_function":19,"declare_method":20,"declare_var":21,"set_var":22,"encapsulated":23,"cast":24,"print":25,"RW_CREATE":26,"RW_TABLE":27,"TK_ID":28,"TK_LPAR":29,"typed_arguments":30,"TK_RPAR":31,"RW_ALTER":32,"alter_actions":33,"RW_DROP":34,"RW_INSERT":35,"RW_INTO":36,"arguments":37,"RW_VALUES":38,"value_arguments":39,"select_stmt":40,"RW_UPDATE":41,"RW_SET":42,"set_arguments":43,"RW_WHERE":44,"where_cond":45,"RW_TRUNCATE":46,"RW_DELETE":47,"RW_FROM":48,"RW_ADD":49,"type":50,"RW_COLUMN":51,"RW_RENAME":52,"RW_TO":53,"RW_SELECT":54,"select_arguments":55,"RW_AS":56,"TK_STAR":57,"TK_COMA":58,"TK_EQ":59,"typed_var_arguments":60,"TK_VAR":61,"RW_INT":62,"RW_VARCHAR":63,"RW_DOUBLE":64,"RW_DATE":65,"RW_BOOLEAN":66,"RW_NULL":67,"RW_IF":68,"RW_THEN":69,"env":70,"RW_ELSE":71,"RW_END":72,"RW_BEGIN":73,"searched_case":74,"simple_case":75,"RW_CASE":76,"simple_case_cases":77,"primitive":78,"RW_WHEN":79,"searched_case_cases":80,"RW_WHILE":81,"RW_FOR":82,"RW_IN":83,"TK_INT":84,"TK_DOT":85,"RW_LOOP":86,"RW_FUNCTION":87,"RW_RETURNS":88,"RW_PROCEDURE":89,"RW_DECLARE":90,"RW_DEFAULT":91,"logic":92,"relational":93,"arithmetic":94,"TK_GEQ":95,"TK_LEQ":96,"TK_GREATER":97,"TK_LESS":98,"TK_NOTEQ":99,"RW_AND":100,"RW_OR":101,"RW_NOT":102,"TK_DOUBLE":103,"TK_DATE":104,"TK_VARCHAR":105,"RW_TRUE":106,"RW_FALSE":107,"TK_PLUS":108,"TK_MINUS":109,"TK_DIV":110,"TK_MOD":111,"RW_CAST":112,"RW_PRINT":113,"$accept":0,"$end":1};
    terminals_: TerminalsType = {2:"error",5:"EOF",7:"TK_SCOLON",14:"RW_BREAK",15:"RW_CONTINUE",16:"RW_RETURN",26:"RW_CREATE",27:"RW_TABLE",28:"TK_ID",29:"TK_LPAR",31:"TK_RPAR",32:"RW_ALTER",34:"RW_DROP",35:"RW_INSERT",36:"RW_INTO",38:"RW_VALUES",41:"RW_UPDATE",42:"RW_SET",44:"RW_WHERE",46:"RW_TRUNCATE",47:"RW_DELETE",48:"RW_FROM",49:"RW_ADD",51:"RW_COLUMN",52:"RW_RENAME",53:"RW_TO",54:"RW_SELECT",56:"RW_AS",57:"TK_STAR",58:"TK_COMA",59:"TK_EQ",61:"TK_VAR",62:"RW_INT",63:"RW_VARCHAR",64:"RW_DOUBLE",65:"RW_DATE",66:"RW_BOOLEAN",67:"RW_NULL",68:"RW_IF",69:"RW_THEN",71:"RW_ELSE",72:"RW_END",73:"RW_BEGIN",76:"RW_CASE",79:"RW_WHEN",81:"RW_WHILE",82:"RW_FOR",83:"RW_IN",84:"TK_INT",85:"TK_DOT",86:"RW_LOOP",87:"RW_FUNCTION",88:"RW_RETURNS",89:"RW_PROCEDURE",90:"RW_DECLARE",91:"RW_DEFAULT",95:"TK_GEQ",96:"TK_LEQ",97:"TK_GREATER",98:"TK_LESS",99:"TK_NOTEQ",100:"RW_AND",101:"RW_OR",102:"RW_NOT",103:"TK_DOUBLE",104:"TK_DATE",105:"TK_VARCHAR",106:"RW_TRUE",107:"RW_FALSE",108:"TK_PLUS",109:"TK_MINUS",110:"TK_DIV",111:"TK_MOD",112:"RW_CAST",113:"RW_PRINT"};
    productions_: ProductionsType = [0,[3,2],[3,1],[4,3],[4,2],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,2],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[8,6],[8,4],[8,3],[9,10],[9,1],[9,6],[9,3],[9,5],[33,3],[33,3],[33,3],[33,5],[40,4],[40,6],[40,4],[40,2],[45,1],[55,1],[55,1],[43,5],[43,3],[39,3],[39,1],[37,3],[37,1],[30,4],[30,2],[60,4],[60,2],[50,1],[50,1],[50,1],[50,1],[50,1],[50,1],[10,8],[10,7],[11,1],[11,1],[75,6],[75,8],[77,5],[77,4],[74,5],[74,7],[80,5],[80,4],[12,5],[13,11],[23,3],[19,11],[20,8],[20,7],[21,2],[21,5],[22,4],[70,1],[70,0],[17,1],[17,1],[17,1],[17,1],[17,1],[17,1],[17,1],[17,1],[17,3],[17,3],[93,3],[93,3],[93,3],[93,3],[93,3],[93,3],[92,3],[92,3],[92,2],[78,1],[78,1],[78,1],[78,1],[78,1],[78,1],[78,1],[94,3],[94,3],[94,3],[94,3],[94,3],[94,2],[18,4],[18,3],[24,6],[25,2]];
    table: Array<StateType>;
    defaultActions: {[key:number]: any} = {3:[2,2],5:[2,5],6:[2,6],7:[2,7],8:[2,8],9:[2,9],10:[2,10],11:[2,11],12:[2,12],14:[2,15],15:[2,16],16:[2,17],17:[2,18],18:[2,19],19:[2,20],20:[2,21],21:[2,22],22:[2,23],27:[2,28],32:[2,61],33:[2,62],44:[2,1],88:[2,41],115:[2,26],118:[2,30],135:[2,73],165:[2,25],206:[2,31],210:[2,71],222:[2,24],228:[2,32],229:[2,33],230:[2,34],234:[2,29],250:[2,76],256:[2,60],258:[2,68],263:[2,75],264:[2,35],267:[2,59],269:[2,64],274:[2,27],276:[2,74],277:[2,72]};

    constructor (yy = {}, lexer = new QCrypterLexer(yy)) {
      super(yy, lexer);

      // shorten static method to just `o` for terse STATE_TABLE
      const $V0=[1,22],$V1=[1,11],$V2=[1,12],$V3=[1,13],$V4=[1,23],$V5=[1,36],$V6=[1,24],$V7=[1,25],$V8=[1,26],$V9=[1,28],$Va=[1,38],$Vb=[1,29],$Vc=[1,30],$Vd=[1,42],$Ve=[1,31],$Vf=[1,39],$Vg=[1,43],$Vh=[1,34],$Vi=[1,35],$Vj=[1,37],$Vk=[1,40],$Vl=[1,41],$Vm=[1,55],$Vn=[1,56],$Vo=[1,54],$Vp=[1,64],$Vq=[1,58],$Vr=[1,57],$Vs=[1,59],$Vt=[1,60],$Vu=[1,61],$Vv=[1,62],$Vw=[1,63],$Vx=[1,65],$Vy=[1,78],$Vz=[2,81],$VA=[2,5,14,15,16,26,28,32,34,35,41,42,46,47,54,68,71,72,73,76,81,82,90,112,113],$VB=[1,105],$VC=[1,96],$VD=[1,97],$VE=[1,98],$VF=[1,99],$VG=[1,100],$VH=[1,101],$VI=[1,94],$VJ=[1,95],$VK=[1,102],$VL=[1,103],$VM=[1,104],$VN=[1,106],$VO=[7,31,44,48,56,57,58,59,69,73,79,95,96,97,98,99,100,101,108,109,110,111],$VP=[7,31,44,48,56,57,58,59,69,71,72,73,79,95,96,97,98,99,100,101,108,109,110,111],$VQ=[1,126],$VR=[1,128],$VS=[1,129],$VT=[1,130],$VU=[1,131],$VV=[1,132],$VW=[1,133],$VX=[7,31],$VY=[2,46],$VZ=[1,139],$V_=[7,31,44,48,56,58,69,73,79,100,101],$V$=[1,164],$V01=[31,58],$V11=[2,52],$V21=[7,31,56,58,73,91],$V31=[2,73],$V41=[7,31,44,48,56,58,59,69,73,79,99,100,101],$V51=[7,31,44,48,56,58,59,69,73,79,95,96,97,98,99,100,101],$V61=[7,31,44,48,56,58,59,69,73,79,95,96,97,98,99,100,101,108,109],$V71=[71,79],$V81=[44,58];
      const o = JisonParser.expandParseTable;
      this.table = [{2:$V0,3:1,4:2,5:[1,3],6:4,8:5,9:6,10:7,11:8,12:9,13:10,14:$V1,15:$V2,16:$V3,18:14,19:15,20:16,21:17,22:18,23:19,24:20,25:21,26:$V4,28:$V5,32:$V6,34:$V7,35:$V8,40:27,41:$V9,42:$Va,46:$Vb,47:$Vc,54:$Vd,68:$Ve,73:$Vf,74:32,75:33,76:$Vg,81:$Vh,82:$Vi,90:$Vj,112:$Vk,113:$Vl},{1:[3]},{2:$V0,5:[1,44],6:45,8:5,9:6,10:7,11:8,12:9,13:10,14:$V1,15:$V2,16:$V3,18:14,19:15,20:16,21:17,22:18,23:19,24:20,25:21,26:$V4,28:$V5,32:$V6,34:$V7,35:$V8,40:27,41:$V9,42:$Va,46:$Vb,47:$Vc,54:$Vd,68:$Ve,73:$Vf,74:32,75:33,76:$Vg,81:$Vh,82:$Vi,90:$Vj,112:$Vk,113:$Vl},{1:[2,2]},{7:[1,46]},{7:[2,5]},{7:[2,6]},{7:[2,7]},{7:[2,8]},{7:[2,9]},{7:[2,10]},{7:[2,11]},{7:[2,12]},{7:[2,14],17:47,18:52,24:53,28:$Vm,29:$Vn,61:$Vo,67:$Vp,78:50,84:$Vq,92:48,93:49,94:51,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,112:$Vk},{7:[2,15]},{7:[2,16]},{7:[2,17]},{7:[2,18]},{7:[2,19]},{7:[2,20]},{7:[2,21]},{7:[2,22]},{7:[2,23]},{27:[1,66],87:[1,67],89:[1,68]},{27:[1,69]},{27:[1,70]},{36:[1,71]},{7:[2,28]},{28:[1,72]},{27:[1,73]},{48:[1,74]},{17:75,18:52,24:53,28:$Vm,29:$Vn,61:$Vo,67:$Vp,78:50,84:$Vq,92:48,93:49,94:51,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,112:$Vk},{7:[2,61]},{7:[2,62]},{17:76,18:52,24:53,28:$Vm,29:$Vn,61:$Vo,67:$Vp,78:50,84:$Vq,92:48,93:49,94:51,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,112:$Vk},{61:[1,77]},{29:$Vy},{60:79,61:[1,80]},{61:[1,81]},{2:$V0,4:83,6:4,8:5,9:6,10:7,11:8,12:9,13:10,14:$V1,15:$V2,16:$V3,18:14,19:15,20:16,21:17,22:18,23:19,24:20,25:21,26:$V4,28:$V5,32:$V6,34:$V7,35:$V8,40:27,41:$V9,42:$Va,46:$Vb,47:$Vc,54:$Vd,68:$Ve,70:82,72:$Vz,73:$Vf,74:32,75:33,76:$Vg,81:$Vh,82:$Vi,90:$Vj,112:$Vk,113:$Vl},{29:[1,84]},{17:85,18:52,24:53,28:$Vm,29:$Vn,61:$Vo,67:$Vp,78:50,84:$Vq,92:48,93:49,94:51,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,112:$Vk},{17:87,18:52,24:53,28:$Vm,29:$Vn,39:89,55:86,57:[1,88],61:$Vo,67:$Vp,78:50,84:$Vq,92:48,93:49,94:51,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,112:$Vk},{17:91,18:52,24:53,28:$Vm,29:$Vn,61:$Vo,67:$Vp,78:50,79:[1,92],80:90,84:$Vq,92:48,93:49,94:51,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,112:$Vk},{1:[2,1]},{7:[1,93]},o($VA,[2,4]),{7:[2,13],57:$VB,59:$VC,95:$VD,96:$VE,97:$VF,98:$VG,99:$VH,100:$VI,101:$VJ,108:$VK,109:$VL,110:$VM,111:$VN},o($VO,[2,82]),o($VO,[2,83]),o($VO,[2,84]),o($VO,[2,85]),o($VO,[2,86]),o($VO,[2,87]),o($VO,[2,88]),o($VO,[2,89],{29:$Vy}),{17:107,18:52,24:53,28:$Vm,29:$Vn,40:108,54:$Vd,61:$Vo,67:$Vp,78:50,84:$Vq,92:48,93:49,94:51,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,112:$Vk},{17:109,18:52,24:53,28:$Vm,29:$Vn,61:$Vo,67:$Vp,78:50,84:$Vq,92:48,93:49,94:51,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,112:$Vk},o($VP,[2,101]),o($VP,[2,102]),o($VP,[2,103]),o($VP,[2,104]),o($VP,[2,105]),o($VP,[2,106]),o($VP,[2,107]),{17:110,18:52,24:53,28:$Vm,29:$Vn,61:$Vo,67:$Vp,78:50,84:$Vq,92:48,93:49,94:51,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,112:$Vk},{28:[1,111]},{28:[1,112]},{28:[1,113]},{28:[1,114]},{28:[1,115]},{28:[1,116]},{42:[1,117]},{28:[1,118]},{28:[1,119]},{57:$VB,59:$VC,69:[1,120],95:$VD,96:$VE,97:$VF,98:$VG,99:$VH,100:$VI,101:$VJ,108:$VK,109:$VL,110:$VM,111:$VN},{57:$VB,59:$VC,73:[1,121],95:$VD,96:$VE,97:$VF,98:$VG,99:$VH,100:$VI,101:$VJ,108:$VK,109:$VL,110:$VM,111:$VN},{83:[1,122]},{17:125,18:52,24:53,28:$Vm,29:$Vn,31:[1,124],39:123,61:$Vo,67:$Vp,78:50,84:$Vq,92:48,93:49,94:51,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,112:$Vk},{7:[2,77],58:$VQ},{50:127,62:$VR,63:$VS,64:$VT,65:$VU,66:$VV,67:$VW},{59:[1,134]},{72:[1,135]},o([71,72],[2,80],{8:5,9:6,10:7,11:8,12:9,13:10,18:14,19:15,20:16,21:17,22:18,23:19,24:20,25:21,40:27,74:32,75:33,6:45,2:$V0,14:$V1,15:$V2,16:$V3,26:$V4,28:$V5,32:$V6,34:$V7,35:$V8,41:$V9,42:$Va,46:$Vb,47:$Vc,54:$Vd,68:$Ve,73:$Vf,76:$Vg,81:$Vh,82:$Vi,90:$Vj,112:$Vk,113:$Vl}),{17:136,18:52,24:53,28:$Vm,29:$Vn,61:$Vo,67:$Vp,78:50,84:$Vq,92:48,93:49,94:51,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,112:$Vk},{7:[2,117],57:$VB,59:$VC,95:$VD,96:$VE,97:$VF,98:$VG,99:$VH,100:$VI,101:$VJ,108:$VK,109:$VL,110:$VM,111:$VN},{48:[1,137]},o($VX,[2,39],{48:$VY,58:$VY,56:[1,138],57:$VB,59:$VC,95:$VD,96:$VE,97:$VF,98:$VG,99:$VH,100:$VI,101:$VJ,108:$VK,109:$VL,110:$VM,111:$VN}),{48:[2,41]},{48:[2,42],58:$VZ},{71:[1,140],79:[1,141]},{57:$VB,59:$VC,77:142,79:[1,143],95:$VD,96:$VE,97:$VF,98:$VG,99:$VH,100:$VI,101:$VJ,108:$VK,109:$VL,110:$VM,111:$VN},{17:144,18:52,24:53,28:$Vm,29:$Vn,61:$Vo,67:$Vp,78:50,84:$Vq,92:48,93:49,94:51,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,112:$Vk},o($VA,[2,3]),{17:145,18:52,24:53,28:$Vm,29:$Vn,61:$Vo,67:$Vp,78:50,84:$Vq,92:48,93:49,94:51,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,112:$Vk},{17:146,18:52,24:53,28:$Vm,29:$Vn,61:$Vo,67:$Vp,78:50,84:$Vq,92:48,93:49,94:51,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,112:$Vk},{17:147,18:52,24:53,28:$Vm,29:$Vn,61:$Vo,67:$Vp,78:50,84:$Vq,92:48,93:49,94:51,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,112:$Vk},{17:148,18:52,24:53,28:$Vm,29:$Vn,61:$Vo,67:$Vp,78:50,84:$Vq,92:48,93:49,94:51,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,112:$Vk},{17:149,18:52,24:53,28:$Vm,29:$Vn,61:$Vo,67:$Vp,78:50,84:$Vq,92:48,93:49,94:51,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,112:$Vk},{17:150,18:52,24:53,28:$Vm,29:$Vn,61:$Vo,67:$Vp,78:50,84:$Vq,92:48,93:49,94:51,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,112:$Vk},{17:151,18:52,24:53,28:$Vm,29:$Vn,61:$Vo,67:$Vp,78:50,84:$Vq,92:48,93:49,94:51,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,112:$Vk},{17:152,18:52,24:53,28:$Vm,29:$Vn,61:$Vo,67:$Vp,78:50,84:$Vq,92:48,93:49,94:51,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,112:$Vk},{17:153,18:52,24:53,28:$Vm,29:$Vn,61:$Vo,67:$Vp,78:50,84:$Vq,92:48,93:49,94:51,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,112:$Vk},{17:154,18:52,24:53,28:$Vm,29:$Vn,61:$Vo,67:$Vp,78:50,84:$Vq,92:48,93:49,94:51,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,112:$Vk},{17:155,18:52,24:53,28:$Vm,29:$Vn,61:$Vo,67:$Vp,78:50,84:$Vq,92:48,93:49,94:51,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,112:$Vk},{17:156,18:52,24:53,28:$Vm,29:$Vn,61:$Vo,67:$Vp,78:50,84:$Vq,92:48,93:49,94:51,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,112:$Vk},{17:157,18:52,24:53,28:$Vm,29:$Vn,61:$Vo,67:$Vp,78:50,84:$Vq,92:48,93:49,94:51,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,112:$Vk},{31:[1,158],57:$VB,59:$VC,95:$VD,96:$VE,97:$VF,98:$VG,99:$VH,100:$VI,101:$VJ,108:$VK,109:$VL,110:$VM,111:$VN},{31:[1,159]},o($V_,[2,100],{57:$VB,59:$VC,95:$VD,96:$VE,97:$VF,98:$VG,99:$VH,108:$VK,109:$VL,110:$VM,111:$VN}),o($VO,[2,113]),{29:[1,160]},{29:[1,161]},{56:[1,163],60:162,61:$V$},{33:165,34:[1,167],49:[1,166],52:[1,168]},{7:[2,26]},{29:[1,169]},{28:[1,171],43:170},{7:[2,30]},{44:[1,172]},{2:$V0,4:83,6:4,8:5,9:6,10:7,11:8,12:9,13:10,14:$V1,15:$V2,16:$V3,18:14,19:15,20:16,21:17,22:18,23:19,24:20,25:21,26:$V4,28:$V5,32:$V6,34:$V7,35:$V8,40:27,41:$V9,42:$Va,46:$Vb,47:$Vc,54:$Vd,68:$Ve,70:173,71:$Vz,73:[1,174],74:32,75:33,76:$Vg,81:$Vh,82:$Vi,90:$Vj,112:$Vk,113:$Vl},{2:$V0,4:83,6:4,8:5,9:6,10:7,11:8,12:9,13:10,14:$V1,15:$V2,16:$V3,18:14,19:15,20:16,21:17,22:18,23:19,24:20,25:21,26:$V4,28:$V5,32:$V6,34:$V7,35:$V8,40:27,41:$V9,42:$Va,46:$Vb,47:$Vc,54:$Vd,68:$Ve,70:175,72:$Vz,73:$Vf,74:32,75:33,76:$Vg,81:$Vh,82:$Vi,90:$Vj,112:$Vk,113:$Vl},{84:[1,176]},{31:[1,177],58:$VZ},o($VO,[2,115]),o($V01,$VY,{57:$VB,59:$VC,95:$VD,96:$VE,97:$VF,98:$VG,99:$VH,100:$VI,101:$VJ,108:$VK,109:$VL,110:$VM,111:$VN}),{61:[1,178]},o([7,58],$V11,{91:[1,179]}),o($V21,[2,53]),o($V21,[2,54]),o($V21,[2,55]),o($V21,[2,56]),o($V21,[2,57]),o($V21,[2,58]),{17:180,18:52,24:53,28:$Vm,29:$Vn,61:$Vo,67:$Vp,78:50,84:$Vq,92:48,93:49,94:51,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,112:$Vk},{7:$V31},{56:[1,181],57:$VB,59:$VC,95:$VD,96:$VE,97:$VF,98:$VG,99:$VH,100:$VI,101:$VJ,108:$VK,109:$VL,110:$VM,111:$VN},{28:[1,182]},{28:[1,183]},{17:184,18:52,24:53,28:$Vm,29:$Vn,61:$Vo,67:$Vp,78:50,84:$Vq,92:48,93:49,94:51,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,112:$Vk},{67:$Vp,78:185,84:$Vq,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw},{17:186,18:52,24:53,28:$Vm,29:$Vn,61:$Vo,67:$Vp,78:50,84:$Vq,92:48,93:49,94:51,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,112:$Vk},{71:[1,187],79:[1,188]},{67:$Vp,78:189,84:$Vq,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw},{57:$VB,59:$VC,69:[1,190],95:$VD,96:$VE,97:$VF,98:$VG,99:$VH,100:$VI,101:$VJ,108:$VK,109:$VL,110:$VM,111:$VN},o($V_,[2,98],{57:$VB,59:$VC,95:$VD,96:$VE,97:$VF,98:$VG,99:$VH,108:$VK,109:$VL,110:$VM,111:$VN}),o([7,31,44,48,56,58,69,73,79,101],[2,99],{57:$VB,59:$VC,95:$VD,96:$VE,97:$VF,98:$VG,99:$VH,100:$VI,108:$VK,109:$VL,110:$VM,111:$VN}),o($V41,[2,92],{57:$VB,95:$VD,96:$VE,97:$VF,98:$VG,108:$VK,109:$VL,110:$VM,111:$VN}),o($V51,[2,93],{57:$VB,108:$VK,109:$VL,110:$VM,111:$VN}),o($V51,[2,94],{57:$VB,108:$VK,109:$VL,110:$VM,111:$VN}),o($V51,[2,95],{57:$VB,108:$VK,109:$VL,110:$VM,111:$VN}),o($V51,[2,96],{57:$VB,108:$VK,109:$VL,110:$VM,111:$VN}),o($V41,[2,97],{57:$VB,95:$VD,96:$VE,97:$VF,98:$VG,108:$VK,109:$VL,110:$VM,111:$VN}),o($V61,[2,108],{57:$VB,110:$VM,111:$VN}),o($V61,[2,109],{57:$VB,110:$VM,111:$VN}),o($VO,[2,110]),o($VO,[2,111]),o($VO,[2,112]),o($VO,[2,90]),o($VO,[2,91]),{28:[1,192],30:191},{60:193,61:$V$},{56:[1,194],58:$VQ},{73:[1,195]},{50:196,62:$VR,63:$VS,64:$VT,65:$VU,66:$VV,67:$VW},{7:[2,25]},{28:[1,197]},{51:[1,198]},{51:[1,200],53:[1,199]},{28:[1,202],37:201},{44:[1,203],58:[1,204]},{59:[1,205]},{17:207,18:52,24:53,28:$Vm,29:$Vn,45:206,61:$Vo,67:$Vp,78:50,84:$Vq,92:48,93:49,94:51,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,112:$Vk},{71:[1,208]},{2:$V0,4:83,6:4,8:5,9:6,10:7,11:8,12:9,13:10,14:$V1,15:$V2,16:$V3,18:14,19:15,20:16,21:17,22:18,23:19,24:20,25:21,26:$V4,28:$V5,32:$V6,34:$V7,35:$V8,40:27,41:$V9,42:$Va,46:$Vb,47:$Vc,54:$Vd,68:$Ve,70:209,72:$Vz,73:$Vf,74:32,75:33,76:$Vg,81:$Vh,82:$Vi,90:$Vj,112:$Vk,113:$Vl},{72:[1,210]},{85:[1,211]},o($VO,[2,114]),{50:212,62:$VR,63:$VS,64:$VT,65:$VU,66:$VV,67:$VW},{17:213,18:52,24:53,28:$Vm,29:$Vn,61:$Vo,67:$Vp,78:50,84:$Vq,92:48,93:49,94:51,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,112:$Vk},{7:[2,79],57:$VB,59:$VC,95:$VD,96:$VE,97:$VF,98:$VG,99:$VH,100:$VI,101:$VJ,108:$VK,109:$VL,110:$VM,111:$VN},{50:214,62:$VR,63:$VS,64:$VT,65:$VU,66:$VV,67:$VW},o($VX,[2,36],{44:[1,215]}),o($VX,[2,38]),o([31,48,58],[2,45],{57:$VB,59:$VC,95:$VD,96:$VE,97:$VF,98:$VG,99:$VH,100:$VI,101:$VJ,108:$VK,109:$VL,110:$VM,111:$VN}),{72:[1,216]},{57:$VB,59:$VC,69:[1,217],95:$VD,96:$VE,97:$VF,98:$VG,99:$VH,100:$VI,101:$VJ,108:$VK,109:$VL,110:$VM,111:$VN},{67:$Vp,78:218,84:$Vq,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw},{67:$Vp,78:219,84:$Vq,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw},{69:[1,220]},{67:$Vp,78:221,84:$Vq,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw},{31:[1,222],58:[1,223]},{50:224,62:$VR,63:$VS,64:$VT,65:$VU,66:$VV,67:$VW},{31:[1,225],58:$VQ},{73:[1,226]},{2:$V0,4:83,6:4,8:5,9:6,10:7,11:8,12:9,13:10,14:$V1,15:$V2,16:$V3,18:14,19:15,20:16,21:17,22:18,23:19,24:20,25:21,26:$V4,28:$V5,32:$V6,34:$V7,35:$V8,40:27,41:$V9,42:$Va,46:$Vb,47:$Vc,54:$Vd,68:$Ve,70:227,72:$Vz,73:$Vf,74:32,75:33,76:$Vg,81:$Vh,82:$Vi,90:$Vj,112:$Vk,113:$Vl},o([31,56,58],$V11),{50:228,62:$VR,63:$VS,64:$VT,65:$VU,66:$VV,67:$VW},{28:[1,229]},{28:[1,230]},{28:[1,231]},{31:[1,232],58:[1,233]},o($V01,[2,48]),{17:207,18:52,24:53,28:$Vm,29:$Vn,45:234,61:$Vo,67:$Vp,78:50,84:$Vq,92:48,93:49,94:51,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,112:$Vk},{28:[1,235]},{17:236,18:52,24:53,28:$Vm,29:$Vn,61:$Vo,67:$Vp,78:50,84:$Vq,92:48,93:49,94:51,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,112:$Vk},{7:[2,31]},o($VX,[2,40],{57:$VB,59:$VC,95:$VD,96:$VE,97:$VF,98:$VG,99:$VH,100:$VI,101:$VJ,108:$VK,109:$VL,110:$VM,111:$VN}),{2:$V0,4:83,6:4,8:5,9:6,10:7,11:8,12:9,13:10,14:$V1,15:$V2,16:$V3,18:14,19:15,20:16,21:17,22:18,23:19,24:20,25:21,26:$V4,28:$V5,32:$V6,34:$V7,35:$V8,40:27,41:$V9,42:$Va,46:$Vb,47:$Vc,54:$Vd,68:$Ve,70:237,72:$Vz,73:$Vf,74:32,75:33,76:$Vg,81:$Vh,82:$Vi,90:$Vj,112:$Vk,113:$Vl},{72:[1,238]},{7:[2,71]},{85:[1,239]},o([7,31,56,58],[2,51]),{7:[2,78],57:$VB,59:$VC,95:$VD,96:$VE,97:$VF,98:$VG,99:$VH,100:$VI,101:$VJ,108:$VK,109:$VL,110:$VM,111:$VN},{31:[1,240]},{17:207,18:52,24:53,28:$Vm,29:$Vn,45:241,61:$Vo,67:$Vp,78:50,84:$Vq,92:48,93:49,94:51,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,112:$Vk},{7:[2,67],56:[1,242]},{67:$Vp,78:243,84:$Vq,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw},{72:[1,244]},{69:[1,245]},{67:$Vp,78:246,84:$Vq,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw},o($V71,[2,70]),{7:[2,24]},{28:[1,247]},o($V01,[2,50]),{88:[1,248]},{2:$V0,4:83,6:4,8:5,9:6,10:7,11:8,12:9,13:10,14:$V1,15:$V2,16:$V3,18:14,19:15,20:16,21:17,22:18,23:19,24:20,25:21,26:$V4,28:$V5,32:$V6,34:$V7,35:$V8,40:27,41:$V9,42:$Va,46:$Vb,47:$Vc,54:$Vd,68:$Ve,70:249,72:$Vz,73:$Vf,74:32,75:33,76:$Vg,81:$Vh,82:$Vi,90:$Vj,112:$Vk,113:$Vl},{72:[1,250]},{7:[2,32]},{7:[2,33]},{7:[2,34]},{53:[1,251]},{38:[1,252]},{28:[1,253]},{7:[2,29]},{59:[1,254]},o($V81,[2,44],{57:$VB,59:$VC,95:$VD,96:$VE,97:$VF,98:$VG,99:$VH,100:$VI,101:$VJ,108:$VK,109:$VL,110:$VM,111:$VN}),{72:[1,255]},{7:$V31,68:[1,256]},{84:[1,257]},o($VO,[2,116]),o($VX,[2,37]),{61:[1,258]},o($V71,[2,69]),{7:[2,63],56:[1,259]},{67:$Vp,78:260,84:$Vq,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw},o($V71,[2,66]),{50:261,62:$VR,63:$VS,64:$VT,65:$VU,66:$VV,67:$VW},{50:262,62:$VR,63:$VS,64:$VT,65:$VU,66:$VV,67:$VW},{72:[1,263]},{7:[2,76]},{28:[1,264]},{29:[1,265]},o($V01,[2,47]),{17:266,18:52,24:53,28:$Vm,29:$Vn,61:$Vo,67:$Vp,78:50,84:$Vq,92:48,93:49,94:51,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,112:$Vk},{68:[1,267]},{7:[2,60]},{73:[1,268]},{7:[2,68]},{61:[1,269]},o($V71,[2,65]),o($V01,[2,49]),{73:[1,270]},{7:[2,75]},{7:[2,35]},{17:125,18:52,24:53,28:$Vm,29:$Vn,39:271,61:$Vo,67:$Vp,78:50,84:$Vq,92:48,93:49,94:51,102:$Vr,103:$Vs,104:$Vt,105:$Vu,106:$Vv,107:$Vw,109:$Vx,112:$Vk},o($V81,[2,43],{57:$VB,59:$VC,95:$VD,96:$VE,97:$VF,98:$VG,99:$VH,100:$VI,101:$VJ,108:$VK,109:$VL,110:$VM,111:$VN}),{7:[2,59]},{2:$V0,4:83,6:4,8:5,9:6,10:7,11:8,12:9,13:10,14:$V1,15:$V2,16:$V3,18:14,19:15,20:16,21:17,22:18,23:19,24:20,25:21,26:$V4,28:$V5,32:$V6,34:$V7,35:$V8,40:27,41:$V9,42:$Va,46:$Vb,47:$Vc,54:$Vd,68:$Ve,70:272,72:$Vz,73:$Vf,74:32,75:33,76:$Vg,81:$Vh,82:$Vi,90:$Vj,112:$Vk,113:$Vl},{7:[2,64]},{2:$V0,4:83,6:4,8:5,9:6,10:7,11:8,12:9,13:10,14:$V1,15:$V2,16:$V3,18:14,19:15,20:16,21:17,22:18,23:19,24:20,25:21,26:$V4,28:$V5,32:$V6,34:$V7,35:$V8,40:27,41:$V9,42:$Va,46:$Vb,47:$Vc,54:$Vd,68:$Ve,70:273,72:$Vz,73:$Vf,74:32,75:33,76:$Vg,81:$Vh,82:$Vi,90:$Vj,112:$Vk,113:$Vl},{31:[1,274],58:$VZ},{72:[1,275]},{72:[1,276]},{7:[2,27]},{86:[1,277]},{7:[2,74]},{7:[2,72]}];
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
case 5: case 6: case 7: case 8: case 9: case 10: case 15: case 16: case 17: case 18: case 19: case 20: case 21: case 22: case 28: case 42: case 61: case 62: case 82: case 83: case 84: case 85: case 86: case 87:
 this.$ = $$[$0]; 
break;
case 11:
 this.$ = new Break(_$[$0].first_line, _$[$0].first_column); 
break;
case 12:
 this.$ = new Continue(_$[$0].first_line, _$[$0].first_column); 
break;
case 13:
 this.$ = new Return($$[$0], _$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 14:
 this.$ = new Return(undefined, _$[$0].first_line, _$[$0].first_column); 
break;
case 23:
 
        let err = new SynError(_$[$0].first_line, _$[$0].first_column, "Syntax", $$[$0])
        synErrors.push(err);
        err.print();
    
break;
case 24:
 this.$ = new Create($$[$0-3], $$[$0-1], _$[$0-5].first_line, _$[$0-5].first_column); 
break;
case 25:
 this.$ = new Alter($$[$0-1], $$[$0], _$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 26:
 this.$ = new Drop($$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 27:
 this.$ = new Insert($$[$0-7], $$[$0-5], $$[$0-1], _$[$0-9].first_line, _$[$0-9].first_column); 
break;
case 29:
 this.$ = new Update($$[$0-4], $$[$0-2], $$[$0] ,_$[$0-5].first_line, _$[$0-5].first_column); 
break;
case 30:
 this.$ = new Truncate($$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 31:
 this.$ = new Delete($$[$0-2], $$[$0], _$[$0-4].first_line, _$[$0-4].first_column); 
break;
case 32:
 this.$ = {type: AlterActions.ADD, col: $$[$0-1], colType: $$[$0]}; 
break;
case 33:
 this.$ = {type: AlterActions.DROP, col: $$[$0]}; 
break;
case 34:
 this.$ = {type: AlterActions.RENAMETABLE, newId: $$[$0]}; 
break;
case 35:
 this.$ = {type: AlterActions.RENAMECOL, col: $$[$0-2], newId: $$[$0]}; 
break;
case 36:
 this.$ = new SelectTable($$[$0-2], $$[$0], undefined, _$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 37:
 this.$ = new SelectTable($$[$0-4], $$[$0-2], $$[$0], _$[$0-5].first_line, _$[$0-5].first_column); 
break;
case 38:
 this.$ = new SelectExpr($$[$0-2], $$[$0], _$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 39:
 this.$ = new SelectExpr($$[$0], undefined, _$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 40:
 this.$ = new WherePredicate($$[$0], _$[$0].first_line, _$[$0].first_column); 
break;
case 41:
 this.$ = [new PrimitiveVar($$[$0], Primitive.VARCHAR, _$[$0].first_column, _$[$0].first_line)]; 
break;
case 43:
 $$[$0-4].push({col: $$[$0-2], val: $$[$0]}); this.$ = $$[$0-4]; 
break;
case 44:
 this.$ = [{col: $$[$0-2], val: $$[$0]}]; 
break;
case 45: case 47:
 $$[$0-2].push($$[$0]); this.$ = $$[$0-2]; 
break;
case 46: case 48:
 this.$ = [$$[$0]]; 
break;
case 49: case 51:
 $$[$0-3].push({id: $$[$0-1], type: $$[$0]}); this.$ = $$[$0-3]; 
break;
case 50:
 this.$ = [{id: $$[$0-1], type: $$[$0]}]; 
break;
case 52:
 this.$ = [{id: $$[$0-1], type: $$[$0]}];
break;
case 53:
 this.$ = Primitive.INT; 
break;
case 54:
 this.$ = Primitive.VARCHAR; 
break;
case 55:
 this.$ = Primitive.DOUBLE; 
break;
case 56:
 this.$ = Primitive.DATE; 
break;
case 57:
 this.$ = Primitive.BOOLEAN; 
break;
case 58:
 this.$ = Primitive.NULL; 
break;
case 59:
 $$[$0-4].envName = "if_env";$$[$0-2].envName = "else_env";this.$ = new If($$[$0-6], $$[$0-4], $$[$0-2], _$[$0-7].first_line, _$[$0-7].first_column, "if_env"); 
break;
case 60:
 $$[$0-2].envName = "if_env";this.$ = new If($$[$0-5], $$[$0-2], undefined, _$[$0-6].first_line, _$[$0-6].first_column, "if_env"); 
break;
case 63:
 this.$ = new SimpleCase($$[$0-4], $$[$0-3], $$[$0-1], undefined,_$[$0-5].first_line, _$[$0-5].first_column); 
break;
case 64:
 this.$ = new SimpleCase($$[$0-6], $$[$0-5], $$[$0-3], $$[$0] ,_$[$0-7].first_line, _$[$0-7].first_column); 
break;
case 65: case 69:
 $$[$0-4].push({when: $$[$0-2], then: $$[$0]}); this.$ = $$[$0-4]; 
break;
case 66:
 this.$ = [{when: $$[$0-2], then: $$[$0]}];
break;
case 67:
 this.$ = new SearchedCase($$[$0-3], $$[$0-1], undefined, _$[$0-4].first_line, _$[$0-4].first_column); 
break;
case 68:
 this.$ = new SearchedCase($$[$0-5], $$[$0-3], $$[$0], _$[$0-6].first_line, _$[$0-6].first_column); 
break;
case 70:
 this.$ = [{when: $$[$0-2], then: $$[$0]}]; 
break;
case 71:
 this.$ = new While($$[$0-3], $$[$0-1], _$[$0-4].first_line, _$[$0-4].first_column); 
break;
case 72:
 $$[$0-2].envName = "for_env";this.$ = new For($$[$0-9], $$[$0-2], $$[$0-7], $$[$0-4], _$[$0-10].first_line, _$[$0-10].first_column); 
break;
case 73: case 90: case 91:
 this.$ = $$[$0-1]; 
break;
case 74:
 this.$ = new Function($$[$0-8], $$[$0-6], $$[$0-3], $$[$0-1], _$[$0-10].first_line, _$[$0-10].first_column); 
break;
case 75:
 this.$ = new Method($$[$0-5], $$[$0-4], $$[$0-1], _$[$0-7].first_line, _$[$0-7].first_column); 
break;
case 76:
 this.$ = new Method($$[$0-4], undefined, $$[$0-1], _$[$0-6].first_line, _$[$0-6].first_column); 
break;
case 77:
 this.$ = new Declaration($$[$0], undefined, _$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 78:
 this.$ = new Declaration([{id: $$[$0-3], type: $$[$0-2]}], $$[$0], _$[$0-4].first_line, _$[$0-4].first_column); 
break;
case 79:
 this.$ = new SetVar($$[$0-2], $$[$0], _$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 80:
 this.$ = new CodeBlock($$[$0], _$[$0].first_line, _$[$0].first_column); 
break;
case 81:
 this.$ = undefined; 
break;
case 88:
 this.$ = new CallVar($$[$0], _$[$0].first_line, _$[$0].first_column); 
break;
case 89:
 this.$ = new IdVar($$[$0], _$[$0].first_line, _$[$0].first_column); 
break;
case 92:
 this.$ = new Relational($$[$0-2], RelationalOperator.EQ, $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 93:
 this.$ = new Relational($$[$0-2], RelationalOperator.GEQ, $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 94:
 this.$ = new Relational($$[$0-2], RelationalOperator.LEQ, $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 95:
 this.$ = new Relational($$[$0-2], RelationalOperator.GREATER, $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 96:
 this.$ = new Relational($$[$0-2], RelationalOperator.LESS, $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 97:
 this.$ = new Relational($$[$0-2], RelationalOperator.NEQ, $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 98:
 this.$ = new Logical($$[$0-2], LogicalOperator.AND, $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 99:
 this.$ = new Logical($$[$0-2], LogicalOperator.OR, $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 100:
 this.$ = new Logical(undefined, LogicalOperator.NOT, $$[$0], _$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 101:
 this.$ = new PrimitiveVar($$[$0], Primitive.INT , _$[$0].first_line, _$[$0].first_column); 
break;
case 102:
 this.$ = new PrimitiveVar($$[$0], Primitive.DOUBLE , _$[$0].first_line, _$[$0].first_column); 
break;
case 103:
 this.$ = new PrimitiveVar($$[$0], Primitive.DATE , _$[$0].first_line, _$[$0].first_column); 
break;
case 104:
 this.$ = new PrimitiveVar($$[$0], Primitive.VARCHAR, _$[$0].first_line, _$[$0].first_column); 
break;
case 105:
 this.$ = new PrimitiveVar($$[$0], Primitive.BOOLEAN , _$[$0].first_line, _$[$0].first_column); 
break;
case 106:
 this.$ = new PrimitiveVar($$[$0], Primitive.BOOLEAN, _$[$0].first_line, _$[$0].first_column); 
break;
case 107:
 this.$ = new PrimitiveVar(null, Primitive.NULL, _$[$0].first_line, _$[$0].first_column); 
break;
case 108:
 this.$ = new Arithmetic($$[$0-2], ArithmeticOperator.PLUS, $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 109:
 this.$ = new Arithmetic($$[$0-2], ArithmeticOperator.MINUS, $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 110:
 this.$ = new Arithmetic($$[$0-2], ArithmeticOperator.DIV, $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 111:
 this.$ = new Arithmetic($$[$0-2], ArithmeticOperator.MULT, $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 112:
 this.$ = new Arithmetic($$[$0-2], ArithmeticOperator.MOD, $$[$0], _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 113:
 this.$ = new Arithmetic(undefined, ArithmeticOperator.UMINUS, $$[$0], _$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 114:
 this.$ = new CallFunc($$[$0-3], $$[$0-1], _$[$0-3].first_line, _$[$0-3].first_column); 
break;
case 115:
 this.$ = new CallFunc($$[$0-2], undefined, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 116:
 this.$ = new Cast($$[$0-3], $$[$0-1])
break;
case 117:
 this.$ = new Print($$[$0], _$[$0-1].first_line, _$[$0-1].first_column); 
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
        /^(?:[ \r\t]+\n)/i,
        /^(?:CREATE\b)/i,
        /^(?:ALTER\b)/i,
        /^(?:DROP\b)/i,
        /^(?:RENAME\b)/i,
        /^(?:INSERT\b)/i,
        /^(?:UPDATE\b)/i,
        /^(?:TRUNCATE )/i,
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
        /^(?:[']\d{4}-\d{1,2}-\d{1,2}['])/i,
        /^(?:@_*[a-zA-Z\xf1\xd1][a-zA-Z0-9\xf1\xd1\_]*)/i,
        /^(?:[0-9]+\.[0-9]+\b)/i,
        /^(?:[0-9]+\b)/i,
        /^(?:_*[a-zA-Z\xf1\xd1][a-zA-Z0-9\xf1\xd1\_]*)/i,
        /^(?:["])/i,
        /^(?:[^"\\]+)/i,
        /^(?:\\")/i,
        /^(?:\\n)/i,
        /^(?:\\t)/i,
        /^(?:\\\\)/i,
        /^(?:\\\\')/i,
        /^(?:["])/i,
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
    conditions: any = {"string":{"rules":[62,63,64,65,66,67,68],"inclusive":false},"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87],"inclusive":true}}
    performAction (yy:any,yy_:any,$avoiding_name_collisions:any,YY_START:any): any {
          var YYSTATE=YY_START;
        switch($avoiding_name_collisions) {
    case 0:// spaces ignored
      break;
    case 1:// comment inline
      break;
    case 2:// MultiLineComment
      break;
    case 3:return;
      break;
    case 4:return "RW_CREATE";
      break;
    case 5:return "RW_ALTER";
      break;
    case 6:return "RW_DROP";
      break;
    case 7:return "RW_RENAME";
      break;
    case 8:return "RW_INSERT";
      break;
    case 9:return "RW_UPDATE";
      break;
    case 10:return "RW_TRUNCATE";
      break;
    case 11:return "RW_DELETE";
      break;
    case 12:return "RW_SELECT";
      break;
    case 13:return "RW_FROM";
      break;
    case 14:return "RW_WHERE";
      break;
    case 15:return "RW_INTO";
      break;
    case 16:return "RW_VALUES";
      break;
    case 17:return "RW_ADD";
      break;
    case 18:return "RW_COLUMN";
      break;
    case 19:return "RW_RENAME";
      break;
    case 20:return "RW_TO";
      break;
    case 21:return "RW_TABLE";
      break;
    case 22:return "RW_INT";
      break;
    case 23:return "RW_DOUBLE";
      break;
    case 24:return "RW_DATE";
      break;
    case 25:return "RW_VARCHAR";
      break;
    case 26:return "RW_BOOLEAN";
      break;
    case 27:return "RW_TRUE";
      break;
    case 28:return "RW_FALSE";
      break;
    case 29:return "RW_NULL";
      break;
    case 30:return "RW_NOT"; 
      break;
    case 31:return "RW_AND";
      break;
    case 32:return "RW_OR";
      break;
    case 33:return "RW_BEGIN";
      break;
    case 34:return "RW_END";
      break;
    case 35:return "RW_DECLARE";
      break;
    case 36:return "RW_DEFAULT";
      break;
    case 37:return "RW_SET";
      break;
    case 38:return "RW_AS";
      break;
    case 39:return "RW_CAST";
      break;
    case 40:return "RW_PRINT";
      break;
    case 41:return "RW_IF";
      break;
    case 42:return "RW_THEN";
      break;
    case 43:return "RW_ELSE";
      break;
    case 44:return "RW_CASE";
      break;
    case 45:return "RW_WHEN";
      break;
    case 46:return "RW_WHILE";
      break;
    case 47:return "RW_FOR";
      break;
    case 48:return "RW_IN";
      break;
    case 49:return "RW_LOOP";
      break;
    case 50:return "RW_BREAK";
      break;
    case 51:return "RW_CONTINUE";
      break;
    case 52:return "RW_FUNCTION";
      break;
    case 53:return "RW_PROCEDURE";
      break;
    case 54:return "RW_RETURNS";
      break;
    case 55:return "RW_RETURN";
      break;
    case 56: yy_.yytext = yy_.yytext.substr(1, yy_.yytext.length -2); return "TK_DATE";
      break;
    case 57:return "TK_VAR";
      break;
    case 58:return "TK_DOUBLE";
      break;
    case 59:return "TK_INT";
      break;
    case 60:return "TK_ID";
      break;
    case 61:controlString=""; this.pushState("string");
      break;
    case 62:controlString+=yy_.yytext; 
      break;
    case 63:controlString+="\"";
      break;
    case 64:controlString+="\n";
      break;
    case 65:controlString+="\t";
      break;
    case 66:controlString+="\\";
      break;
    case 67:controlString+="\'";
      break;
    case 68:yy_.yytext=controlString; this.popState(); return 105;
      break;
    case 69:return "TK_LPAR";
      break;
    case 70:return "TK_RPAR";
      break;
    case 71:return "TK_SCOLON";
      break;
    case 72:return "TK_DOT";
      break;
    case 73:return "TK_COMA";
      break;
    case 74:return "TK_PLUS";
      break;
    case 75:return "TK_MINUS";
      break;
    case 76:return "TK_STAR";
      break;
    case 77:return "TK_DIV";
      break;
    case 78:return "TK_MOD";
      break;
    case 79:return "TK_GEQ";
      break;
    case 80:return "TK_LEQ";
      break;
    case 81:return "TK_EQEQ";
      break;
    case 82:return "TK_NOTEQ";
      break;
    case 83:return "TK_GREATER";
      break;
    case 84:return "TK_LESS";
      break;
    case 85:return "TK_EQ";
      break;
    case 86:return 5;
      break;
    case 87: 
        const err = new LexError(yy_.yylloc.first_line, yy_.yylloc.first_column, yy_.yytext);
        lexErrors.push(err);
        err.print();
        return "INVALID";
    
      break;
        }
    }
}


