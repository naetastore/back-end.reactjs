import React from 'react';
import { Modal, Button, Container, Row, Form, Col } from 'react-bootstrap';
import axios from 'axios';
import { REST } from '../../../config/REST';

class UpdateCategory extends React.Component {

    state = {
        data: {
            name: '',
            description: '',
            global_id: 0
        },
        disabled: false,
        general: [],
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
        axios.get(`${REST.server.url}api/general`)
            .then(res => {
                let data = { ...this.props.data };

                const general = res.data.general.filter(g => g.id !== data.global_id);
                data['global_name'] = res.data.general.find(g => g.id === data.global_id)['name'];

                this.setState({ general, data });
            }).catch(err => console.error(err));
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

    render() {
        let details = this.state.data;
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
                                            defaultValue={details.name}
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
                                            defaultValue={details.description}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="global_id">
                                        <Form.Control
                                            as="select"
                                            onChange={this.changeValue}
                                        >
                                            <option value={details.global_id}>{details.global_name}</option>
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
                        {this.props.children}
                        <Button
                            disabled={this.props.isloading === 'true' ? true : this.state.disabled}
                            onClick={() => this.props.onSubmit(this.state.data)}
                        >Simpan</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        );
    }
}

export default UpdateCategory;