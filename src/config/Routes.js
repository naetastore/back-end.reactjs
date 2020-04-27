import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Auth from '../containers/pages/Auth';
import Rdn from '../containers/pages/Rdn';
import Home from '../containers/pages/Home';
import Order from '../containers/pages/Order';
import Administrator from '../containers/pages/Administrator';

function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Auth} />
            <Route path="/_rdn" component={Rdn} />
            <Route path="/_rdn/home" component={Home} />
            <Route path="/_rdn/administrator" component={Administrator} />
            <Route path="/_rdn/administrator/order/:entry" exact component={Order} />

        </BrowserRouter>
    );
}

export default Routes;