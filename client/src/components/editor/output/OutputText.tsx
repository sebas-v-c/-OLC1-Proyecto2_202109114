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
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    })

    //const lines: string[] = content.split('\n');
    //console.log(content === null);
    //console.log(content? "pene" : "chingadamadre");


    //<div dangerouslySetInnerHTML={{__html: content}}>{content ? content : "<div></div>"}</div>
    return(
        <div className="terminal" ref={terminalRef}>
            <div dangerouslySetInnerHTML={{__html: stdOut}}></div>
        </div>
    );
}
