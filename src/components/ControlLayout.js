import StreamContainer from './StreamContainer';
import { Col, Container, Row } from 'react-bootstrap';
import { Form } from "react-bootstrap";
import { useState, useEffect } from 'react';
import axios from 'axios'
import "../css/ControlLayout.css"
import { Card, Button } from "react-bootstrap";


function ControlLayout(props) {
    const [extOn, setExtOn] = useState(true);
    const [overlayOn, setOverlayOn] = useState(true);
    const [bug, setBug] = useState(true);
    const [bugOverlay, setBugOverlay] = useState(true);


    const handleExtOn = () => {
        if (extOn === true && overlayOn === true) {
            setOverlayOn(false)
            const off = "http://127.0.0.1:8080/inf/en_overlay/" + (!overlayOn ? "1" : "0")

            axios.get(off);
        }
        setExtOn(!extOn)

        const dir = "http://127.0.0.1:8080/inf/en_ext/" + (!extOn ? "1" : "0")

        axios.get(dir);
    };

    const handleOverlayOn = () => {
        setOverlayOn(!overlayOn)

        const dir = "http://127.0.0.1:8080/inf/en_overlay/" + (!overlayOn ? "1" : "1") + "?refresh=0.0"

        axios.get(dir);
    };

    const handleBug = () => {
        if (bug === true && bugOverlay === true) {
            setBugOverlay(false)
            const off = "http://127.0.0.1:8080/bug/bug_overlay/" + (!bugOverlay ? "1" : "0")

            axios.get(off);
        }
        setBug(!bug)

        const dir = "http://127.0.0.1:8080/bug/en_bug/" + (!bug ? "1" : "0")

        axios.get(dir);
    };

    const handleBugOverlay = () => {
        setBugOverlay(!bugOverlay)

        const dir = "http://127.0.0.1:8080/inf/en_bug_overlay/" + (!bugOverlay ? "1" : "1") + "?refresh=0.0"

        axios.get(dir);
    };

    const handleFExt = () => {
        props.showToast()

        const dir = "http://127.0.0.1:8080/inf/ext_force/"

        axios.get(dir);
    };

    const handleShowDummyBird = () => {
        props.showDummy()

        const dir = "http://127.0.0.1:8080/cmd/dummy-bird/"

        axios.get(dir);
    };
    const handleShowDummyBug = () => {
        props.showDummy()

        const dir = "http://127.0.0.1:8080/cmd/dummy-bug/"

        axios.get(dir);
    };
    
    
    return (
        <div className="ControlLayout" width={640}>
            <Container>
                <Row>
                    <h3 className="head-title">Digital Scarescrow</h3>
                </Row>
                <Row>
                    <Form>
                        <Card className="smooth-border-card">
                            <Card.Body>
                                <Card.Title>Bird Detection</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Detects and exterminates bird flock.
                                </Card.Subtitle>

                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label="Extermination"
                                    checked={extOn}
                                    onChange={() => handleExtOn()}
                                />
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label="Overlay"
                                    checked={overlayOn}
                                    // disabled={!extOn}
                                    disabled={true}

                                    onChange={() => handleOverlayOn()}
                                />

                                <Button lg="true" variant="primary" onClick={() => handleFExt()}>Force Extermination</Button>
                            </Card.Body>
                        </Card>

                        <Card className="smooth-border-card">
                            <Card.Body>
                                <Card.Title>Bug Detection</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">warns if bugs are detected.
                                </Card.Subtitle>

                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label="Bug-detection"
                                    checked={bug}
                                    onChange={() => handleBug()}
                                />
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label="Bug-overlay"
                                    checked={bugOverlay}
                                    // disabled={!bug}
                                    disabled={true}
                                    onChange={() => handleBugOverlay()}
                                />
                            </Card.Body>
                        </Card>

                        <Card className="smooth-border-card">
                            <Card.Body>
                                <Card.Title>Demo</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Dummy Stream
                                </Card.Subtitle>
                                
                                <Button lg="true" variant="primary" onClick={() => handleShowDummyBird()}>Bird</Button>
                                <Button margin-left="10px" lg="true" variant="primary" onClick={() => handleShowDummyBug()}>Bug</Button>

                            </Card.Body>
                        </Card>

                    </Form>
                </Row>
            </Container>
        </div>
    );
}

export default ControlLayout;
