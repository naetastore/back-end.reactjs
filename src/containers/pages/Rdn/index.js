import React, { useState, useEffect } from 'react';
import session from '../../../config/session';
import store from '../../../config/redux/store';
import axios from 'axios';
import { REST } from '../../../config/REST';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Spinner } from 'react-bootstrap';
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
            props.history.push('/?admin/dashboard');
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

        if (!window.confirm('Apakah kamu yakin ingin keluar?')) return;

        session.unset();
        props.history.push('/');
    }

    return (
        <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
            <Navbar.Brand href="#home">
                <img src={logo} alt="logo" height="30" style={{ borderRadius: "8px" }} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" className="mr-5" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavLink className="nav-link mr-2" classactive="active" to="/_rdn/home">Home</NavLink>
                    <NavLink className="nav-link ml-2 mr-2" classactive="active" to="/_rdn/notification">
                        Notification{notification > 0 ? <span style={{ position: "absolute" }} className="counter">{notification}</span> : <></>}
                    </NavLink>
                    <NavLink className="nav-link ml-2 mr-2" classactive="active" to="/_rdn/administrator">Administrator</NavLink>
                    <NavLink className="nav-link ml-2" to="/" exact onClick={logout}>Logout</NavLink>
                </Nav>
            </Navbar.Collapse>
            <Spinner animation="border" variant="primary" className={loading ? '' : 'd-none'} />
        </Navbar>
    );
}

export default Rdn;