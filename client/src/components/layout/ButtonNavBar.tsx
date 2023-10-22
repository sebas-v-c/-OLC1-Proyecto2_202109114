import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
//import React from "react";
import  '../../scss/ButtonNavBar.scss';
import Container from "react-bootstrap/Container";

export default function ButtonNavBar({ onButtonClick, content }: Props) {
    return(
        <div className="sub-div">
            <Navbar className="custom-navbar" data-bs-theme="dark">
                <Container>
                    <Button variant="primary" onClick={onButtonClick}>{content}</Button>
                </Container>
            </Navbar>
        </div>
    );
}

type Props = {
    onButtonClick: () => void;
    content: string;
}
