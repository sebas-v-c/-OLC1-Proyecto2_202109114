import React, { useEffect, useRef, useState } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import "../../../scss/Image.scss"
import image from "../../../assets/react.svg";

type Props = {
    content: string;
}

export default function OutputImage({ content }: Props){
    const [width, setWidht] = useState(0);
    const ref = useRef(null);

    useEffect(() => {
        setWidht(ref.current.clientHeight);
    });

    return(
        <div className="div-container" ref={ref}>
            <TransformWrapper
                initialScale={1}
                initialPositionX={0}
                initialPositionY={0}
            >
                {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                    <React.Fragment>
                        <div className="tools">
                            <button onClick={() => zoomIn()}>+</button>
                            <button onClick={() => zoomOut()}>-</button>
                            <button onClick={() => resetTransform()}>RESET</button>
                        </div>
                        <TransformComponent>
                            <img src={image} alt="AST" width={width} className="responsive-image" />
                        </TransformComponent>
                    </React.Fragment>
                )}
            </TransformWrapper>
        </div>
    );
}
