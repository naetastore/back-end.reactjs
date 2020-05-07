import React, { Fragment } from 'react';
import './index.css';
import { Jumbotron, Container, Row, Col, Image } from 'react-bootstrap';
import NSUI from '../../../assets/img/NS UI.png';
import NSUI1 from '../../../assets/img/NS UI (1).png';
import data from '../../../data.json';
import config from '../../../config.json';
import Header from '../../../components/molecules/Container/Section/Header';
import Blockquote from '../../../components/molecules/Blockquote';
import { NavLink } from 'react-router-dom';
import Blog from './Blog';

function Root(props) {

    return (
        <Fragment>
            <Jumbotron
                fluid
                className={data.root.jumbotron.bgClassName + " mb-0 py-60 bg-img-hero"}
            >
                <div className="mb-50">
                    <h1 className="color-primary font-weight-700 font-size-50 font-size-60--md mb-30">
                        {config.bio.name}
                    </h1>
                    <h2 className="mb-0 color-white-opacity-0_8 font-weight-300 font-size-20 font-size-25--sm font-size-35--md"
                    >{config.bio.role}</h2>
                </div>
                <Container>
                    <Row className="justify-content-center block-bio">
                        {config.bio.links.map((u, i) =>
                            <Col md={3} key={i}>
                                <h3 className="h6">{u.head}</h3>
                                <a className="color-primary transition-ease-in-out-0_15 color-white--hover" href={u.url}>{u.public}</a>
                            </Col>
                        )}
                    </Row>
                </Container>
            </Jumbotron>

            <section id="about" className="py-40 bg-white m-0">
                <Container>
                    <Row>
                        <Col lg={6}>
                            <Header title="About">
                                Who is
                                <br />
                                {config.bio.name.split(' ')[0]}?
                            </Header>
                            {data.root.about.description.map((desc, i) =>
                                <p className="mb-1" key={i}>{desc}</p>
                            )}
                            <ul className="mt-3 list-unstyled text-uppercase mb-0">
                                {data.root.about.roles.map((s, i) =>
                                    <li key={i} className="py-2">
                                        {s}
                                    </li>
                                )}
                            </ul>
                        </Col>
                        <Col lg={6} className="bg-bio bg-img-hero rounded-sm">dummy image</Col>
                    </Row>
                </Container>
            </section>

            <section id="quote" className="py-120 m-0 bg-light">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={8}>
                            <Blockquote by={data.root.quote.by}>{data.root.quote.quote}</Blockquote>
                        </Col>
                    </Row>
                </Container>
            </section>


            <section id="blog" className="py-40 bg-white m-0">
                <Container className="text-center">
                    <Header title="My blog">{data.root.blog.title}</Header>
                    <div className="mb-60">
                        {data.root.blog.description.map((desc, i) =>
                            <p key={i} className="mb-1">{desc}</p>
                        )}
                    </div>
                    <Row className="no-gutters">
                        <Blog {...props} />
                    </Row>
                </Container>
            </section>

            <section id="project" className="py-40 bg-gray-light m-0">
                <Container>
                    <Row>
                        <Col lg={5}>
                            <Header title={config.bio.name.split(' ')[0] + '\'s'}>
                                {data.root.project.title}
                            </Header>
                            {data.root.project.description.map((desc, i) =>
                                <p key={i}>{desc}</p>
                            )}
                            {data.root.project.apps.map((app, i) =>
                                <a key={i}
                                    className="font-weight-600
                                        bg-linear-gradient
                                        bg-linear-gradient-v2--hover
                                        text-white
                                        rounded-sm p-2 mr-2"
                                    href={app.url}
                                >{app.name}</a>
                            )}
                        </Col>
                        <Col lg={7} className="text-center project">
                            <Image className="m-2 shdw brd-around brd-primary--hover" src={NSUI} height="400px" alt="product" />
                            <Image className="m-2 shdw brd-around brd-primary--hover" src={NSUI1} height="400px" alt="product" />
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* <section id="callToAction" className="py-40 bg-dark-v2 color-gray-light m-0 p-4 shadow-light-top">
                <Container>
                    <Row className="justify-content-md-around">
                        <Col md={8} className="align-self-md-center">
                            <h2 className="h3 text-uppercase font-weight-300 mb-20 mb-0--md">
                                Buka untuk project <strong>baru</strong> saya
                            </h2>
                        </Col>
                        <Col md={4} className="align-self-md-center text-md-center">
                            <NavLink
                                to="/client/register"
                                className="transition-ease-in-out-0_15 text-white bg-primary-v2 color-black bg-white--hover py-2 px-5 font-weight-500"
                            >Daftar</NavLink>
                        </Col>
                    </Row>
                </Container>
            </section> */}
            <section id="callToAction" className={data.root.callToAction.bgClassName + " py-40 bg-img-hero color-gray-light m-0 p-4 shadow-light-top"}>
                <Container>
                    <Row>
                        <Col md={12} className="justify-content-center d-lg-flex">
                            <h2 className="h3 text-uppercase font-weight-300 mb-20 mb-0--md">
                                Buka untuk project <strong>baru</strong> saya
                            </h2>
                            <NavLink
                                to="/client/register"
                                className="ml-3 transition-ease-in-out-0_15 text-white bg-primary-v2 color-black bg-white--hover py-2 px-5 font-weight-500"
                            >Daftar</NavLink>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Fragment>
    );
}

export default Root;