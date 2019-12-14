import types from '../actions/types';

const initialState = {
  loading: false,
  albums: [],
  songs: [],
  error: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.RECOMMENDATIONS_LOADING:
      return {
        ...state,
        loading: true,
        error: false
      };
    case types.RECOMMENDATIONS_LOADED:
      return {
        ...state,
        loading: false,
        albums: action.albums,
        songs: action.songs,
        error: false
      };
    case types.RECOMMENDATION_ERROR:
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
