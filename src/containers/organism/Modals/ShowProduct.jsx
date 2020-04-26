import React from 'react';
import { Modal, Card, Button, ListGroup, Figure, Container, Row, Col } from 'react-bootstrap';

function ShowProduct(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    ID Product #{props.data.id}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container className="m-0 p-0">
                    <Row className="show-grid">
                        <Col xs={5}>
                            <Figure>
                                <Figure.Image
                                    width="100%"
                                    // height={180}
                                    alt="171x180"
                                    src={props.data.image}
                                />
                            </Figure>
                        </Col>
                        <Col xs={7}>
                            <Card>
                                <Card.Header>{props.data.name}</Card.Header>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>Harga {props.data.price}</ListGroup.Item>
                                    <ListGroup.Item>Kuantitas {props.data.qty}</ListGroup.Item>
                                    <ListGroup.Item>{props.data.description}</ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Tutup</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ShowProduct;