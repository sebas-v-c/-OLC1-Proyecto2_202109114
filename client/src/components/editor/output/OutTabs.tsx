import { OutModes } from "./OutputWindow"
import "../../../scss/Tabs.scss";
import { Button, ButtonGroup } from "react-bootstrap";


type Props = {
    onOutTabClick: (mode: OutModes) => void;
    outMode: OutModes;
}

export default function OutTabs({ onOutTabClick, outMode }: Props){
    return (
        <div>

            <ButtonGroup aria-label="Basic Example">
                <Button
                    className={"btn btn-secondary " + `${OutModes.Text === outMode ? "active" : ""}`}
                    onClick={() => onOutTabClick(OutModes.Text)}
                >
                    OUT
                </Button>

                <Button
                    className={"btn btn-secondary " + `${OutModes.Errors === outMode ? "active" : ""}`}
                    onClick={() => onOutTabClick(OutModes.Errors)}
                >
                    ERRORS
                </Button>

                <Button
                    className={"btn btn-secondary " + `${OutModes.Image === outMode ? "active" : ""}`}
                    onClick={() => onOutTabClick(OutModes.Image)}
                >
                    AST
                </Button>
            </ButtonGroup>
        </div>
    );
}
