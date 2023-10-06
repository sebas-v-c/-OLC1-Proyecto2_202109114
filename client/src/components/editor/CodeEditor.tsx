import { useEffect, useState } from "react";
import { Editor, useMonaco } from "@monaco-editor/react";

type Props = {
    onChange: (code: string, val: string) => void;
    code: string;
    height?: string,
    width?: string
};

export default function CodeEditor({ onChange, code, height, width}: Props) {
    const [value, setValue] = useState(code || "");
    const monaco = useMonaco();

    // change editor theme to dracula
    useEffect(() => {
        if (monaco) {
            import('monaco-themes/themes/Dracula.json')
                .then(data => {
                    monaco.editor.defineTheme('dracula', data);
                })
                .then(_ => monaco.editor.setTheme('dracula'))
        }
    }, [monaco]);

    // updatee editor text from parent
    function handleEditorChange(value: any){
        setValue(value);
        onChange("code", value);
    }

    return (
        <Editor
            height={height}
            width={width}
            language={"mysql"}
            value={value}
            defaultValue="// Some code here"
            onChange={handleEditorChange}
        />
    );

}
