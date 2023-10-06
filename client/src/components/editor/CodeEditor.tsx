import { useEffect, useState } from "react";
import { Editor, useMonaco } from "@monaco-editor/react";

type Props = {
    onChange: (code: string, val: string) => void;
    code: string;
};

export default function CodeEditor({ onChange, code}: Props) {
    const [value, setValue] = useState(code || "");
    const monaco = useMonaco();

    useEffect(() => {
        if (monaco) {
            import('monaco-themes/themes/Dracula.json')
                .then(data => {
                    monaco.editor.defineTheme('dracula', data);
                })
                .then(_ => monaco.editor.setTheme('dracula'))
        }
    }, [monaco]);

    function handleEditorChange(value: any){
        setValue(value);
        onChange("code", value);
    }

    return (
        <Editor
            height={"85vh"}
            width={`100%`}
            language={"mysql"}
            value={value}
            defaultValue="// Some code here"
            onChange={handleEditorChange}
        />
    );

}
