const API_URL = process.env.API_URL;

export const API_ENDPOINTS = {
    AUTH: {
        LOGIN_POST: API_URL + '/auth/local'
    },
    NOTE: {
        DELETE: API_URL + '/notes',
        GET: API_URL + '/notes',
        CREATE_POST: API_URL + '/notes',
        UPDATE_PUT: API_URL + '/notes'
    }
}
