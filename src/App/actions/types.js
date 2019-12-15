const actions = [
  'LOGIN',
  'LOGOUT',
  'RECOMMENDATIONS_LOADING',
  'RECOMMENDATIONS_ERROR',
  'RECOMMENDATIONS_LOADED',
  'ALBUMS_LOADING',
  'ALBUMS_ERROR',
  'ALBUMS_LOADED',
  'ALBUM_DETAILS_LOADING',
  'ALBUM_DETAILS_ERROR',
  'ALBUM_DETAILS_LOADED',
  'SONG_LOADING',
  'SONG_ERROR',
  'SONG_LOADED',
  'OPEN_FLOATING_PLAYER',
  'CLOSE_FLOATING_PLAYER',
  'START_PLAYING',
  'STOP_PLAYING'
];

const actionTypes = {};
actions.forEach(action => {
  actionTypes[action] = action;
});

export default actionTypes;
