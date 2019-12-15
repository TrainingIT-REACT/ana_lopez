import types from '../actions/types';

const initialState = {
  loading: false,
  results: [],
  error: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SEARCH_LOADING:
      return {
        ...state,
        loading: true,
        error: false
      };
    case types.SEARCH_LOADED:
      return {
        ...state,
        loading: false,
        results: action.results,
        error: false
      };
    case types.SEARCH_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };
    case types.CLEAR_SEARCH:
      return {
        ...state,
        loading: false,
        error: false,
        results: []
      };
    default:
      return state;
  }
};

export default reducer;
