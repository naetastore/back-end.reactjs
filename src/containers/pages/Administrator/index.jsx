import React from 'react';
import { Row, Col, Tab, Nav, Container } from 'react-bootstrap';
import General from '../General';
import Category from '../Category';
import Product from '../Product';
import BlankPage from '../BlankPage';
import User from '../User';
import Order from '../Order';

function Administrator(props) {
    return (
        <Tab.Container
            id="left-tabs-example"
            defaultActiveKey={window.location.hash ? window.location.hash.replace('#', '') : "categories"}>
            <Container fluid>
                <Row className="g-mt-60">
                    <Col md={2} className="sidebar" style={{ backgroundColor: "#f7f7f7" }}>
                        <Nav className="flex-column mt-3">
                            <Nav.Item>
                                <Nav.Link href="#categories" eventKey="categories">Kategori</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="#products" eventKey="products">Produk</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="#users" eventKey="users">Pengguna</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="#orders" eventKey="orders">Pesanan</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="blankpage">Blank Page</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col md={9} lg={10} className="pt-3 px-4 ml-sm-auto" style={{ backgroundColor: "#fff" }}>
                        <Row>
                            <Col md={12}>
                                <Tab.Content>
                                    <Tab.Pane eventKey="categories">
                                        <General />
                                        <Category />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="products">
                                        <Product />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="users">
                                        <User />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="orders">
                                        <Order />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="blankpage">
                                        <BlankPage />
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

export default Administrator;