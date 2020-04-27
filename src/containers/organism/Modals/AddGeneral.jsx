import React from 'react';
import { Modal, Button, Container, Row, Form, Col } from 'react-bootstrap';
import dummy from '../../../assets/img/dummy_general.jpg';

class AddGeneral extends React.Component {

    state = {
        data: {
            name: '',
            description: '',
            image: null
        },
        preview: null,
        disabled: true
    }

    componentDidMount() {
        this.setState({ preview: dummy });
    }

    initState = () => {
        const data = {
            name: '',
            description: '',
            image: null
        };
        this.setState({ data, preview: dummy, disabled: true });
    }

    changeValue = e => {
        let data = { ...this.state.data };

        if (e.target.files) {
            const image = e.target.files[0];
            const reader = new FileReader();

            data['image'] = image;

            reader.onload = () => {
                this.setState({ preview: reader.result });
            }

            reader.readAsDataURL(image);
        } else {
            data[e.target.id] = e.target.value;
        }

        this.setState({ data });

        if (
            data.name.length > 0 &&
            data.description.length > 0 &&
            data.image !== null
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
                <Form className="pt-3">
                    <Modal.Body>
                        <Container className="m-0 p-0">
                            <Row className="show-grid text-center mx-auto">
                                <Col md={6} xs={12}>
                                    <input
                                        onChange={this.changeValue}
                                        ref={fileInput => this.fileInput = fileInput}
                                        type="file" className="d-none" id="image"
                                    />
                                    <img
                                        style={{ cursor: "pointer" }}
                                        onClick={() => this.fileInput.click()}
                                        src={this.state.preview}
                                        className="mb-3 img-fluid img-thumbnail"
                                        alt="preview"
                                    />
                                </Col>
                                <Col md={6} xs={12}>
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
                                </Col>
                            </Row>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer className="p-1">
                        <Button
                            variant="outline-secondary"
                            onClick={this.props.onHide}
                        >Batalkan</Button>
                        <Button
                            disabled={this.state.disabled}
                            onClick={this.submit}
                        >Simpan</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        )
    };
}

export default AddGeneral;