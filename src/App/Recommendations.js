import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import AlbumCard from './components/AlbumCard';
import SongCard from './components/SongCard';

const styles = () => ({
  media: {
    height: 140
  },
  listContainer: {
    marginTop: 10
  },
  recommendationsList: {
    marginTop: 8,
    width: '100%',
    display: 'flex'
  },
  cardContainer: {
    flex: 1,
    marginRight: 8
  }
});

class Recommendations extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      albums: []
    };
  }

  async componentDidMount() {
    try {
      const resAlbums = await fetch('/albums');
      const albums = await resAlbums.json();
      const albumRecommendations = this.getRandomRecommendations(albums, 4);
      const resSongs = await fetch('/songs');
      const songs = await resSongs.json();
      const songsRecommendations = this.getRandomRecommendations(songs, 3);
      const getSongsRecommendationsInfo = this.getSongsRecommendationsInfo(
        songsRecommendations,
        albums
      );
      this.setState(prevState => ({
        ...prevState,
        loading: false,
        albums: albumRecommendations,
        songs: getSongsRecommendationsInfo
      }));
    } catch (err) {
      console.error('Error accediendo al servidor', err);
    }
  }

  getSongsRecommendationsInfo = (songsRecommendations, albums) => {
    return songsRecommendations.map(song => {
      const album = albums.find(a => a.id === song.album_id);
      return {
        name: song.name,
        album: album.name,
        cover: album.cover,
        artist: album.artist
      };
    });
  };

  getRandomRecommendations = (musicList, numOfRecommendations) => {
    const numberOfItems = musicList.length;
    if (numberOfItems !== 0) {
      let recommendations = [];
      while (recommendations.length < numOfRecommendations) {
        const recommendationIndex = Math.floor(Math.random() * numberOfItems);
        const musicItem = musicList[recommendationIndex];
        if (!recommendations.find(recommendation => recommendation.id === musicItem.id)) {
          recommendations.push(musicItem);
        }
      }
      return recommendations;
    }

    return [];
  };

  onClickOnAlbum = albumId => {
    this.props.history.push(`albums/${albumId}`);
  };

  render() {
    const { classes } = this.props;
    if (this.state.loading) return null;
    return (
      <>
        <Typography variant="subtitle2">Hoy te recomendamos...</Typography>
        <div className={classes.listContainer}>
          <Typography variant="h6">Álbumes</Typography>
          <Divider />
          <div className={classes.recommendationsList}>
            {this.state.albums.map((recommendation, index) => (
              <div className={classes.cardContainer} key={index}>
                <AlbumCard
                  album={recommendation}
                  onClickOnAlbum={() => this.onClickOnAlbum(recommendation.id)}
                />
              </div>
            ))}
          </div>
        </div>
        <div className={classes.listContainer}>
          <Typography variant="h6">Canciones</Typography>
          <Divider />
          <div className={classes.recommendationsList}>
            {this.state.songs.map((recommendation, index) => (
              <div className={classes.cardContainer} key={index}>
                <SongCard song={recommendation} />
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
}

Recommendations.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Recommendations);
