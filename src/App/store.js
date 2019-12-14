import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import user from './reducers/user';
import recommendations from './reducers/recommendations';

export default createStore(combineReducers({ user, recommendations }), applyMiddleware(thunk));
