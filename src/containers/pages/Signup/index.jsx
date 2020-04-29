import React, { useState, useEffect } from 'react';
import './index.css';
import axios from 'axios';
import { REST } from '../../../config/REST';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

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

    const submit = event => {
        event.preventDefault();

        setIsLoading(true);

        axios.post(`${REST.server.url}api/users`, data)
            .then(res => {
                console.log(res);

                setIsLoading(false);
            }).catch(err => {
                console.error(err.response);
                const errorMessage = err.response.data.message;

                setErrorMessage(errorMessage);

                setIsLoading(false);
            });
    }

    return (
        <div className="container-scroller">
            <Container fluid className="page-body-wrapper full-page-wrapper">
                <div className="content-wrapper d-flex mb-0 align-items-stretch auth auth-img-bg">
                    <Row className="flex-grow">
                        <Col lg={6} className="d-flex m-0 align-items-center justify-content-center">
                            <div className="text-danger"
                                style={{
                                    position: "absolute",
                                    bottom: "0"
                                }}
                            >{errorMessage}</div>
                            <Form onSubmit={submit} style={{ width: "50%" }}>
                                <h4>New here?</h4>
                                <h6 className="font-weight-light">Join us today! It takes only few steps</h6>
                                <Form.Group controlId="username" className="pt-3">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        onChange={change}
                                        type="text"
                                        placeholder="Username"
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
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        onChange={change}
                                        type="password"
                                        placeholder="Password"
                                    />
                                </Form.Group>
                                <Button
                                    variant="primary"
                                    type="submit"
                                    style={{ width: "100%" }}
                                    disabled={disabled | isLoading}
                                >
                                    {isLoading ? 'wait..' : 'Sign Up'}
                                </Button>
                                <div className="text-center mt-4 font-weight-light">
                                    Already have an account? <NavLink to="/auth" className="text-primary">Login</NavLink>
                                </div>
                            </Form>
                        </Col>
                        <Col lg={6} className="login-half-bg d-flex m-0 flex-row">
                            <p className="text-white font-weight-medium text-center flex-grow align-self-end">
                                Copyright &copy; {new Date().getFullYear()} All rights reserved.</p>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    );
}

export default Signup;