import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import Menu from './Menu';
import AlbumCard from './components/AlbumCard';
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
  recommendationList: {
    marginTop: 10
  },
  albumesList: {
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
      const res = await fetch('/albums');
      const json = await res.json();
      this.setState(prevState => ({
        ...prevState,
        loading: false,
        albums: json
      }));
    } catch (err) {
      console.error('Error accediendo al servidor', err);
    }
  }

  getRandomAlbums = () => {
    const { albums } = this.state;
    const numberOfAlbums = albums.length;
    if (numberOfAlbums !== 0) {
      let recommendations = [];
      while (recommendations.length < 3) {
        const recommendationIndex = Math.floor(Math.random() * numberOfAlbums);
        const albumRecommendation = albums[recommendationIndex];
        if (!recommendations.find(recommendation => recommendation.id === albumRecommendation.id)) {
          recommendations.push(albumRecommendation);
        }
      }
      return recommendations;
    }

    return [];
  };

  render() {
    const { classes } = this.props;
    const albumRecommendations = this.getRandomAlbums();
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
              <div className={classes.recommendationList}>
                <Typography variant="h6">Álbumes</Typography>
                <Divider />
                <div className={classes.albumesList}>
                  {albumRecommendations.map(recommendation => (
                    <div className={classes.cardContainer}>
                      <AlbumCard album={recommendation} />
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
