import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import user from './reducers/user';
import recommendations from './reducers/recommendations';
import albums from './reducers/albums';
import albumDetails from './reducers/albumDetails';

export default createStore(
  combineReducers({ user, recommendations, albums, albumDetails }),
  applyMiddleware(thunk)
);
