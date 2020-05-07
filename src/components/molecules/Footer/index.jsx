import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import config from '../../../config.json';
import data from '../../../data.json';
import Logo from '../../../assets/img/logo/logo.svg';
import { NavLink } from 'react-router-dom';

function Footer() {
    return (
        <footer className={data.footer.bgClassName + " color-gray-light pt-100 pb-60"}>
            <Container>
                <Row className="justify-content-beetwen">
                    <Col lg={3} className="mb-30">
                        <NavLink to="/" className="d-inline-block mb-4">
                            <Image className="rounded-10" src={Logo} height="40px" alt="logo" />
                        </NavLink>
                        <p className="font-size-13 mb-0">
                            {config.copyright} {new Date().getFullYear()} © All Rights Reserved.
                        </p>
                    </Col>
                    <Col sm={6} lg={2} className="ml-auto mb-30">
                        <ul className="list-unstyled font-size-13 mb-0">
                            {data.footer.links.map((l, i) =>
                                <li className="my-2" key={i}>
                                    <a href={l.url} className="color-primary--hover">
                                        {l.label}
                                    </a>
                                </li>
                            )}
                        </ul>
                    </Col>
                    <Col sm={6} lg={3} className="mb-30">
                        <h3 className="h6 font-weight-600 text-uppercase mb-4">
                            Ikuti saya
                        </h3>
                        <ul className="list-inline mb-0">
                            {config.bio.links.map((u, i) =>
                                <li key={i} className="list-inline-item mx-2">
                                    <a title={u.public} href={u.url} className="color-primary--hover">
                                        <i className={"rounded-circle icon__elem-regular " + u.icon}></i>
                                    </a>
                                </li>
                            )}
                        </ul>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;