import React, { Fragment, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/global.css';
import store from './config/redux/store';
import { Provider } from 'react-redux';
import Routes from './config/Routes/';
import 'react-perfect-scrollbar/dist/css/styles.css';
import config from './config.json';
import { REST } from './config/REST';
import Axios from 'axios';

function InitApp() {
	const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        if (!initialized) {
            init();
        }
    });

    const init = () => {
        document.title = config.title;

        if (config.count_visitor) {
            Axios.post(`${REST.server.andinaeta}api/visitors`)
                .then(res => console.log('now visitor count is', res.data.count))
                .catch(err => console.log(err.response));
        }

        setInitialized(true);
    }

    return null;
}

ReactDOM.render(
	<Fragment>
		<InitApp />
		<Provider store={store}>
			<Routes />
		</Provider>
	</Fragment>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
