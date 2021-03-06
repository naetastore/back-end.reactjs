import React, { useState, useEffect } from 'react';
import { Table, Button, Row, Col } from 'react-bootstrap';
import store from '../../../../../config/redux/store';
import axios from 'axios';
import { REST } from '../../../../../config/REST';
import AddCategory from '../../../../organism/Modals/AddCategory';
import session from '../../../../../config/session';
import UpdateCategory from '../../../../organism/Modals/UpdateCategory';

function Category(props) {

    const [categories, setCategories] = useState([]);
    const [initialized, setInitialized] = useState(false);
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

        axios.get(`${REST.server.andinaeta}api/categories`)
            .then(res => {
                setCategories(res.data);
                store.dispatch({ type: 'SET_LOADING', data: false });
            }).catch(err => console.error(err));


        setInitialized(true);
    }

    const add = category => {
        category['username'] = session.get('username');
        category['password'] = session.get('password');
        axios.post(`${REST.server.andinaeta}api/categories`, category)
            .then(res => {
                setCategories(categories.concat(res.data));

                setModalShow(false);
            }).catch(err => console.error(err));
    }

    const show = id => {
        axios.get(`${REST.server.andinaeta}api/categories?id=${id}`)
            .then(res => {
                setDetails(res.data);
                setModalShowDetails(true);
            }).catch(err => console.error(err));
    }

    const update = category => {
        setIsLoading(true);

        category['username'] = session.get('username');
        category['password'] = session.get('password');
        axios.post(`${REST.server.andinaeta}api/categories`, category)
            .then(res => {
                setIsLoading(false);

                getData();
            }).catch(err => console.error(err.response));
    }

    const deleteCategory = id => {
        setIsLoading(true);

        const s = {
            username: session.get('username'),
            password: session.get('password'),
            id,
            delete: 1
        };
        axios.get(`${REST.server.andinaeta}api/categories`, { params: s })
            .then(res => {
                setIsLoading(false);

                const data = categories.filter(c => Number(c.id) !== Number(res.data.id));
                setCategories(data);

                setModalShowDetails(false);
            }).catch(err => console.error(err));
    }

    return (
        <Row className="p_ mt-3 mx-auto">
            <Col md={10}>
                <h2>Katalog</h2>
                <p>Says something here.</p>

                <Button
                    variant="outline-primary"
                    className="my-3"
                    onClick={() => setModalShow(true)}
                >+ Katalog</Button>

                <AddCategory
                    onSubmit={add}
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    restserver="andinaeta" />

                <UpdateCategory
                    data={details}
                    onSubmit={update}
                    show={modalShowDetails}
                    onHide={() => setModalShowDetails(false)}
                    isloading={isLoading.toString()}
                    restserver="andinaeta"
                >
                    <Button
                        variant="outline-danger"
                        disabled={isLoading}
                        onClick={() => deleteCategory(details.id)}
                    >Hapus</Button>
                </UpdateCategory>

                <Row>
                    <Col md={12}>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th style={{ width: "70px" }}>ID</th>
                                    <th>Nama</th>
                                    <th>Description</th>
                                    <th style={{ width: "67px" }}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {!categories.length
                                    ?
                                    <>
                                        <tr>
                                            <td>#0</td>
                                            <td>Category could not be found.</td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </>
                                    : <></>}
                                {categories.map((c, i) =>
                                    <tr style={{ cursor: "pointer" }} key={i} onClick={() => show(c.id)}>
                                        <td>#{c.id}</td>
                                        <td>{c.name}</td>
                                        <td>{c.description}</td>
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
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default Category;