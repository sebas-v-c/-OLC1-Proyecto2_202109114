import { useEffect, useState } from "react";
import axios from "axios";
import CodeEditor from "../components/editor/CodeEditor";
import useKeyPress from "../hooks/useKeyPress";
import { QCResponseObject } from "../common/types";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import OutputWindow, { OutModes } from '../components/editor/output/OutputWindow';
//import ButtonNavBar from "../components/layout/Bu"
//import ButtonNavBar from "../components/layout/ButtonNavBar";


export default function MainPage(){
    const [code, setCode] = useState("");
    const [processing, setProcessing] = useState(false);
    const [outMode, setOutMode] = useState(OutModes.Text);

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

        axios.request(options).then((response) =>{
            const res: QCResponseObject = response;
            // TODO do something with the response
            setProcessing(false);
            showSuccessToast()
        }).catch(error => {
            setProcessing(false);
            // TODO do something with the response
            console.log(error);
            showErrorToast()
        });
    };

    const showSuccessToast = (msg?: string) => {
        toast.success(msg || 'Compiled Succesfully!', {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const showErrorToast = (msg?: string, timer?: number) => {
        toast.error(msg || 'Something went wrong! Please try again', {
            position: "bottom-right",
            autoClose: timer ? timer : 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        });
    };


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
            <ToastContainer
                position='bottom-right'
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div>
                <div>
                    <CodeEditor
                        code={code}
                        onChange={handleEditorChange}
                        height="500px"
                        />
                </div>
                <div>
                    <OutputWindow
                        outMode={outMode}
                        outputDetails={"simon"}
                    />
                </div>
            </div>
            <div>
                <ButtonNavBar
                    onButtonClick={handleCompile}
                    content={"Run"}
                />
            </div>
        </>
    );
}
