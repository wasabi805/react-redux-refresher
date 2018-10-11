import axios from 'axios';
import {GET_ERRORS, TEST_DISPATCH} from "./00-types";


export const registerUser = (userData, history)=> dispatch =>{
    axios.post('/api/users/register', userData)
        .then(res=> history.push('/login'))

        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
};