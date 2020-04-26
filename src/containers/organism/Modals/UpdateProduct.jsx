import React from 'react';
import { Modal, Button, Container, Row, Col, Form } from 'react-bootstrap';
import axios from 'axios';
import { REST } from '../../../config/REST';

class UpdateProduct extends React.Component {

    state = {
        product: {},
        preview: null,
        disabled: false,
        category: [],
        initialized: false
    }

    componentDidUpdate() {
        if (this.props.show && !this.state.initialized) {
            this.getData();
            this.setState({ initialized: true });
        }
        if (!this.props.show && this.state.initialized) {
            this.setState({ initialized: false, product: {} });
        }
    }

    getData = () => {
        axios.get(`${REST.server.url}api/category`)
            .then(res => {
                let product = { ...this.props.data };

                const price = product.price.replace('.', '');
                const qty = product.qty.replace('.', '');

                product['price'] = price;
                product['qty'] = qty;
                product['category_name'] = res.data.category.find(c => c.id === product.category_id).name;

                const category = res.data.category.filter(c => c.id !== product.category_id);

                this.setState({ category, product, preview: product.image });
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
        let details = this.state.product;
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Product ID #{details.id}
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
                                        <Form.Control
                                            defaultValue={details.name}
                                            onChange={this.changeValue}
                                            type="text"
                                            placeholder="Nama barang" />
                                    </Form.Group>

                                    <Row>
                                        <Col xs={6}>
                                            <Form.Group controlId="price">
                                                <Form.Control
                                                    defaultValue={details.price}
                                                    onChange={this.changeValue}
                                                    type="number"
                                                    placeholder="Harga" />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group controlId="qty">
                                                <Form.Control
                                                    defaultValue={details.qty}
                                                    onChange={this.changeValue}
                                                    type="number"
                                                    placeholder="Kuantitas" />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Form.Group controlId="category_id">
                                        <Form.Control
                                            as="select"
                                            onChange={this.changeValue}
                                        >
                                            <option value={details.category_id}>{details.category_name}</option>
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
                                                    checked={Number(details.suggested) === 1 ? "checked" : ""}
                                                    onChange={this.changeCheckboxe}
                                                    type="checkbox"
                                                    id="suggested" />
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
                                                    checked={Number(details.is_ready) === 1 ? "checked" : ""} />
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
                                            defaultValue={details.description}
                                        />
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
                            onClick={() => this.props.onSubmit(this.state.product)}
                        >{this.props.isloading === 'true' ? 'Memuat' : 'Simpan'}</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        )
    };
}

export default UpdateProduct;