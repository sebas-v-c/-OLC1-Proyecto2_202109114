/*
 * the following code is adapted from the Github repository:
 * Repostitory: https://github.com/manuarora700/react-code-editor
 * File: /src/hooks/useKeyPress.js
 * Author: manuarora700
 * Description: a reac hook to handle key presses, this allow me to run the code in the editor when
 * a combination of keys is pressed
 */


import { useEffect, useState } from "react";

type Key = {
    key: string;
};

const useKeyPress = function (targetKey: string) {
    const [keyPressed, setKeyPressed] = useState(false);

    function downHandler({ key }: Key) {
        if (key === targetKey) {
            setKeyPressed(true);
        }
    }

    function upHandler ({ key }: Key) {
        if (key === targetKey) {
            setKeyPressed(false);
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", downHandler);
        document.addEventListener("keyup", upHandler);

        return () => {
            document.removeEventListener("keydown", downHandler);
            document.removeEventListener("keyup", upHandler);
        };
    });

    return keyPressed;

}

export default useKeyPress;
