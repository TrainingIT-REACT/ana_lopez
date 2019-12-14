import types from './types';
import { getRandomRecommendations } from './utils/random';

const recommendationsLoading = () => ({
  type: types.RECOMMENDATIONS_LOADING
});

const recommendationsError = () => ({
  type: types.RECOMMENDATIONS_ERROR
});

const recommendationsLoaded = (albums, songs) => ({
  type: types.RECOMMENDATIONS_LOADED,
  albums,
  songs
});

export const getRecommendations = () => async dispatch => {
  dispatch(recommendationsLoading());
  try {
    const resAlbums = await fetch('/albums');
    const albums = await resAlbums.json();
    const albumRecommendations = getRandomRecommendations(albums, 4);
    const resSongs = await fetch('/songs');
    const songs = await resSongs.json();
    const songsRecommendations = getRandomRecommendations(songs, 3);
    const songsInfo = songsRecommendations.map(song => {
      const album = albums.find(a => a.id === song.album_id);
      return {
        name: song.name,
        album: album.name,
        cover: album.cover,
        artist: album.artist
      };
    });
    dispatch(recommendationsLoaded(albumRecommendations, songsInfo));
  } catch {
    dispatch(recommendationsError());
  }
};
