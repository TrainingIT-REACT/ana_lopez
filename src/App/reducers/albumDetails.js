import types from '../actions/types';

const initialState = {
  loading: false,
  album: {},
  songs: [],
  error: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ALBUM_DETAILS_LOADING:
      return {
        ...state,
        loading: true,
        error: false
      };
    case types.ALBUM_DETAILS_LOADED:
      return {
        ...state,
        loading: false,
        album: action.album,
        songs: action.songs,
        error: false
      };
    case types.ALBUM_DETAILS_ERROR:
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
