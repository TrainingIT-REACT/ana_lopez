import types from './types';

export const addAlbumToHistory = album => ({
  type: types.ADD_ALBUM_TO_HISTORY,
  album
});

export const addSongToHistory = song => ({
  type: types.ADD_SONG_TO_HISTORY,
  song
});
