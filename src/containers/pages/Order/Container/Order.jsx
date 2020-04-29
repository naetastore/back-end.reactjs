import React, { useEffect, useState } from 'react';
import { Row, Col, Image, Button, Tab, Nav } from 'react-bootstrap';
import OrderStatus from '../../../../components/molecules/OrderStatus';
import dummy from '../../../../assets/img/dummy_product.jpg';

function Description(props) {

    const [initialized, setInitialized] = useState(false);
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (!initialized && props.data.purchased) {
            generateDesc();
        }
    });

    const generateDesc = () => {
        let desc = '';

        if (Number(props.data.purchased) > 0) {
            desc = 'Dikonfirmasi ' + props.data.updated;
        } else {
            if (Number(props.data.canceled) > 0) {
                desc = 'Dibatalkan ' + props.data.deleted;
            } else {
                desc = 'Dibuat ' + props.data.created;
            }
        }

        setDescription(desc);
        setInitialized(true);
    }

    return (
        <h5>{description}</h5>
    );
}

function Product(props) {

    const { useraccess, product } = props.data;

    return (
        <div>
            <div className="mb-3 mt-2">
                <Description data={product[0]} />
                <p className="color-gray-dark">
                    Your package was delivered per the instructions.
                </p>
                <div className="mb-3">
                    {useraccess.hasConfirm
                        ? <Button
                            variant="outline-primary"
                            onClick={() => props.confirmFunc(product[0].entry)}
                        >Confirm it</Button> : ''}
                    {useraccess.hasDelete
                        ? <Button
                            variant="outline-danger"
                        >Delete it</Button> : ''}
                </div>
            </div>

            {product.map((p, i) =>
                <Row key={i}>
                    <Col md={4} sm={3}>
                        <Image width="150" fluid src={p.image} alt="product" />
                    </Col>
                    <Col md={8} sm={9}>
                        <div className="text-success mb-2">
                            {p.name}
                        </div>
                        <span className="mb-2 d-block">Qty: {p.qty}</span>
                        <span className="text-danger mb-2 d-block">{p.price}</span>
                    </Col>
                </Row>
            )}
        </div>
    );
}

function Order(props) {

    const [initialized, setInitialized] = useState(false);
    const [data, setData] = useState([{
        order: {
            consumer: {},
            summary: {
                product: [{ image: dummy }],
                detail: {}
            }
        },
        useraccess: {}
    }]);

    useEffect(() => {
        if (!initialized && props.data) {
            getData();
        }
        if (initialized && props.data !== data) {
            getData();
        }
    });

    const getData = () => {
        setData(props.data);
        console.log(props.data);
        setInitialized(true);
    }

    return (
        <Row className="-p_ mx-auto">
            <Col md={12}>
                {data.map((d, i) =>
                    <div key={i} className="rounded-sm px-0 mb-3" style={{ border: "1px solid #eee" }}>
                        <header className="bg-light p-3">
                            <Row className="font-size-12">
                                <Col sm={3} md={2} className="mb-2">
                                    <div className="color-gray-dark">TANGGAL BUAT</div>
                                    <div>{d.order.summary.product[0].created}</div>
                                </Col>
                                <Col sm={3} md={2} className="mb-2">
                                    <div className="color-gray-dark">TOTAL</div>
                                    <div>{d.order.summary.detail.total}</div>
                                </Col>
                                <Col sm={3} md={2} className="mb-2">
                                    <div className="color-gray-dark">DIKIRIM KE</div>
                                    <div>{d.order.consumer.username}</div>
                                </Col>
                                <Col sm={3} md={4} className="ml-auto mb-2 text-sm-right">
                                    <div className="color-gray-dark">ORDER #{d.order.summary.product[0].id}</div>
                                    <div className="text-success">
                                        <OrderStatus data={d.order.summary.product[0]} />
                                    </div>
                                </Col>
                            </Row>
                        </header>
                        <div className="p-4">
                            <Tab.Container
                                defaultActiveKey="product">
                                <Row>
                                    <Col md={8}>
                                        <Tab.Content>
                                            <Tab.Pane eventKey="product">
                                                <Product data={{
                                                    product: d.order.summary.product,
                                                    useraccess: d.useraccess
                                                }} confirmFunc={props.confirmFunc} />
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="writereview">
                                                <Product data={{
                                                    product: d.order.summary.product,
                                                    useraccess: d.useraccess
                                                }} />
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </Col>
                                    <Col md={4}>
                                        <Nav style={{ display: "initial" }}>
                                            <Nav.Item>
                                                <Nav.Link
                                                    eventKey="product"
                                                    className="btn-block text-right"
                                                >Produk</Nav.Link>
                                                <Nav.Link
                                                    eventKey="writereview"
                                                    className="btn-block text-right"
                                                >Tulis Review</Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                    </Col>
                                </Row>
                            </Tab.Container>
                        </div>
                    </div>
                )}
            </Col>
        </Row>
    );
}

export default Order;