import React, { useState, useEffect, Fragment } from 'react';
import './index.css';
import axios from 'axios';
import { REST } from '../../../config/REST';
import session from '../../../config/session';
import { Jumbotron, Container, Row, Col, ListGroup } from 'react-bootstrap';
import store from '../../../config/redux/store';
import OrderStatus from '../../../components/molecules/OrderStatus';

function Home(props) {

    const [initialized, setInitialized] = useState(false);
    const [basic, setBasic] = useState({ product: 0, order: 0, selled: 0 });
    const [product, setProduct] = useState({ items: 0, stocks: 0, out_of_stock: 0 });
    const [order, setOrder] = useState([]);

    useEffect(() => {
        if (!initialized) {
            window.scroll(0, 0);
            getData();
        }
    });

    const getData = () => {
        store.dispatch({ type: 'SET_LOADING', data: true });

        const s = { username: session.get('username'), password: session.get('password') };

        axios.get(`${REST.server.url}api/product/statistics`, { params: s })
            .then(res => {
                setBasic(res.data.basic);
                setProduct(res.data.product);
            }).catch(err => {
                console.log(err.response);
            });
        axios.get(`${REST.server.url}api/orders`, { params: s })
            .then(res => {
                setOrder(res.data);
                store.dispatch({ type: 'SET_LOADING', data: false });
            }).catch(err => {
                console.log(err.response);
                store.dispatch({ type: 'SET_LOADING', data: false });
            });

        setInitialized(true);
    }

    return (
        <Fragment>
            <Jumbotron fluid>
                <h1>Hi, {session.get('username')}</h1>
                <p>
                    Produk {basic.product} | Pesanan {basic.order} | Terjual {basic.selled}
                    <br />
                    Stock {product.stocks} | Keluar Stock {product.out_of_stock} | Tidak Publik {product.not_ready}
                </p>
            </Jumbotron>
            <Container>
                <Row>
                    <Col lg={7}>

                    </Col>
                    <Col lg={5}>
                        <h4>Order Terbaru</h4>
                        <ListGroup variant="flush" className="shdw">
                            {order.map((o, i) =>
                                <ListGroup.Item
                                    key={i}
                                    style={{ cursor: "pointer" }}
                                    onClick={() => props.history.push(`/_rdn/administrator/order/${o.entry}`)}
                                >
                                    {o.user_name} @ {o.created} <OrderStatus data={o} className="ml-2" />
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
}

export default Home;