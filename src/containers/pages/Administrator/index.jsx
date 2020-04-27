import React from 'react';
import { Row, Col, Tab, Nav } from 'react-bootstrap';
import General from '../General';
import Category from '../Category';
import Product from '../Product';

function Administrator(props) {
    return (
        <Tab.Container id="left-tabs-example" defaultActiveKey="generals">
            <Row className="margin-top-60 mx-0">
                <Col xs={2} className="sidebar" style={{ backgroundColor: "#f7f7f7" }}>
                    <Nav className="flex-column mt-3">
                        <Nav.Item>
                            <Nav.Link eventKey="generals">Kategori Umum</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="categories">Kategori Sub</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="products">Produk</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col xs={10} className="pt-3" style={{ backgroundColor: "#fff" }}>
                    <Row>
                        <Col md={11} className="mx-auto">
                            <Tab.Content>
                                <Tab.Pane eventKey="generals">
                                    <General />
                                </Tab.Pane>
                                <Tab.Pane eventKey="categories">
                                    <Category />
                                </Tab.Pane>
                                <Tab.Pane eventKey="products">
                                    <Product />
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Tab.Container>
    );
}

export default Administrator;