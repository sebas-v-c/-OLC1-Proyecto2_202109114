import { useEffect, useRef } from "react";
import "../../../scss/Terminal.scss"


type Errors = {
    lex: Array<any>,
    sem: Array<any>,
    syn: Array<any>
}

type Props = {
    errors: Errors;
    stdOut: string;
}

export default function OutputText({ errors, stdOut }: Props){
    const terminalRef = useRef(null);

    useEffect(() => {
        if (terminalRef.current) {
            // @ts-ignore
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    })

    let errContent;
    if (errors.lex.length > 0){
        errContent = errors.lex.map((item:any, index:any) => {
            return <div id={index}><pre style={{"color": "#f38ba8"}}>{`Lexical Error: Character '${item.character}' at line: ${item.line} column: ${item.column} not recognized in the language`}</pre></div>
        })
    } else if (errors.syn.length > 0){
        errContent = errors.syn.map((item:any, index:any) => {
            if (index > 2){
                return
            }
            return <div id={index}><pre style={{"color": "#f38ba8"}}>{`Syntax Error: Unexpected Token '${item.token}' at line: ${item.line} column: ${item.column}`}</pre></div>
        })
    } else if (errors.sem.length > 0){
        errContent = errors.sem.map((item:any, index:any) => {
            return <div id={index}><pre style={{"color": "#f38ba8"}}>{`type: ${item.type}\n"${item.description}"\nline: ${item.line} column: ${item.column}  Environment: ${item.environment}`}</pre></div>
        })
    }

    //const lines: string[] = content.split('\n');
    //console.log(content === null);
    //console.log(content? "pene" : "chingadamadre");


    //<div dangerouslySetInnerHTML={{__html: content}}>{content ? content : "<div></div>"}</div>
    return(
        <div className="terminal" ref={terminalRef}>
            <div dangerouslySetInnerHTML={{__html: stdOut}}></div>
            {errContent}
        </div>
    );
}
