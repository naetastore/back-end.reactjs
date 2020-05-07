import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { REST } from '../../../../../config/REST';
import store from '../../../../../config/redux/store';
import session from '../../../../../config/session';
import { Container, Row, Col, Table, DropdownButton, Dropdown } from 'react-bootstrap';
import OrderStatus from '../../../../../components/molecules/OrderStatus';

import ModalProduct from '../../../../organism/Modals/ShowProduct';

function OrderDetail(props) {

    const [initialized, setInitialized] = useState(false);
    const [order, setOrder] = useState({ consumer: {}, summary: { product: [{}], detail: {} } });
    const [userAccess, setUserAccess] = useState({});
    const [modalProductShow, setModalProductShow] = useState(false);
    const [productDetail, setProductDetail] = useState({});

    useEffect(() => {
        if (!initialized) {
            window.scroll(0, 0);
            getData();
        }
    });

    const getData = () => {
        store.dispatch({ type: 'SET_LOADING', data: true });

        const entry = props.match.params.entry;

        let s = { username: session.get('username'), password: session.get('password') };

        if (entry) {
            s['entry'] = entry;

            axios.get(`${REST.server.naetastore}api/orders`, { params: s })
                .then(res => {
                    res.data.order.consumer['active'] = 'Active';

                    for (let i = 0; i < res.data.order.summary.product.length; i++) {
                        const product = res.data.order.summary.product[i];
                        res.data.order.summary.product[i]['total'] = Number(product.price.replace('.', '')) * Number(product.qty);
                    }

                    setOrder(res.data.order);
                    setUserAccess(res.data.useraccess);

                    store.dispatch({ type: 'SET_LOADING', data: false });
                }).catch(err => console.log(err));
        }

        setInitialized(true);
    }

    const show = id => {
        axios.get(`${REST.server.naetastore}api/product`, { params: { id } })
            .then(res => {
                setProductDetail(res.data.product);
                setModalProductShow(true);
            }).catch(err => console.log(err));
    }

    const confirm = entry => {
        let s = { username: session.get('username'), password: session.get('password'), entry, update: 1 };

        axios.post(`${REST.server.naetastore}api/orders`, s)
            .then(res => {
                // let newData = { ...order };
                // newData.summary.product.find(p => p.entry === entry)['purchased'] = 1;

                // setOrder(newData);
                getData();
                console.log(res);
            }).catch(err => console.log(err.response));
    }

    const remove = entry => {
        let s = { username: session.get('username'), password: session.get('password'), entry, delete: 1 };

        axios.get(`${REST.server.naetastore}api/orders`, { params: s })
            .then(res => {
                console.log(res);
                props.history.push('/_rdn/dashboard');
            }).catch(err => console.log(err.response));
    }

    return (
        <>
            <ModalProduct data={productDetail} show={modalProductShow} onHide={() => setModalProductShow(false)} />
            <Container className="-p_ g-mt-60 bg-light shdw">
                <Row>
                    <Col lg={12}>
                        <DropdownButton id="actions" title="Pesanan" className="ml-3">
                            {userAccess.hasConfirm ? <Dropdown.Item onClick={() => confirm(order.summary.product[0].entry)}>Konfirmasi</Dropdown.Item> : ''}
                            {userAccess.hasDelete ? <Dropdown.Item onClick={() => remove(order.summary.product[0].entry)}>Hapus</Dropdown.Item> : ''}
                        </DropdownButton>
                    </Col>
                </Row>
                <Row>
                    <Col lg={6}>
                        <h4>Detail</h4>
                        <div className="d-flex">
                            <Col sm={4}>ID Pesanan:</Col>
                            <Col sm={8}><strong>#{order.summary.product[0].id}</strong></Col>
                        </div>
                        <div className="d-flex">
                            <Col sm={4}>Waktu Memesan:</Col>
                            <Col sm={8}><strong>{order.summary.product[0].created}</strong></Col>
                        </div>
                        <div className="d-flex">
                            <Col sm={4}>Nama Client:</Col>
                            <Col sm={8}><strong>{order.consumer.name}</strong></Col>
                        </div>
                        <div className="d-flex">
                            <Col sm={4}>Item:</Col>
                            <Col sm={8}><strong>{order.summary.product.length}</strong></Col>
                        </div>
                        <div className="d-flex">
                            <Col sm={4}>Total Bayar:</Col>
                            <Col sm={8}><strong>{order.summary.detail.total}</strong></Col>
                        </div>
                        <div className="d-flex">
                            <Col sm={4}>Status:</Col>
                            <Col sm={8}><OrderStatus data={order.summary.product[0]} /></Col>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <h4>Client</h4>
                        <div className="d-flex">
                            <Col sm={4}>ID Client:</Col>
                            <Col sm={8}><strong>#{order.consumer.id}</strong></Col>
                        </div>
                        <div className="d-flex">
                            <Col sm={4}>Nama:</Col>
                            <Col sm={8}><strong>{order.consumer.name}</strong></Col>
                        </div>
                        <div className="d-flex">
                            <Col sm={4}>Ponsel:</Col>
                            <Col sm={8}><strong>{order.consumer.phonenumber}</strong></Col>
                        </div>
                        <div className="d-flex">
                            <Col sm={4}>Status:</Col>
                            <Col sm={8}><strong>{order.consumer.active}</strong></Col>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col lg={6}>
                        <h4>Billing</h4>
                        <div className="d-flex">
                            <Col sm={4}>Nama:</Col>
                            <Col sm={8}><strong>{order.consumer.name}</strong></Col>
                        </div>
                        <div className="d-flex">
                            <Col sm={4}>Alamat:</Col>
                            <Col sm={8}><strong>{order.consumer.address}</strong></Col>
                        </div>
                        <div className="d-flex">
                            <Col sm={4}>Ponsel:</Col>
                            <Col sm={8}><strong>{order.consumer.phonenumber}</strong></Col>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <h4>Alamat Pengiriman</h4>
                        <div className="d-flex">
                            <Col sm={4}>Nama:</Col>
                            <Col sm={8}><strong>{order.consumer.name}</strong></Col>
                        </div>
                        <div className="d-flex">
                            <Col sm={4}>Alamat:</Col>
                            <Col sm={8}><strong>{order.consumer.address}</strong></Col>
                        </div>
                        <div className="d-flex">
                            <Col sm={4}>Ponsel:</Col>
                            <Col sm={8}><strong>{order.consumer.phonenumber}</strong></Col>
                        </div>
                    </Col>
                </Row>

            </Container>
            <Container className="bg-light shdw">
                <Row>
                    <Col lg={12}>
                        <h5>Dalam Pesanan</h5>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>ID Product</th>
                                    <th>Harga</th>
                                    <th>Kuantitas</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                    <th>Stock</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.summary.product.map((p, i) =>
                                    <tr style={{ cursor: "pointer" }} key={i} onClick={() => show(p.product_id)}>
                                        <td>#{p.product_id}</td>
                                        <td>{p.price}</td>
                                        <td>{p.qty}</td>
                                        <td>{p.total}</td>
                                        <td>{p.status}</td>
                                        <td>{p.stock}</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default OrderDetail;