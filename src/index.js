import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/global.css';
import store from './config/redux/store';
import { Provider } from 'react-redux';
import Routes from './config/Routes';

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
