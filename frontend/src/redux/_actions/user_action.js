import axios from 'axios';
import {LOGIN_USER, REGISTER_USER, AUTH_USER} from './types';

export const loginUser = (DataSubmit) => {
    const request = axios.post('/api/users/login', DataSubmit)
        .then((res) => res.data);

    // console.log(request);
    return{
        type : LOGIN_USER,
        payload : request
    }
}

export const registerUser = (DataSubmit) => {
    const request = axios.post('/api/users/register', DataSubmit)
        .then((res) => res.data);

    // console.log(request);
    return{
        type : REGISTER_USER,
        payload : request
    }
}

export const authUser = () => {
    const request = axios.get('/api/users/auth')
        .then((res) => res.data);
    console.log(request);
    return{
        type : AUTH_USER,
        payload : request
    }
}