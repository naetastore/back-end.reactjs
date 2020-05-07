import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import config from '../../../../config.json';
import data from '../../../../data.json';
import session from '../../../../config/session';
import AlertOrg from '../../../organism/Alert';
import { api } from '../../../../services/api';

function Register(props) {

    const [initialized, setInitialized] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        domain: '',
        description: '',
        seo_keyword: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (!initialized) {
            checkSession();
        }
        window.scroll(0, 0);
    });

    const init = () => {
        setFormData({
            name: '',
            domain: '',
            description: '',
            seo_keyword: ''
        });
    }

    const checkSession = () => {
        if (!session.get('username')) {
            props.history.push('/auth?client/register');
        }
        setInitialized(true);
    }

    const changeValue = e => {
        let newData = { ...formData };
        newData[e.target.id] = e.target.value;
        setFormData(newData);
    }

    const submit = async event => {
        event.preventDefault();

        if (Object.values(formData).includes('')) { return }

        setIsLoading(true);

        formData['username'] = session.get('username');
        formData['password'] = session.get('password');
        try {
            const res = await api.post('websites', formData);
            setIsLoading(false);
            if (res.status === 201) {
                setMessage('Permintaan Anda berhasil dikirim..');
            }
            init();
        } catch (err) {
            const errorMessage = err.response.data.message;
            setErrorMessage(errorMessage);
            setIsLoading(false);
        }
    }

    function ShowAlert() {
        if (errorMessage) {
            return (
                <AlertOrg variant="danger" onHide={() => setErrorMessage('')}>
                    {errorMessage}
                </AlertOrg>
            );
        } else {
            if (message) {
                return (
                    <AlertOrg variant="success" onHide={() => setMessage('')}>
                        {message}
                    </AlertOrg>
                );
            } else {
                return false;
            }
        }
    }

    return (
        <section className={data.client.register.bgClassName + " g-mt-60 py-60 mb-0 bg-img-hero"}>
            <ShowAlert />
            <Container>
                <Row className="align-items-center">
                    <Col lg={7}>
                        <Row>
                            <Col lg={12} className="text-white mb-3">
                                <h1 className="mb-3">{data.client.register.title}</h1>
                                {data.client.register.description.map((desc, i) =>
                                    <p key={i}>{desc}</p>
                                )}
                            </Col>
                            {config.contacts.map((d, i) =>
                                <Col key={i} className="rounded-sm transition-ease-0_3 transform-y-3--hover shadow-light-bottom--hover p-3 mr-2 bg-gray-light-v5-opacity-0_3">
                                    <h3 className="h5 color-primary">{d.title}</h3>
                                    <p className="color-white-opacity-0_8">{d.description}</p>
                                </Col>
                            )}
                        </Row>
                    </Col>
                    <Col lg={4} className={data.client.register.form.bgClassName + " offset-lg-1 rounded-sm p-4"}>
                        <h3 className="h6 text-white text-center text-uppercase">
                            Daftar Website
                        </h3>
                        <p className="color-white-opacity-0_7">
                            Buka peluang baru dengan menambah banyak jaringan.
                        </p>
                        <Form onSubmit={submit}>
                            <Form.Group controlId="name">
                                <Form.Control
                                    className="bg-gray-light-v5"
                                    onChange={changeValue}
                                    value={formData.name}
                                    autoComplete="off"
                                    placeholder="Nama website" />
                            </Form.Group>
                            <Form.Group controlId="domain">
                                <Form.Control
                                    className="bg-gray-light-v5"
                                    onChange={changeValue}
                                    value={formData.domain}
                                    autoComplete="off"
                                    placeholder="Domain" />
                            </Form.Group>
                            <Form.Group controlId="description">
                                <Form.Control
                                    className="bg-gray-light-v5"
                                    onChange={changeValue}
                                    value={formData.description}
                                    as="textarea"
                                    rows="2"
                                    maxLength={128}
                                    placeholder="Deskripsi" />
                            </Form.Group>
                            <Form.Group controlId="seo_keyword">
                                <Form.Control
                                    className="bg-gray-light-v5"
                                    onChange={changeValue}
                                    value={formData.seo_keyword}
                                    as="textarea"
                                    rows="2"
                                    maxLength={128}
                                    placeholder="Kata kunci pencarian" />
                            </Form.Group>
                            <Button
                                className="w-100 brd-blue-dark--disabled bg-blue-dark--disabled"
                                variant="primary"
                                type="submit"
                                disabled={isLoading}
                            >{isLoading ? 'tunggu..' : 'Kirim'}</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default Register;