import { Navbar, Container } from "react-bootstrap";

function NavBar(props) {

    return (
        <div>
            <Navbar sticky="top" bg="dark" variant="dark" expand="sm">
                <Container>
                    <Navbar.Brand href="#home">
                        {/* <img
                            alt=""
                            src="/logo.svg"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '} */}
                        SID
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </div>

    );
}

export default NavBar;
