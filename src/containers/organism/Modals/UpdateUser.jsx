import React from 'react';
import { Modal, Button, Container, Row, Form, Col } from 'react-bootstrap';

class UpdateUser extends React.Component {

    state = {
        data: {
            id: 0,
            repassword: ''
        },
        disabled: false,
        initialized: false
    }

    componentDidUpdate() {
        if (this.props.show && !this.state.initialized) {
            this.getData();
            this.setState({ initialized: true });
        }
        if (!this.props.show && this.state.initialized) {
            this.setState({ initialized: false, data: {} });
        }
    }

    getData = () => {
        const data = {
            id: this.props.data.id
        };
        this.setState({ data });
    }

    changeValue = e => {
        let data = { ...this.state.data };

        data[e.target.id] = e.target.value;

        this.setState({ data });
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
                                    <Form.Group controlId="repassword">
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
                            disabled={this.props.isloading === 'true' ? true : this.state.disabled}
                            onClick={this.props.onHide}
                        >Batalkan</Button>
                        {this.props.children}
                        <Button
                            size="sm"
                            variant="success"
                            disabled={this.props.isloading === 'true' ? true : this.state.disabled}
                            onClick={() => this.props.onSubmit(this.state.data)}
                        >Simpan Perubahan</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        );
    }
}

export default UpdateUser;