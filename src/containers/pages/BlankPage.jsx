import React from 'react';
import { Row, Col } from 'react-bootstrap';

function BlankPage(props) {
    return (
        <Row className="-p_ mx-auto">
            <Col md={10}>
                <h1 className="page-heading">Hello World</h1>

                <h2>This is Bussiness</h2>
            </Col>
        </Row>
    );
}

export default BlankPage;