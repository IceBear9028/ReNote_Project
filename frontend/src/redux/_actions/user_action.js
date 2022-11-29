import axios from 'axios';
import {LOGIN_USER} from './types';


export const loginUser = (userDataSubmit) => {
    const request = axios.post('/api/users/login', userDataSubmit)
        .then((res) => res.data);

    console.log(request);
    return{
        type : LOGIN_USER,
        payload : request
    }
}