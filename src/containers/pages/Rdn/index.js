import React, { useState, useEffect } from 'react';
import session from '../../../config/session';
import store from '../../../config/redux/store';
import axios from 'axios';
import { REST } from '../../../config/REST';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Spinner, NavDropdown } from 'react-bootstrap';
import logo from '../../../assets/img/logo/logo.svg';

function Rdn(props) {

    const [initialized, setInitialized] = useState(false);
    const [notification, setNotification] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!initialized) {
            checkSession();
        }
    });

    const checkSession = () => {
        let s = session.get;

        if (s('username') === null) {
            props.history.push('/auth?_rdn/home');
            return;
        }

        s = { username: s('username'), password: s('password') };

        if (store.getState().userData.username === undefined) {
            auth(s);
        }

        getNotification(s);

        store.subscribe(() => {
            setLoading(store.getState().pageLoading);
        });

        setInitialized(true);
    }

    const auth = data => {
        axios.get(`${REST.server.url}api/users`, { params: data })
            .then(res => {
                store.dispatch({ type: 'SET_USERDATA', data: res.data });
            }).catch(err => console.log(err.response));
    }

    const getNotification = s => {
        axios.get(`${REST.server.url}api/users/notifications`, { params: s })
            .then(res => {
                const unReaded = res.data.filter(d => Number(d.readed) === 0);
                setNotification(unReaded.length);
            }).catch(err => console.log(err.response));
    }

    const logout = e => {
        e.preventDefault();
        session.unset();
        props.history.push('/');
    }

    return (
        <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="#home">
                <img src={logo} alt="logo" height="30" width="30" style={{ borderRadius: "8px" }} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <NavLink className="nav-link" classactive="active" to="/_rdn/home">Home</NavLink>
                    <NavLink className="nav-link" classactive="active" to="/_rdn/notification">
                        Notification{notification > 0 ? <span style={{ position: "relative" }} className="counter">{notification}</span> : <></>}
                    </NavLink>
                    <NavLink className="nav-link" classactive="active" to="/_rdn/administrator">Administrator</NavLink>
                </Nav>
                <Nav className="mr-5">
                    <NavDropdown title="Account" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#" onClick={logout}>
                            Logout
                        </NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="#deets">More deets</Nav.Link>
                    <Nav.Link eventKey={2} href="#memes">
                        Dank memes
                    </Nav.Link>
                </Nav>
                <Spinner animation="border" variant="primary" className={loading ? '' : 'd-none'} />
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Rdn;