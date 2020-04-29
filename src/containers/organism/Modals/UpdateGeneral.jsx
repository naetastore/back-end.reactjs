import React from 'react';
import { Modal, Button, Container, Row, Form, Col } from 'react-bootstrap';

class UpdateGeneral extends React.Component {

    state = {
        data: {},
        preview: null,
        disabled: false,
        initialized: false
    };

    componentDidUpdate() {
        if (this.props.show && !this.state.initialized) {
            this.setState({
                data: this.props.data,
                preview: this.props.data.image,
                initialized: true
            });
        }
        if (!this.props.show && this.state.initialized) {
            this.setState({ data: {}, initialized: false });
        }
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

    render() {
        let details = this.state.data;
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
                            <Row className="show-grid text-center">
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

export default UpdateGeneral;