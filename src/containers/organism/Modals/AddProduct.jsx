import React from 'react';
import { Modal, Button, Container, Row, Col, Form } from 'react-bootstrap';
import dummy from '../../../assets/img/dummy_product.jpg';
import axios from 'axios';
import { REST } from '../../../config/REST';

class AddProduct extends React.Component {

    state = {
        product: {
            name: '',
            price: 0,
            qty: 0,
            image: null,
            description: '',
            category_id: 0,
            suggested: 0,
            is_ready: 1
        },
        preview: null,
        disabled: true,
        category: [],
        initialized: false
    }

    componentDidMount() {
        this.setState({ preview: dummy });
    }

    componentDidUpdate() {
        if (this.props.show && !this.state.initialized) this.getDataCategory();
    }

    getDataCategory = () => {
        axios.get(`${REST.server.url}api/category`)
            .then(res => {
                this.setState({ category: res.data.category, initialized: true });
            }).catch(err => console.error(err));
    }

    changeValue = e => {
        let product = { ...this.state.product };

        if (e.target.files) {
            const image = e.target.files[0];
            const reader = new FileReader();

            product['image'] = image;

            reader.onload = () => {
                this.setState({ preview: reader.result });
            }

            reader.readAsDataURL(image);
        } else {
            product[e.target.id] = e.target.value;
        }

        this.setState({ product });

        if (
            product.name.length > 0 &&
            Number(product.price) > 0 &&
            Number(product.qty) > 0 &&
            product.image !== null &&
            product.description.length > 0 &&
            Number(product.category_id) !== 0
        ) {
            this.setState({ disabled: false });
        } else {
            this.setState({ disabled: true });
        }
    }

    submit = () => {
        this.props.onSubmit(this.state.product);
        let product = { ...this.state.product };
        product['image'] = null;
        this.setState({ product, preview: dummy, disabled: true });
    }

    changeCheckboxe = e => {
        let product = { ...this.state.product };

        const currentValue = product[e.target.id];

        if (currentValue === 0) {
            product[e.target.id] = 1;
        } else {
            product[e.target.id] = 0;
        }

        this.setState({ product });
    }

    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Tambah Product
                </Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        <Container className="m-0 p-0">
                            <Row className="show-grid">
                                <Col xs={5}>
                                    <input
                                        onChange={this.changeValue}
                                        ref={fileInput => this.fileInput = fileInput}
                                        type="file" className="d-none" id="image"
                                    />
                                    <img
                                        style={{ cursor: "pointer" }}
                                        onClick={() => this.fileInput.click()}
                                        src={this.state.preview}
                                        className="mb-3 img-fluid"
                                        alt="preview"
                                        height="300px"
                                    />
                                </Col>
                                <Col xs={7}>
                                    <Form.Group controlId="name">
                                        <Form.Control onChange={this.changeValue} type="text" placeholder="Nama barang" />
                                    </Form.Group>

                                    <Row>
                                        <Col xs={6}>
                                            <Form.Group controlId="price">
                                                <Form.Control onChange={this.changeValue} type="number" placeholder="Harga" />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group controlId="qty">
                                                <Form.Control onChange={this.changeValue} type="number" placeholder="Kuantitas" />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Form.Group controlId="category_id">
                                        <Form.Control
                                            as="select"
                                            onChange={this.changeValue}
                                        >
                                            <option value={0}>Pilih kategori</option>
                                            {this.state.category.map((c, i) =>
                                                <option value={c.id} key={i}>{c.name}</option>
                                            )}
                                        </Form.Control>
                                    </Form.Group>


                                    <Row>
                                        <Col xs={6}>
                                            <Form.Group>
                                                <span>Disarankan?</span>
                                                <input
                                                    className="ml-2"
                                                    onChange={this.changeCheckboxe}
                                                    type="checkbox"
                                                    id="suggested"
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group>
                                                <span>Ready?</span>
                                                <input
                                                    className="ml-2"
                                                    onChange={this.changeCheckboxe}
                                                    type="checkbox"
                                                    id="is_ready"
                                                    defaultChecked="checked"
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>


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
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.onHide}>Tutup</Button>
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

export default AddProduct;