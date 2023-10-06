import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Navbar";
//import React from "react";
import  '../../scss/BottomNavBar.scss';

export default function ButtomNavBar({ onButtonClick, content }) {
    return(
        <Navbar data-bs-theme="dark">
            <Button variant="succes" onClick={onButtonClick}>{content}</Button>
        </Navbar>
    );
}

type Props = {
    onButtonClick: () => void;
    content: string;
}
