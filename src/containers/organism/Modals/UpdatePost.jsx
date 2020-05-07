import React from 'react';
import { Modal, Button, Container, Row, Form, Col } from 'react-bootstrap';
import { REST } from '../../../config/REST';
import Axios from 'axios';

class UpdatePost extends React.Component {

    state = {
        data: {},
        preview: null,
        disabled: false,
        categories: [],
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
        Axios.get(`${REST.server.andinaeta}api/categories`)
            .then(res => {
                let data = { ...this.props.data };

                data['category_name'] = res.data.find(c => c.id === data.category_id).name;

                const categories = res.data.filter(c => c.id !== data.category_id);

                this.setState({ categories, data, preview: data.image });
            }).catch(err => console.error(err));
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
            data.title.length > 0 &&
            data.body.length > 0 &&
            Number(data.category_id) > 0 &&
            data.image !== null
        ) {
            this.setState({ disabled: false });
        } else {
            this.setState({ disabled: true });
        }
    }

    render() {
        const details = this.state.data;
        return (
            <Modal
                {...this.props}
                size="lg"
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
                                    <Form.Group controlId="title">
                                        <Form.Control
                                            defaultValue={details.title}
                                            onChange={this.changeValue}
                                            type="text"
                                            placeholder="Judul"
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="body">
                                        <Form.Control
                                            defaultValue={details.body}
                                            as="textarea"
                                            rows={4}
                                            onChange={this.changeValue}
                                            type="text"
                                            placeholder="Body"
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="category_id">
                                        <Form.Control
                                            as="select"
                                            onChange={this.changeValue}
                                        >
                                            <option value={details.category_id}>{details.category_name}</option>
                                            {this.state.categories.map((g, i) =>
                                                <option value={g.id} key={i}>{g.name}</option>
                                            )}
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer className="p-1">
                        <Button
                            variant="outline-secondary"
                            disabled={this.props.isloading === 'true' ? true : false}
                            onClick={this.props.onHide}
                        >Batalkan</Button>
                        {this.props.children}
                        <Button
                            variant="success"
                            disabled={this.props.isloading === 'true' ? true : this.state.disabled}
                            onClick={() => this.props.onSubmit(this.state.data)}
                        >{this.props.isloading === 'true' ? 'Sedang Menyimpan' : 'Simpan Perubahan'}</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        )
    }
}

export default UpdatePost;