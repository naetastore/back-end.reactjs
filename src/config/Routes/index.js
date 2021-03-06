import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Auth from '../../containers/pages/Auth';
import Dashboard from '../../containers/pages/Dashboard';
import OrderDetail from '../../containers/pages/Administrator/NaetaStore/Order/OrderDetail';
import Administrator from '../../containers/pages/Administrator';
import NaetaStore from '../../containers/pages/Administrator/NaetaStore';
import Andi from '../../containers/pages/Administrator/Andi';
import Root from '../../containers/pages/Root';
import MainMenu from '../../components/molecules/MainMenu';
import Signup from '../../containers/pages/Signup';
import Footer from '../../components/molecules/Footer';
import Register from '../../containers/pages/Client/Register';
import session from '../session';
import store from '../redux/store';
import { NavLink } from 'react-router-dom';
import Blog from '../../containers/pages/Blog';
import Details from '../../containers/pages/Blog/Details';
import { useLocation, HashRouter } from "react-router-dom";
import { auth } from '../../services/auth';

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

function ShowMenu(props) {
    const roleId = session.get('role_id');

    function PublicMenu() {
        return (
            <Fragment>
                <NavLink className="nav-link" exact to="/">Home</NavLink>
                <NavLink className="nav-link" to="/blog">Blog</NavLink>
            </Fragment>
        );
    }

    function AuthorizedMenu() {
        return (
            <Fragment>
                <NavLink className="nav-link" to="/_rdn/dashboard">Dashboard</NavLink>
                <NavLink className="nav-link" to="/_rdn/administrator">Administrator</NavLink>
            </Fragment>
        );
    }

    if (!roleId) {
        // public menu
        return (
            <MainMenu {...props}>
                <PublicMenu />
            </MainMenu>
        );
    } else {
        // authorized menu
        if (roleId > 1) {
            return (
                <MainMenu {...props}>
                    <PublicMenu />
                </MainMenu>
            );
        } else {
            return (
                <MainMenu {...props}>
                    <PublicMenu />
                    <AuthorizedMenu />
                </MainMenu>
            );
        }
    }
}

function ClientRegisterPage(props) {
    return (
        <Fragment>
            <ShowMenu {...props} />
            <Register {...props} />
            <Footer />
        </Fragment>
    );
}

function LoginPage(props) {
    return (
        <Fragment>
            <ShowMenu {...props} />
            <Auth {...props} />
        </Fragment>
    );
}

function RegisterPage(props) {
    return (
        <Fragment>
            <ShowMenu {...props} />
            <Signup {...props} />
        </Fragment>
    );
}

function HomePage(props) {
    return (
        <Fragment>
            <ScrollToTop />
            <ShowMenu {...props} />
            <Root {...props} />
            <Footer />
        </Fragment>
    );
}

function Authorized(props) {
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        if (!initialized) {
            checkSession();
        }
    });

    const checkSession = () => {
        let s = session.get;

        if (!s('username')) {
            props.history.push('/auth?' + window.location.hash);
            return;
        }

        s = { username: s('username'), password: s('password') };

        if (store.getState().userData.username === undefined) {
            authentication(s);
        }

        setInitialized(true);
    }

    const authentication = async data => {
        try {
            const res = await auth(data);
            store.dispatch({ type: 'SET_USERDATA', data: res.data });
        } catch (err) {
            console.log(err.response)
        }
    }

    return null;
}

function DashboardPage(props) {
    return (
        <Fragment>
            <ShowMenu {...props} />
            <Dashboard {...props} />
        </Fragment>
    );
}

function AdministratorPage(props) {
    return (
        <Fragment>
            <ShowMenu {...props} />
            <Administrator {...props} />
        </Fragment>
    );
}

function AndiPage(props) {
    return (
        <Fragment>
            <ShowMenu {...props} />
            <Andi {...props} />
        </Fragment>
    );
}

function NaetaStorePage(props) {
    return (
        <Fragment>
            <ShowMenu {...props} />
            <NaetaStore {...props} />
        </Fragment>
    );
}

function BlogPage(props) {
    return (
        <Fragment>
            <ScrollToTop />
            <ShowMenu {...props} />
            <Blog {...props} />
            <Footer />
        </Fragment>
    );
}

function PostDetailPage(props) {
    return (
        <Fragment>
            <ScrollToTop />
            <ShowMenu {...props} />
            <Details {...props} />
            <Footer />
        </Fragment>
    );
}

function Routes() {
    return (
        <BrowserRouter>
            <HashRouter>
                <Route path="/" exact component={HomePage} />
                <Route path="/auth" component={LoginPage} />
                <Route path="/signup" component={RegisterPage} />
                <Route path="/client/register" component={ClientRegisterPage} />
                <Route path="/_rdn" component={Authorized} />
                <Route path="/_rdn/dashboard" component={DashboardPage} />
                <Route path="/_rdn/administrator" exact component={AdministratorPage} />
                <Route path="/_rdn/administrator/andinaeta" exact component={AndiPage} />
                <Route path="/_rdn/administrator/naetastore" exact component={NaetaStorePage} />
                <Route path="/_rdn/administrator/order/:entry" exact component={OrderDetail} />
                <Route path="/blog" exact component={BlogPage} />
                <Route path="/blog/post/:id" exact component={PostDetailPage} />
            </HashRouter>

        </BrowserRouter>
    );
}

export default Routes;