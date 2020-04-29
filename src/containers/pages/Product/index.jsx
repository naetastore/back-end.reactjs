import React, { useState, useEffect } from 'react'
import { Table, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { REST } from '../../../config/REST';
import ModalAddProduct from '../../organism/Modals/AddProduct';
import session from '../../../config/session';
import ModalUpdateProduct from '../../organism/Modals/UpdateProduct';
import store from '../../../config/redux/store';
import PerfectScrollbar from 'react-perfect-scrollbar'

function Product(props) {

    const [initialized, setInitialized] = useState(false);
    const [products, setProducts] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [details, setDetails] = useState({});
    const [modalShowDetails, setModalShowDetails] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!initialized) {
            getData();
        }
    });

    const getData = () => {
        store.dispatch({ type: 'SET_LOADING', data: true });
        axios.get(`${REST.server.url}api/product`)
            .then(res => {
                let product = res.data.product;

                setProducts(product);
                store.dispatch({ type: 'SET_LOADING', data: false });
            }).catch(err => console.log(err));

        setInitialized(true);
    }

    const show = id => {
        axios.get(`${REST.server.url}api/product?id=${id}`)
            .then(res => {
                setDetails(res.data.product);
                setModalShowDetails(true);
            }).catch(err => console.error(err));
    }

    const update = product => {
        setIsLoading(true);

        const fd = new FormData();
        fd.append('username', session.get('username'));
        fd.append('password', session.get('password'));
        fd.append('name', product.name);
        fd.append('price', product.price);
        fd.append('qty', product.qty);
        fd.append('category_id', product.category_id);
        fd.append('description', product.description);
        fd.append('image', product.image);
        fd.append('suggested', product.suggested);
        fd.append('is_ready', product.is_ready);
        fd.append('id', product.id);
        axios.post(`${REST.server.url}api/product`, fd)
            .then(res => {
                setIsLoading(false);
                // let data = [...products];
                // const updated = data.find(p => Number(p.id) === Number(res.data.product.id));
                // console.log(updated);
                // setProducts(data);
                getData();
            }).catch(err => console.error(err.response));
    }

    const add = product => {
        const fd = new FormData();
        fd.append('username', session.get('username'));
        fd.append('password', session.get('password'));
        fd.append('name', product.name);
        fd.append('price', product.price);
        fd.append('qty', product.qty);
        fd.append('category_id', product.category_id);
        fd.append('description', product.description);
        fd.append('image', product.image);
        fd.append('suggested', product.suggested);
        fd.append('is_ready', product.is_ready);
        axios.post(`${REST.server.url}api/product`, fd)
            .then(res => {
                let newData = [...products];

                newData[products.length + 1] = res.data.product;
                setProducts(newData);

                setModalShow(false);
            }).catch(err => console.error(err));
    }

    const deleteProduct = () => {
        setIsLoading(true);

        const s = {
            username: session.get('username'),
            password: session.get('password'),
            id: details.id,
            delete: 1
        };
        axios.get(`${REST.server.url}api/product`, { params: s })
            .then(res => {
                setIsLoading(false);

                const data = products.filter(p => Number(p.id) !== Number(res.data.id));
                setProducts(data);

                setModalShowDetails(false);
            }).catch(err => console.error(err));
    }

    return (
        <Row className="-p_ mx-auto">
            <Col md={10}>
                <Button
                    variant="outline-primary"
                    className="mb-3"
                    onClick={() => setModalShow(true)}
                >Tambah Data</Button>

                <ModalAddProduct
                    onSubmit={add} show={modalShow} onHide={() => setModalShow(false)} />

                <ModalUpdateProduct
                    data={details}
                    onSubmit={update}
                    show={modalShowDetails}
                    onHide={() => setModalShowDetails(false)}
                    isloading={isLoading.toString()}
                >
                    <Button
                        variant="outline-danger"
                        disabled={isLoading}
                        onClick={deleteProduct}
                    >Hapus</Button>
                </ModalUpdateProduct>

                <PerfectScrollbar>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th style={{ width: "80px" }}>ID</th>
                                <th>Nama</th>
                                <th>Harga</th>
                                <th>Kuantitas</th>
                                <th>Terjual</th>
                                <th style={{ width: "67px" }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {!products.length
                                ?
                                <>
                                    <tr>
                                        <td>#0</td>
                                        <td>Product could not be found.</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </>
                                : <></>}
                            {products.map((p, i) =>
                                <tr style={{ cursor: "pointer" }} key={i} onClick={() => show(p.id)}>
                                    <td>#{p.id}</td>
                                    <td>{p.name}</td>
                                    <td>{p.price}</td>
                                    <td>{p.qty}</td>
                                    <td>{p.selled}</td>
                                    <td>
                                        <Button
                                            size="sm"
                                            variant="outline-success"
                                        >Edit</Button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </PerfectScrollbar>
            </Col>
        </Row>
    );
}

export default Product;