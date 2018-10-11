import {combineReducers} from 'redux';

//sub-reducers
import authReducer from './auth-reducer';

export default combineReducers({
    auth: authReducer
});