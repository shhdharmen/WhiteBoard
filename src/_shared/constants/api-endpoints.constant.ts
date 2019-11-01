const API_URL = process.env.API_URL;

export const API_ENDPOINTS = {
    AUTH: {
        LOGIN_POST: API_URL + '/auth/local'
    },
    NOTE: {
        GET: API_URL + '/notes',
        POST: API_URL + '/notes'
    }
}
