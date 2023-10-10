import OutputErrors from "./OutputErrors";
import OutputImage from "./OutputImage";
import OutputText from "./OutputText";

export enum OutModes {
    Errors,
    Image,
    Text
}

type Props = {
    outputDetails: string; // TODO change this for a type
    outMode: OutModes
}


export default function OutputWindow({ outputDetails, outMode }: Props) {
    let content;

    switch(outMode){
        case OutModes.Errors: {
            content = <OutputErrors content={outputDetails}/>
            break;
        }
        case OutModes.Image: {
            content = <OutputImage content={outputDetails}/>
            break;
        }
        case OutModes.Text: {
            content = <OutputText content={outputDetails}/>
            break;
        }
    }

    return (
        <div style={{height: "100%"}}>
            {content}
        </div>
    );
}
