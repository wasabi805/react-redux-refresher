import {TEST_DISPATCH} from "./00-types";

export const registerUser = (userData)=>{
    return{
        type: TEST_DISPATCH,
        payload: userData
    }
};