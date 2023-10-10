import { useEffect, useRef } from "react";
import "../../../scss/Terminal.scss"

type Props = {
    content: string;
}


export default function OutputText({ content }: Props){
    const terminalRef = useRef(null);

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    })

    const lines: string[] = content.split('\n');

    return(
        <div className="terminal" ref={terminalRef}>
            {lines.map((line, index) => (
                <div key={index}>{line}</div>
            ))}
        </div>
    );
}
