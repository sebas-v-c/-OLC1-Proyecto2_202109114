import { useEffect, useState } from "react";
import CodeEditor from "../components/editor/CodeEditor";
import useKeyPress from "../hooks/useKeyPress";


export default function MainPage(){
    const [code, setCode] = useState("");
    const [processing, setProcessing] = useState(false);

    const enterPress = useKeyPress("Enter");
    const ctrlPress = useKeyPress("control");

    // use effecto for handling compilation when ctrl + enter is pressed
    useEffect(() => {
        if (enterPress && ctrlPress) {
            handleCompile();
        }
    }, [ctrlPress, enterPress]);

    function handleCompile() {
        setProcessing(true);
        const formData = {
            // TODO
            name: "deft",
            code: btoa(code)
        };

        const options = {
            method: "POST",
            url: process.env.REACT_APP_QC_URL
        }

    }

    function handleEditorChange(action: string, data: string) {
        switch (action) {
            case "code": {
                setCode(data);
                break;
            }
            default: {
                console.warn("Case not handled", action, data);
            }
        }
    }

    return (
        <>
            <CodeEditor
                code={code}
                onChange={handleEditorChange}
                height="500px"
            />
        </>
    );
}
