import types from './types';

const albumDetailsLoading = () => ({
  type: types.ALBUM_DETAILS_LOADING
});

const albumDetailsError = () => ({
  type: types.ALBUM_DETAILS_ERROR
});

const albumDetailsLoaded = (album, songs) => ({
  type: types.ALBUM_DETAILS_LOADED,
  album,
  songs
});

export const getAlbumDetails = id => async dispatch => {
  dispatch(albumDetailsLoading());
  try {
    const resAlbum = await fetch(`/albums/${id}`);
    const album = await resAlbum.json();
    const resSongs = await fetch(`/songs?album_id=${id}`);
    const albumSongs = await resSongs.json();
    dispatch(albumDetailsLoaded(album, albumSongs));
  } catch {
    dispatch(albumDetailsError());
  }
};
