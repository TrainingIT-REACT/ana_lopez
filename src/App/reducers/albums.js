import types from '../actions/types';

const initialState = {
  loading: false,
  albums: [],
  error: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ALBUMS_LOADING:
      return {
        ...state,
        loading: true,
        error: false
      };
    case types.ALBUMS_LOADED:
      return {
        ...state,
        loading: false,
        albums: action.albums,
        error: false
      };
    case types.ALBUMS_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };
    default:
      return state;
  }
};

export default reducer;
