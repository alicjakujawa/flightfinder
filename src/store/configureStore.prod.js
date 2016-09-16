import { combineReducers, createStore, compose } from 'redux';
import * as reducers from '../reducers';

const reducer = combineReducers(reducers);
const enhancer = compose(

);

const store = createStore(reducer, enhancer);
export default store;
