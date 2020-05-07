import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Spinner, NavDropdown, Container } from 'react-bootstrap';
import logo from '../../../assets/img/logo/logo.svg';
import session from '../../../config/session';
import config from '../../../config.json';
import data from '../../../data.json';
import { connect } from 'react-redux';

class MainMenu extends React.Component {

    logout = event => {
        event.preventDefault();
        session.unset();
        this.props.history.push('/');
    }

    render() {
        return (
            <Navbar className={data.navbar.bgClassName + " shadow-sm"}
                fixed="top"
                collapseOnSelect
                expand="lg"
                variant="dark"
            >
                <Container>
                    <NavLink to="/" className="navbar-brand color-primary font-weight-700">
                        <img className="mr-3 rounded-8" src={logo} alt="logo" height="30" width="30" />
                        {config.brand_name}
                    </NavLink>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        {this.props.children}
                        <Nav className="ml-auto">
                            <NavDropdown
                                title="GitHub Repo."
                                id="collasible-nav-dropdown"
                            >
                                <NavDropdown.Item
                                    href="https://github.com/andinaeta"
                                >andinaeta</NavDropdown.Item>
                                <NavDropdown.Item
                                    href="https://github.com/naetastore"
                                >naetastore</NavDropdown.Item>
                            </NavDropdown>
                            {!session.get('username') ? (
                                <Fragment>
                                    <NavLink
                                        className="nav-link transition-ease-in-out-0_15"
                                        to="/signup"
                                    >Sign Up</NavLink>
                                    <NavLink
                                        className="nav-link transition-ease-in-out-0_15"
                                        to="/auth"
                                    >Log In</NavLink>
                                </Fragment>
                            ) : (
                                    <Fragment>
                                        <a href="#logout"
                                            className="nav-link transition-ease-in-out-0_15"
                                            onClick={this.logout}
                                        >Logout</a>
                                    </Fragment>
                                )
                            }
                        </Nav>
                        <Spinner
                            animation="border"
                            variant="info"
                            className={this.props.loading ? '' : 'd-none'} />
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}

const mapStateToProps = state => ({
    loading: state.pageLoading
});

export default connect(mapStateToProps)(MainMenu);