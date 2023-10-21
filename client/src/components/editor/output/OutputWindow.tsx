import OutputErrors from "./OutputErrors";
import OutputImage from "./OutputImage";
import OutputText from "./OutputText";

export enum OutModes {
    Errors,
    Image,
    Text
}

type Props = {
    outputDetails: any; // TODO change this for a type
    outMode: OutModes;
}

type Errors = {
    lex: Array<any>,
    sem: Array<any>,
    syn: Array<any>
}

type Res = {
    ast: string;
    content: string;
    err: Errors;
    name: string;
    status: number;
    symtable: Array<any>;
}


export default function OutputWindow({ outputDetails, outMode }: Props) {
    let content;
    let emptyRes: boolean = false;
    for (const _ in outputDetails){
        emptyRes = true
    }

    let filteredObj: Res;
    if (!emptyRes){
        filteredObj = {
            ast: "",
            content: "",
            err: {
                lex: [],
                sem: [],
                syn: []
            },
            name: "",
            status: 0,
            symtable: []
        }
    } else{
        filteredObj = outputDetails as Res;
    }


    switch(outMode){
        case OutModes.Errors: {
            content = <OutputErrors errors={filteredObj.err} symTable={filteredObj.symtable} />
            break;
        }
        case OutModes.Image: {
            content = <OutputImage dotCode={filteredObj.ast}/>
            break;
        }
        case OutModes.Text: {
            content = <OutputText stdOut={filteredObj.content} errors={filteredObj.err}/>
            break;
        }
    }


    return (
        <div style={{height: "100%"}}>
            {content}
        </div>
    );
}
