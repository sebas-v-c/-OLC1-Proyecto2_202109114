import React, { useEffect, useRef, useState } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import "../../../scss/Image.scss"
import image from "../../../assets/react.svg";

type Props = {
    content: string;
}

export default function OutputImage({ content }: Props){
    const [height, setHeight] = useState(0);
    const [width, setWidht] = useState(0);
    const ref = useRef(null);

    useEffect(() => {
        setWidht(ref.current.clientWidth);
        setHeight(ref.current.clientHeight);
    });

    // TODO change src of image
    return(
        <div className="div-container" ref={ref}>
            <TransformWrapper
                initialScale={1}
                initialPositionX={0}
                initialPositionY={0}
            >
                {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                    <React.Fragment>
                        <div className="image-button-container">
                            <button className={"image-button left-image-button"} onClick={() => zoomIn()}>+</button>
                            <button className={"image-button center-image-button"} onClick={() => zoomOut()}>-</button>
                            <button className={"image-button right-image-button"} onClick={() => resetTransform()}>RESET</button>
                        </div>
                        <TransformComponent>
                            <img src={image} alt="AST" width={width - 20} height={height -50} />
                        </TransformComponent>
                    </React.Fragment>
                )}
            </TransformWrapper>
        </div>
    );
}
