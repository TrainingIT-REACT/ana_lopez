import types from './types';

const songLoading = () => ({
  type: types.SONG_LOADING
});

const songError = () => ({
  type: types.SONG_ERROR
});

const songLoaded = (song, album) => ({
  type: types.SONG_LOADED,
  song,
  album
});

export const getSong = id => async dispatch => {
  dispatch(songLoading());
  try {
    const resSong = await fetch(`/songs/${id}`);
    const song = await resSong.json();
    const albumId = song.album_id;
    const resAlbum = await fetch(`/albums/${albumId}`);
    const album = await resAlbum.json();
    dispatch(songLoaded(song, album));
  } catch {
    dispatch(songError());
  }
};

export const openFloatingPlayer = () => ({
  type: types.OPEN_FLOATING_PLAYER
});

export const closeFloatingPlayer = () => ({
  type: types.CLOSE_FLOATING_PLAYER
});

export const startPlaying = () => ({
  type: types.START_PLAYING
});

export const stopPlaying = () => ({
  type: types.STOP_PLAYING
});

export const clearSong = () => ({
  type: types.CLEAR_SONG
});
