import types from './types';

const searchLoading = () => ({
  type: types.SEARCH_LOADING
});

const searchError = () => ({
  type: types.SEARCH_ERROR
});

const searchLoaded = results => ({
  type: types.SEARCH_LOADED,
  results
});

export const search = (searchType, searchText) => async dispatch => {
  dispatch(searchLoading());
  try {
    const res = await fetch(`/${searchType}?name_like=${searchText}`);
    const json = await res.json();
    dispatch(searchLoaded(json));
  } catch {
    dispatch(searchError());
  }
};

export const clearSearch = () => ({
  type: types.CLEAR_SEARCH
});
