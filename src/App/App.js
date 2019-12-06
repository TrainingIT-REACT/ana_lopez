import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import Menu from './Menu';
import AlbumCard from './components/AlbumCard';
import SongCard from './components/SongCard';
import { DRAWER_WIDTH } from './constants';

const styles = theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    marginLeft: DRAWER_WIDTH
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: theme.palette.grey[100],
    height: '100%'
  },
  toolbar: theme.mixins.toolbar,
  card: {
    maxWidth: 345
  },
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

class App extends Component {
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

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <Typography variant="h6">Reactify</Typography>
          </Toolbar>
        </AppBar>
        <Menu />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {!this.state.loading && (
            <>
              <Typography variant="subtitle2">Hoy te recomendamos...</Typography>
              <div className={classes.listContainer}>
                <Typography variant="h6">Álbumes</Typography>
                <Divider />
                <div className={classes.recommendationsList}>
                  {this.state.albums.map(recommendation => (
                    <div className={classes.cardContainer}>
                      <AlbumCard album={recommendation} />
                    </div>
                  ))}
                </div>
              </div>
              <div className={classes.listContainer}>
                <Typography variant="h6">Canciones</Typography>
                <Divider />
                <div className={classes.recommendationsList}>
                  {this.state.songs.map(recommendation => (
                    <div className={classes.cardContainer}>
                      <SongCard song={recommendation} />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
