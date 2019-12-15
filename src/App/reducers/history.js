import types from '../actions/types';

const initialState = {
  albums: [],
  songs: []
};

const getListWithItemAdded = (itemList, itemToAdd) => {
  if (itemList.find(item => item.id === itemToAdd.id)) {
    return itemList;
  }
  return [...itemList, itemToAdd];
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_ALBUM_TO_HISTORY:
      const allAlbums = getListWithItemAdded(state.albums, action.album);
      return {
        ...state,
        albums: allAlbums.slice(0, 10)
      };
    case types.ADD_SONG_TO_HISTORY:
      const allSongs = getListWithItemAdded(state.songs, action.song);
      return {
        ...state,
        songs: allSongs.slice(0, 10)
      };
    case types.LOGOUT:
      return {
        songs: [],
        albums: []
      };
    default:
      return state;
  }
};

export default reducer;
