import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import user from './reducers/user';
import recommendations from './reducers/recommendations';
import albums from './reducers/albums';
import albumDetails from './reducers/albumDetails';
import song from './reducers/song';
import history from './reducers/history';
import search from './reducers/search';

export default createStore(
  combineReducers({ user, recommendations, albums, albumDetails, song, history, search }),
  applyMiddleware(thunk)
);
