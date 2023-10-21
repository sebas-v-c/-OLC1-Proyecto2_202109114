import React, { useEffect, useRef, useState } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import "../../../scss/Image.scss"
import GraphvizRenderer from "@yozora/react-code-renderer-graphviz";


type Props = {
    dotCode: string;
}

export default function OutputImage({ dotCode }: Props){
    const [height, setHeight] = useState(0);
    const [width, setWidht] = useState(0);
    const ref = useRef(null);

    useEffect(() => {
        setWidht(ref.current.clientWidth);
        setHeight(ref.current.clientHeight);
    });
    const [error, setError] = React.useState<any>(null)

    let content: any;
    try {
        content = <GraphvizRenderer code={dotCode} options={{"width": width-20, "height": height-50, "zoom": false}}/>
    } catch(err){
        content = <div>Error generating the AST</div>
    }


    //<Graphviz dot={`graph {grandparent -- "parent A"; child; "parent B" -- child; grandparent -- "parent B"}`} options={{"width": width-20, "height": height-50, "zoom": false}}/>
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
                            {content}
                            <pre>{error}</pre>
                        </TransformComponent>
                    </React.Fragment>
                )}
            </TransformWrapper>
        </div>
    );
}
