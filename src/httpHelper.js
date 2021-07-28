import axios from "axios";

const baseURL = 'http://localhost:8080/api';
const headers = {
    'Authorization': 'Bearer ' + localStorage.getItem('token'),
    'Content-Type': 'application/json'
}

export function get(endpoint) {
    return axios.get(baseURL + endpoint, {
        headers
    });
}

export function post(endpoint, body) {
    return axios.post(baseURL + endpoint, body, {
        headers
    });
}

export function put(endpoint, body) {
    return axios.put(baseURL + endpoint, body, {
        headers
    });
}

export function del(endpoint) {
    return axios.delete(baseURL + endpoint, {
        headers
    });
}
