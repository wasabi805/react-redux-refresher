import {TEST_DISPATCH} from "../actions/00-types";

const initialState={
    isAutheticated: false,
    user:{},
    //NOTE: add any key and val can go here.
};

export default (state= initialState, action)=>{
    switch(action.type){
        case TEST_DISPATCH:
            return{
                ...state,
                user: action.payload
            };
        default:
            return state
    }
};