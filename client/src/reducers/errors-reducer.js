import {GET_ERRORS} from "../actions/00-types";

const initialState={};

export default (state= initialState, action)=>{
    switch(action.type){
        case GET_ERRORS:
            return action.payload; //only return action.payload ==> this action ..
            //set the initial state of this reducer to the errors obj THAT COMES FROM THE SERVER
        default:
            return state
    }
};