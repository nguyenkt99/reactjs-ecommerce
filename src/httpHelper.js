import axios from "axios";

const baseURL = 'http://localhost:8080/api';

export function get(endpoint) {
    return axios.get(baseURL + endpoint, {
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') },
    });
}

export function post(endpoint, body) {
    return axios.post(baseURL + endpoint, body, {
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') },
    });
}

export function put(endpoint, body) {
    return axios.put(baseURL + endpoint, body, {
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') },
    });
}

export function del(endpoint) {
    return axios.delete(baseURL + endpoint, {
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') },
    });
}
