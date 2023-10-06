import { useState } from "react";
import { Editor } from "@monaco-editor/react";

type Props = {
    onChange: (code: string, val: string) => void;
    code: string;
    theme: string;
};

export default function CodeEditor({ onChange, code, theme}: Props) {
    const [value, setValue] = useState(code || "");

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
            theme={theme}
            defaultValue="// Some code here"
            onChange={handleEditorChange}
        />
    );

}
