import Axios from 'axios';
import { REST } from '../config/REST';
import store from '../config/redux/store';
import qs from 'qs';

const get = (path, params) => {
    return new Promise((resolve, reject) => {
        Axios.get(`${REST.server.andinaeta}api/${path}`, { params })
            .then(res => { resolve(res); }).catch(err => { reject(err); });
    })
}

const post = (path, data) => {
    data = qs.stringify(data);
    return new Promise((resolve, reject) => {
        Axios.post(`${REST.server.andinaeta}api/${path}`, data)
            .then(res => { resolve(res); }).catch(err => { reject(err.response); });
    });
}

export const api = {
    get,
    post
}