import Axios from 'axios';
import { REST } from '../config/REST';
import store from '../config/redux/store';

const get = (path, params) => {
    return new Promise((resolve, reject) => {
        Axios.get(`${REST.server.andinaeta}api/${path}`, { params })
            .then(res => { resolve(res); }).catch(err => { reject(err); });
    })
}

const post = (path, data) => {
    return new Promise((resolve, reject) => {
        Axios.post(`${REST.server.andinaeta}api/${path}`, data, {
            onUploadProgress: ProgressEvent => {
                store.dispatch({ type: 'SET_PROGRESS', data: Math.round(ProgressEvent.loaded / ProgressEvent.total * 100) });
            }
        }).then(res => { resolve(res) }).catch(err => {
            store.dispatch({ type: 'SET_PROGRESS', data: 0 });
            reject(err.response);
        });
    });
}

export const api = {
    get,
    post
}