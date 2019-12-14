import types from '../actions/types';

const initialState = {
  loading: false,
  songName: '',
  audio: '',
  seconds: 0,
  albumCover: '',
  artist: '',
  albumName: '',
  error: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SONG_LOADING:
      return {
        ...state,
        loading: true,
        error: false
      };
    case types.SONG_LOADED:
      return {
        ...state,
        loading: false,
        songName: action.song.name,
        audio: action.song.audio,
        seconds: action.song.seconds,
        albumCover: action.album.cover,
        artist: action.album.artist,
        albumName: action.album.name,
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
