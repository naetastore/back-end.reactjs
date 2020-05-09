import config from '../config.json';

const localsrv = {
	'naetastore': 'http://localhost/rest/',
	'andinaeta': 'http://localhost/andi-rest-server/'
}

const server = {
    'naetastore': config.production ? config.rest.server.naetastore : localsrv.naetastore,
    'andinaeta': config.production ? config.rest.server.andinaeta : localsrv.andinaeta
}

export const REST = { server };