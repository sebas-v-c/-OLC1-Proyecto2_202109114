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
            content = <OutputErrors/>
        }
        case OutModes.Image: {
            content = <OutputImage/>
        }
        case OutModes.Text: {
            content = <OutputText/>
        }
    }

    return (
        <div>
            {content}
        </div>
    );
}
