import React from 'react';
// import { NavLink } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import BoxCover from '../../../components/molecules/BoxCover';
import dummy from '../../../assets/img/dummy_general.jpg';

function Administrator(props) {
    return (
        <Container className="g-mt-60 py-60">
            <Row>
                <Col lg={12}>
                    <Row md={12} className="justify-content-center">
                        <div className="mx-3">
                            <BoxCover
                                image={dummy}
                                title="Andi Naeta"
                                description="Situs ini"
                                onClick={() => props.history.push('/_rdn/administrator/andinaeta')} />
                        </div>
                        <div className="mx-3">
                            <BoxCover
                                image={dummy}
                                title="Naeta Store"
                                description="Aplikasi E-commerce"
                                onClick={() => props.history.push('/_rdn/administrator/naetastore')} />
                        </div>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Administrator;