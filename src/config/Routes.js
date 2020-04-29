import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Auth from '../containers/pages/Auth';
import Rdn from '../containers/pages/Rdn';
import Home from '../containers/pages/Home';
import OrderDetail from '../containers/pages/Order/OrderDetail';
import Administrator from '../containers/pages/Administrator';
import Root from '../containers/pages/Root';
import MainMenu from '../containers/organism/MainMenu';
import Signup from '../containers/pages/Signup';

function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact>
                <MainMenu />
                <Root />
            </Route>
            <Route path="/blog">
                <MainMenu />
            </Route>
            {/* <Route path="/auth"><MainMenu /><Auth /></Route>
            <Route path="/signup"><MainMenu /><Signup /></Route> */}
            <Route path="/auth" component={Auth} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/_rdn" component={Rdn} />
            <Route path="/_rdn/home" component={Home} />
            <Route path="/_rdn/administrator" exact component={Administrator} />
            <Route path="/_rdn/administrator/order/:entry" exact component={OrderDetail} />

        </BrowserRouter>
    );
}

export default Routes;