import Axios from 'axios';
import { REST } from '../config/REST';

export const auth = (data) => {
	return new Promise(async (resolve, reject) => {
		Axios.get(`${REST.server.andinaeta}api/users`, { params: data })
            .then(res => { resolve(res); }).catch(err => { reject(err); });
	});
}