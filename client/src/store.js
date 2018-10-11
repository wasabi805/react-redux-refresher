import {applyMiddleware, createStore, compose} from "redux";
import thunk from 'redux-thunk';
import rootReducer from './reducers'
const middleware =[thunk];
const initialState ={};

// this is the basic layout for store for a reference:   ==> const store= createStore( ()=>[], {}, applyMiddleware);

const store = createStore(rootReducer , initialState ,
    compose(applyMiddleware(...middleware),  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);

export default store;
//import to App.js to give to the provider