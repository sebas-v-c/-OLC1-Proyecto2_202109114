//import { Container, Navbar, Nav, Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import image from '../../assets/Z-logo.png';
import  '../../scss/MainNavigation.scss';

export default function MainNavigation() {
    return(
        <Navbar data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="https://sebas-v-c.github.io" style={{ fontSize: '23px' }}>
                    <img
                        src={image}
                        width="35"
                        height="35"
                        className="d-inline-block align-top"
                        alt="Z!bas Studios Logo"
                    />{' '}
                    QueryCrypter
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
};
