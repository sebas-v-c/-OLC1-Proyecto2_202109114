import { useEffect, useState } from "react";
import axios from "axios";
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
            content: btoa(code)
        };

        const options = {
            method: "POST",
            url: process.env.REACT_APP_QC_URL,
            params: { base64_encoded: "true", fields: "*" },
            headers: {
                "content-type": "application/json",
                "Content-Type": "application/json",
            },
            data: formData,
        };

        // verify info over here
        axios
            .request(options)
            .then(function (response) {
                console.log("res.dadta", response.data);
                const token = response.data.token;
                checkStatus
            })

    };

    async function checkStatus (token) {

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
