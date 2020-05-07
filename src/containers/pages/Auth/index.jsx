import React, { useState, useEffect } from 'react';
import './index.css';
import store from '../../../config/redux/store';
import session from '../../../config/session';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import config from '../../../config.json';
import dataJSON from '../../../data.json';
import { api } from '../../../services/api';
import AlertOrg from '../../organism/Alert';

function Auth(props) {
    const [data, setData] = useState({ username: '', password: '' });
    const [disabled, setDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [initialized, setInitialized] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (!initialized) {
            checkForms();
        }
    });

    const checkForms = () => {
        if (data.username && data.password) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
        setInitialized(true);
    }

    const change = e => {
        let newData = { ...data };
        newData[e.target.id] = e.target.value;

        setData(newData);

        if (newData.username && newData.password) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }

    const submit = async event => {
        event.preventDefault();

        setIsLoading(true);

        try {
            const res = await api.get('users', data);
            setIsLoading(false);

            res.data['password'] = data.password;
            setUser(res.data);

            redirect(res.data.role_id);
            return;
        } catch (err) {
            const errorMessage = err.response.data.message;
            setErrorMessage(errorMessage);
            setIsLoading(false);
        }
    }

    const setUser = data => {
        session.set(data);
        store.dispatch({ type: 'SET_USERDATA', data });
    }

    const redirect = role => {
        if (!search) {
            if (role > 1) {
                props.history.push(config.default_route.member);
            } else {
                props.history.push(config.default_route.admin);
            }
        } else {
            props.history.push(search.replace('?', ''));
        }
    }

    const search = props.location.search;

    function ShowError() {
        if (errorMessage) {
            return (
                <AlertOrg variant="danger" onHide={() => setErrorMessage('')}>
                    {errorMessage}
                </AlertOrg>
            );
        } else {
            return false;
        }
    }

    return (
        <div className="container-scroller">
            <Container fluid className="page-body-wrapper full-page-wrapper">
                <div className="content-wrapper d-flex mb-0 align-items-stretch auth auth-img-bg">
                    <Row className="flex-grow">
                        <Col lg={6} className="d-flex m-0 align-items-center justify-content-center">
                            <ShowError />
                            <Form onSubmit={submit} style={{ width: "50%" }}>
                                <h4>{dataJSON.auth.title}</h4>
                                <h6 className="font-weight-light">
                                    {dataJSON.auth.description}
                                </h6>
                                <Form.Group controlId="username" className="pt-3">
                                    <Form.Label>Nama Pengguna</Form.Label>
                                    <Form.Control
                                        autoComplete="off"
                                        onChange={change}
                                        type="text"
                                        placeholder="Nama pengguna"
                                    />
                                </Form.Group>
                                <Form.Group controlId="password">
                                    <Form.Label>Kata Sandi</Form.Label>
                                    <Form.Control
                                        onChange={change}
                                        type="password"
                                        placeholder="Kata sandi"
                                    />
                                </Form.Group>
                                <Button
                                    variant="primary"
                                    type="submit"
                                    style={{ width: "100%" }}
                                    disabled={disabled | isLoading}
                                >
                                    {isLoading ? 'tunngu..' : 'Lanjutkan'}
                                </Button>
                                <div className="text-center mt-4 font-weight-light">
                                    Belum punya akun? {'\r\n'}
                                    <NavLink
                                        to={search ? `/signup${search}` : "/signup"}
                                        className="text-primary"
                                    >Buat Akun</NavLink>
                                </div>
                            </Form>
                        </Col>
                        <Col lg={6} className={dataJSON.auth.bgClassName + " bg-img-hero d-flex m-0 flex-row"}>
                            <p className="font-weight-medium text-center flex-grow align-self-end">
                                {config.copyright} {new Date().getFullYear()} &copy; All Rights Reserved.
                            </p>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    );
}

export default Auth;