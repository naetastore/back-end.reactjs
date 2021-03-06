import React from 'react';
import { Modal, Button, Container, Row, Form, Col } from 'react-bootstrap';
import axios from 'axios';
import { REST } from '../../../config/REST';

class AddUser extends React.Component {

    state = {
        data: {
            username: '',
            password: ''
        },
        disabled: true
    }

    initState = () => {
        const data = {
            username: '',
            password: ''
        };
        this.setState({ data, disabled: true });
    }

    changeValue = e => {
        let data = { ...this.state.data };

        data[e.target.id] = e.target.value;

        this.setState({ data });

        if (Object.values(data).includes('')) {
            this.setState({ disabled: true });
        } else {
            this.setState({ disabled: false });
        }
    }

    submit = () => {
        axios.post(`${REST.server.naetastore}api/users`, { username: this.state.data.username })
            .then(res => {
                this.props.onSubmit(this.state.data);
                this.initState();
            }).catch(err => {
                console.error(err);
                const errorMessage = err.response.data.message;
                alert(errorMessage);
            });
    }

    render() {
        return (
            <Modal
                {...this.props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Form className="pt-3">
                    <Modal.Body>
                        <Container className="m-0 p-0">
                            <Row className="show-grid text-center mx-auto">
                                <Col md={12} xs={12}>
                                    <Form.Group controlId="username">
                                        <Form.Control
                                            onChange={this.changeValue}
                                            type="text"
                                            placeholder="Nama pengguna"
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="password">
                                        <Form.Control
                                            onChange={this.changeValue}
                                            type="password"
                                            placeholder="Kata sandi"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer className="p-1">
                        <Button
                            size="sm"
                            variant="outline-secondary"
                            onClick={this.props.onHide}
                        >Batalkan</Button>
                        <Button
                            size="sm"
                            disabled={this.state.disabled}
                            onClick={this.submit}
                        >Simpan</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        );
    }

}

export default AddUser;