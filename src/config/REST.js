import config from '../config.json';

const server = {
    'naetastore': config.production ? config.rest.server.naetastore : 'http://localhost/rest/',
    'andinaeta': config.production ? config.rest.server.andinaeta : 'http://localhost/andi-rest-server/'
}

export const REST = { server };