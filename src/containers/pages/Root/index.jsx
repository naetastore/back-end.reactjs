import React, { Fragment } from 'react';
import './index.css';
import { Jumbotron, Container, Row, Col, Image } from 'react-bootstrap';
import NSUI from '../../../assets/img/NS UI.png';
import NSUI1 from '../../../assets/img/NS UI (1).png';
import Data from './Data.json';

function Root(props) {
    return (
        <Fragment>
            <Jumbotron fluid className="mb-0">
                <h1>Andi Naeta</h1>
                <h2><code>{'< Just Write Code />'}</code></h2>
            </Jumbotron>

            <section id="about" className="py-40 bg-white m-0">
                <Container>
                    <Row>
                        <Col lg={5}>
                            <header className="text-uppercase heading--bottom brd-primary mb-4">
                                <h4 className="h6">About</h4>
                                <h2 className="h1">
                                    Who is andi
                                    <br />
                                    naeta?
                                </h2>
                            </header>
                            {Data.about.description.map((desc, i) =>
                                <p className="mb-0" key={i}>{desc}</p>
                            )}
                            <ul className="list-unstyled text-uppercase mb-0">
                                {Data.about.items.map((s, i) =>
                                    <li key={i} className="py-2">
                                        {s}
                                    </li>
                                )}
                            </ul>
                        </Col>
                        <Col lg={7} className="bg-img-hero dummy-image-1600x1920"></Col>
                    </Row>
                </Container>
            </section>

            <section id="projects" className="py-40 m-0 bg-white">
                <Container>
                    <Row>
                        <Col lg={5}>
                            <header className="text-uppercase heading--bottom brd-primary mb-4">
                                <h4 className="h6">From me</h4>
                                <h2 className="h1">
                                    Projects
                                </h2>
                            </header>
                            {Data.projects.description.map((desc, i) =>
                                <p key={i}>{desc}</p>
                            )}
                        </Col>
                        <Col lg={7} className="text-center project">
                            <Image className="m-2 shdw brd-around brd-primary--hover" src={NSUI} height="400px" alt="product" />
                            <Image className="m-2 shdw brd-around brd-primary--hover" src={NSUI1} height="400px" alt="product" />
                        </Col>
                    </Row>
                </Container>
            </section>

            <section id="services" className="py-40 bg-sample color-gray-light m-0">
                <Container className="text-center">
                    <header className="brd-primary heading--bottom text-uppercase mb-4">
                        <h4 className="h6">Our service</h4>
                        <h2 className="h1">{Data.services.title}</h2>
                    </header>
                    <p className="mb-60">{Data.services.description}</p>
                    <Row className="no-gutters">
                        {Data.services.data.map((s, i) =>
                            <Col key={i} md={6} lg={3} className="mx-auto brd-around brd-gray-light-v3 brd-primary--hover">
                                <div className="text-center px-2 py-5">
                                    <h3 className="h5 text-uppercase">{s.name}</h3>
                                    <p className="color-white-opacity-0_7">{s.description}</p>
                                    <div className="d-inline-block brd-bottom width-40 brd-2 brd-primary my-3"></div>
                                    <ul className="list-unstyled text-uppercase mb-0">
                                        {s.items.map((item, sindex) =>
                                            <li key={sindex} className="brd-bottom brd-gray-light-v3 py-2">
                                                {item}
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </Col>
                        )}
                    </Row>
                </Container>
            </section>
        </Fragment>
    );
}

export default Root;