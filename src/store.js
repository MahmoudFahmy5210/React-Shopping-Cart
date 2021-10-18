import { createStore , applyMiddleware,compose,combineReducers } from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./Reducers/cartReducers";
import { productsReducer } from "./Reducers/productReducers";


//define the initial state
 const initialState ={};
// send what happen to google dev tools
 const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
 const store = createStore(combineReducers({
     products : productsReducer,
     cart:cartReducer,
 }),
    initialState,
    composeEnhancer(applyMiddleware(thunk))
 );
 export default store;