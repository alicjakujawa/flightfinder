import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import DevTools from '../containers/DevTools';
import * as reducers from '../reducers';
import thunk from 'redux-thunk';

const reducer = combineReducers(reducers);
const middleware = applyMiddleware(thunk);

const enhancer = compose(
  middleware,
  DevTools.instrument()
);

const store = createStore(reducer, enhancer);
export default store;
