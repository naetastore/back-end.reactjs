import React from 'react';
import { Modal, Button, Container, Row, Form, Col } from 'react-bootstrap';
import axios from 'axios';
import { REST } from '../../../config/REST';

class AddCategory extends React.Component {

    state = {
        data: {
            name: '',
            description: '',
            global_id: 0
        },
        general: [],
        disabled: true,
        initialized: false
    }

    componentDidUpdate() {
        if (this.props.show && !this.state.initialized) this.getDataGeneral();
    }

    getDataGeneral = () => {
        axios.get(`${REST.server.url}api/general`)
            .then(res => {
                this.setState({ general: res.data.general, initialized: true });
            }).catch(err => console.error(err));
    }

    initState = () => {
        const data = {
            name: '',
            description: '',
            global_id: 0
        };
        this.setState({ data, disabled: true });
    }

    changeValue = e => {
        let data = { ...this.state.data };

        data[e.target.id] = e.target.value;

        this.setState({ data });

        if (
            data.name.length > 0 &&
            data.description.length > 0 &&
            Number(data.global_id) > 0
        ) {
            this.setState({ disabled: false });
        } else {
            this.setState({ disabled: true });
        }
    }

    submit = () => {
        this.props.onSubmit(this.state.data);
        this.initState();
    }

    render() {
        return (
            <Modal
                {...this.props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Tambah Kategori
                </Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        <Container className="m-0 p-0">
                            <Row className="show-grid text-center">
                                <Col xs={12}>
                                    <Form.Group controlId="name">
                                        <Form.Control
                                            onChange={this.changeValue}
                                            type="text"
                                            placeholder="Nama kategori"
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="description">
                                        <Form.Control
                                            as="textarea"
                                            rows="3"
                                            placeholder="Deskripsi Max. 64 karakter"
                                            maxLength={64}
                                            onChange={this.changeValue}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="global_id">
                                        <Form.Control
                                            as="select"
                                            onChange={this.changeValue}
                                        >
                                            <option value={0}>Pilih kategori umum</option>
                                            {this.state.general.map((g, i) =>
                                                <option value={g.id} key={i}>{g.name}</option>
                                            )}
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.onHide}>Tutup</Button>
                        <Button
                            disabled={this.state.disabled}
                            onClick={this.submit}
                        >Simpan</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        );
    }
}

export default AddCategory;