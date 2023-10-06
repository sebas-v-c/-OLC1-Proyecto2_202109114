import { useState } from "react";
import Editor from "@monaco-editor/react";

export default function CodeEditor({ onChange, language, code, theme }) {
    const [value, setValue] = useState(code || "");

}
