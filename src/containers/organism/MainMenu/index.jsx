import React, { useState, useEffect } from 'react';
import store from '../../../config/redux/store';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Spinner, NavDropdown } from 'react-bootstrap';
import logo from '../../../assets/img/logo/logo.svg';

function MainMenu(props) {

    const [loading, setLoading] = useState(false);
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        if (!initialized) {
            getState();
        }
    });

    const getState = () => {
        store.subscribe(() => {
            setLoading(store.getState().pageLoading);
        });
        setInitialized(true);
    }

    const backHome = e => {
        e.preventDefault();
        console.log(props);
    }

    return (
        <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/" onClick={backHome}>
                <img className="mr-3" src={logo} alt="logo" height="30" width="30" style={{ borderRadius: "8px" }} />
                AN
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <NavLink className="nav-link" exact to="/">Home</NavLink>
                    <NavLink className="nav-link" to="/blog">Blog</NavLink>
                </Nav>
                <Nav className="mr-5">
                    <NavDropdown title="GitHub Repo." id="collasible-nav-dropdown">
                        <NavDropdown.Item href="https://github.com/andinaeta">andinaeta</NavDropdown.Item>
                        <NavDropdown.Item href="https://github.com/naetastore">naetastore</NavDropdown.Item>
                    </NavDropdown>
                    <NavLink className="nav-link" to="/signup">Sign Up</NavLink>
                    <NavLink className="nav-link" to="/auth">Sign In</NavLink>
                </Nav>
                <Spinner animation="border" variant="primary" className={loading ? '' : 'd-none'} />
            </Navbar.Collapse>
        </Navbar>
    );
}

export default MainMenu;