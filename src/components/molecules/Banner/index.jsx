import React from 'react';
import './index.css';
import { Container, Row, Col } from 'react-bootstrap';

function Banner(props) {
    return (
        <div className="banner-inner d-flex align-items-center">
            {/* <div className="overlay"></div> */}
            <Container>
                <Row className="justify-content-center">
                    <Col lg={6}>
                        <div className="banner-content text-center">
                            {props.children}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Banner;