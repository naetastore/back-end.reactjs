import React, { useEffect, useState } from 'react';
import { Row, Col, Tab, Nav } from 'react-bootstrap';
import Index from './Container/Order';
import axios from 'axios';
import { REST } from '../../../../../config/REST';
import session from '../../../../../config/session';
import store from '../../../../../config/redux/store';

function Order(props) {

    const [initialized, setInitialized] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        if (!initialized) {
            getData();
        }
    });

    const getData = () => {
        store.dispatch({ type: 'SET_LOADING', data: true });
        const s = {
            username: session.get('username'),
            password: session.get('password'),
            all: 1
        };
        axios.get(`${REST.server.naetastore}api/orders`, { params: s })
            .then(res => {
                setData(res.data);

                store.dispatch({ type: 'SET_LOADING', data: false });
            }).catch(err => {
                console.error(err);

                store.dispatch({ type: 'SET_LOADING', data: false });
            });
        setInitialized(true);
    }

    const confirm = entry => {
        let s = {
            username: session.get('username'),
            password: session.get('password'),
            entry,
            update: 1
        };
        axios.post(`${REST.server.naetastore}api/orders`, s)
            .then(res => {
                getData();
            }).catch(err => console.log(err.response));
    }

    const canceled = d => Number(d.order.summary.product[0].canceled > 1);
    const purchased = d => Number(d.order.summary.product[0].purchased) > 1;

    return (
        <Row className="-p_ mx-auto">
            <Col md={10}>
                <h1 className="page-heading">Pesanan</h1>

                <Tab.Container
                    defaultActiveKey="index">
                    <Row>
                        <Col md={12}>
                            <Nav className="order-nav" style={{ borderBottom: "1px solid #ddd" }}>
                                <Nav.Item>
                                    <Nav.Link eventKey="index">Semua</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="index1">Open Order</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="index2">Dibatalkan</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Tab.Content>
                                <Tab.Pane eventKey="index">
                                    <Index
                                        data={data.length ? data : false}
                                        confirmFunc={confirm} />
                                </Tab.Pane>
                                <Tab.Pane eventKey="index1">
                                    <Index
                                        data={data.length
                                            ? data.filter(d => !purchased(d) && !canceled(d))
                                            : false} />
                                </Tab.Pane>
                                <Tab.Pane eventKey="index2">
                                    <Index
                                        data={data.length
                                            ? data.filter(d => canceled(d))
                                            : false} />
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </Col>
        </Row>
    );
}

export default Order;