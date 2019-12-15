import types from '../actions/types';

const initialState = {
  loading: false,
  songName: '',
  audio: '',
  seconds: 0,
  albumCover: '',
  artist: '',
  albumName: '',
  error: false,
  floatingPlayerOpen: false,
  playing: false
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
    case types.OPEN_FLOATING_PLAYER:
      return {
        ...state,
        floatingPlayerOpen: true
      };
    case types.CLOSE_FLOATING_PLAYER:
      return {
        ...state,
        floatingPlayerOpen: false,
        playing: false
      };
    case types.START_PLAYING:
      return {
        ...state,
        playing: true
      };
    case types.STOP_PLAYING:
      return {
        ...state,
        playing: false
      };
    case types.CLEAR_SONG:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export default reducer;
