import { OutModes } from "./OutputWindow"
import "../../../scss/OutButtons.scss";


type Props = {
    onOutTabClick: (mode: OutModes) => void;
    outMode: OutModes;
}

export default function OutTabs({ onOutTabClick, outMode }: Props){
    return (
        <div className="out-button-container">
                <button
                    className={"out-button left-out-button " + `${OutModes.Text === outMode ? "active-out-button" : ""}`}
                    onClick={() => onOutTabClick(OutModes.Text)}
                >
                    OUT
                </button>

                <button
                    className={"out-button " + `${OutModes.Errors === outMode ? "active-out-button" : ""}`}
                    onClick={() => onOutTabClick(OutModes.Errors)}
                >
                    REPORTS
                </button>

                <button
                    className={"out-button right-out-button " + `${OutModes.Image === outMode ? "active-out-button" : ""}`}
                    onClick={() => onOutTabClick(OutModes.Image)}
                >
                    AST
                </button>
        </div>
    );
}
