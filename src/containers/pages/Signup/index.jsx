import React, { useState, useEffect } from 'react';
import './index.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import config from '../../../config.json';
import dataJSON from '../../../data.json';
import { api } from '../../../services/api';
import AlertOrg from '../../organism/Alert';

function Signup(props) {
    const [data, setData] = useState({ username: '', email: '', password: '' });
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
        if (data.username && data.email && data.password) {
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

        if (newData.username && newData.email && newData.password) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }

    const submit = async event => {
        event.preventDefault();

        setIsLoading(true);

        try {
            setIsLoading(false);
            const res = await api.post('users', data);
            redirect(res.data.user.role_id);
            return;
        } catch (err) {
            const errorMessage = err.response.data.message;
            setErrorMessage(errorMessage);
            setIsLoading(false);
        }
    }

    const redirect = role => {
        const search = props.location.search;
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

    function ShowError() {
        if (errorMessage) {
            return (
                <AlertOrg variant="danger" onHide={() => setErrorMessage('')}>
                    {errorMessage}
                </AlertOrg>
            );
        } else {
            return true;
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
                                <h4>{dataJSON.signup.title}</h4>
                                <h6 className="font-weight-light">
                                    {dataJSON.signup.description}
                                </h6>
                                <Form.Group controlId="username" className="pt-3">
                                    <Form.Label>Nama Pengguna</Form.Label>
                                    <Form.Control
                                        autoFocus="on"
                                        autoComplete="off"
                                        onChange={change}
                                        type="text"
                                        placeholder="Nama pengguna"
                                    />
                                </Form.Group>
                                <Form.Group controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        onChange={change}
                                        type="email"
                                        placeholder="Email"
                                    />
                                </Form.Group>
                                <Form.Group controlId="password">
                                    <Form.Label>Kata Sandi</Form.Label>
                                    <Form.Control
                                        onChange={change}
                                        type="password"
                                        placeholder="5 karakter atau lebih"
                                    />
                                </Form.Group>
                                <Button
                                    variant="primary"
                                    type="submit"
                                    style={{ width: "100%" }}
                                    disabled={disabled | isLoading}
                                >
                                    {isLoading ? 'tunggu..' : 'Buat Akun'}
                                </Button>
                                <div className="text-center mt-4 font-weight-light">
                                    Sudah punya akun? {'\r\n'}
                                    <NavLink
                                        to="/auth"
                                        className="text-primary"
                                    >Log In</NavLink>
                                </div>
                            </Form>
                        </Col>
                        <Col lg={6} className={dataJSON.signup.bgClassName + " d-flex m-0 flex-row"}>
                            <p className="text-white font-weight-medium text-center flex-grow align-self-end">
                                {config.copyright} {new Date().getFullYear()} &copy; All Rights Reserved.
                            </p>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    );
}

export default Signup;