import React from 'react';
import { Row, Col, Tab, Nav, Container } from 'react-bootstrap';
import General from './General';
import Category from './Category';
import NewPost from './Post/NewPost';

function Andi() {
    return (
        <Tab.Container
            id="left-tabs-example"
            defaultActiveKey="newpost">
            <Container fluid>
                <Row className="g-mt-60">
                    <Col md={2} className="sidebar" style={{ backgroundColor: "#f7f7f7" }}>
                        <Nav className="flex-column mt-3">
                            <Nav.Item>
                                <Nav.Link
                                    eventKey="categories"
                                    className="color-black"
                                >Kategori</Nav.Link>
                                <Nav.Link
                                    eventKey="newpost"
                                    className="color-black"
                                >Postingan</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col md={10} className="pt-3 px-4 ml-sm-auto" style={{ backgroundColor: "#fff" }}>
                        <Row>
                            <Col md={12}>
                                <Tab.Content>
                                    <Tab.Pane eventKey="categories">
                                        <General />
                                        <Category />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="newpost">
                                        <NewPost />
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </Tab.Container>
    );
}

export default Andi;