import { useEffect, useRef, useState } from "react";
import axios from "axios";
import CodeEditor from "../components/editor/CodeEditor";
import useKeyPress from "../hooks/useKeyPress";
import { QCResponseObject } from "../common/types";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../scss/CustomContainer.scss'

import OutputWindow, { OutModes } from '../components/editor/output/OutputWindow';
import OutTabs from "../components/editor/output/OutTabs";
import { Container, Row, Col, Button } from "react-bootstrap";
import "../scss/MainPage.scss";
import "../scss/RunButton.scss"
import Tabs from "../components/editor/Tabs";
import FileActions from "../components/editor/FileActions";

type Code = {
    fileName: string;
    code: string;
}

export default function MainPage(){
    const [codeFiles, setCodeFiles] = useState<Code[]>([{fileName: "Main.qc", code:"// SOME CODE HERE"}]);
    const [processing, setProcessing] = useState<boolean>(false);
    const [outMode, setOutMode] = useState<OutModes>(OutModes.Text);
    const [currentTab, setCurrentTab] = useState<number>(0);
    const fileInputRef = useRef(null);
    const divRef = useRef(null);

    const enterPress = useKeyPress("Enter");
    const ctrlPress = useKeyPress("control");

    // use effect for handling compilation when ctrl + enter is pressed
    useEffect(() => {
        if (enterPress && ctrlPress) {
            handleCompile();
        }
    }, [ctrlPress, enterPress]);

   function handleCompile() {
        setProcessing(true);
        const formData = {
            // TODO
            name: codeFiles[currentTab].fileName ? codeFiles[currentTab].fileName : "deft",
            content: btoa(codeFiles[currentTab].code ? codeFiles[currentTab].code : ""),
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
        });};

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

    function handleEditorChange(action: string, data: string){
        switch (action) {
            case "code": {
                const newObj = codeFiles[currentTab];
                newObj.code = data;
                const newObjs = codeFiles.slice();
                newObjs[currentTab] = newObj;
                setCodeFiles(newObjs);
                break;
            }
            default: {
                console.warn("Case not handled", action, data);
            }
        }
    }

    var removing = false;

    function handleTabClick(index: number){
        if (removing) {
            removing = false;
            setCurrentTab(index-1);
            return;
        }
        setCurrentTab(index);
    }

    function handleNewTab(){
        const generateUniqueFileName = (baseName: string, existingNames: string[]): string => {
            let newFileName = baseName;
            let counter = 1;
            while (existingNames.includes(newFileName)) {
                newFileName = `${baseName.replace('.qc', '')}${counter}.qc`;
                counter++;
            }
            return newFileName;
        };

        const newFileName = generateUniqueFileName("New-File.qc", codeFiles.map(file => file.fileName));

        const newFile: Code = {
            fileName: newFileName,
            code: `// New Code for ${newFileName}`
        };

        setCodeFiles([...codeFiles, newFile]);
        setCurrentTab(codeFiles.length);
    }

    function handleRemoveTab(index: number){
        const newCodeFiles: Code[] = codeFiles.slice();

        newCodeFiles.splice(index, 1);
        if (newCodeFiles.length === 0){
            console.debug(newCodeFiles);
            console.log(newCodeFiles);
        }
        setCodeFiles(newCodeFiles)
        if (index === currentTab){
            //setCurrentTab(0);
        }
        removing = true;
    }

    function handleOutTabClick(mode: OutModes) {
        setOutMode(mode);
    }

    function handleSave() {
        const blob = new Blob([codeFiles[currentTab].code], { type: "text/qc" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");

        a.href = url;
        a.download = codeFiles[currentTab].fileName;
        a.click();

        URL.revokeObjectURL(url);
    }

    function handleLoad() {
        fileInputRef.current.click();
    }

    function handleFileChange(event) {
        const selectedFile = event.target.files[0];

        if (selectedFile) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const fileContent = e.target?.result;

                const newFile: Code = {
                    fileName: selectedFile.name,
                    code: fileContent? fileContent : ""
                }

                setCodeFiles([...codeFiles, newFile]);
                setCurrentTab(codeFiles.length);
            };

            reader.readAsText(selectedFile);
        }

    }



    return (
        <div className="page">
            <div className="div-row">
                <div className="div-row">
                    <div style={{padding: '10px 0px 0px 10px'}}>
                        <FileActions
                            fileInputRef={fileInputRef}
                            onFileChange={handleFileChange}
                            onSave={handleSave}
                            onLoad={handleLoad}
                        />
                    </div>
                </div>
                <div  className="div-column" ref={divRef} >
                        <Tabs
                            onTabClick={handleTabClick}
                            onNewTab={handleNewTab}
                            onRemoveTab={handleRemoveTab}
                            tabNames={codeFiles.map((file: Code) => file.fileName)}
                            currentTab={currentTab}
                        />
                        <CodeEditor
                            code={codeFiles[currentTab] ? codeFiles[currentTab].code : ""}
                            onChange={handleEditorChange}
                        />

                    <div style={{ padding: "10px 10px 0 0" }}>
                        <button className="run-custom-button" onClick={handleCompile}>
                            RUN
                            <img
                                src="https://icons.iconarchive.com/icons/iconoir-team/iconoir/72/play-icon.png"
                                alt="Play"
                                width={19}
                                height={19}
                            />
                        </button>
                    </div>

                </div>
                <div className="div-column">
                        <OutTabs
                            onOutTabClick={handleOutTabClick}
                            outMode={outMode}
                        />
                        <OutputWindow
                            outMode={outMode}
                            outputDetails={"simon"}
                        />
                </div>


            </div>

        </div>
    );
}
