import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import AlbumCard from './components/AlbumCard';
import SongCard from './components/SongCard';
import { getRecommendations } from './actions/recommendations';

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
  componentDidMount() {
    this.props.getRecommendations();
  }

  onClickOnAlbum = albumId => {
    this.props.history.push(`album-list/${albumId}`);
  };

  onClickOnSong = songId => {
    this.props.history.push(`player/song/${songId}`);
  };

  render() {
    const { classes } = this.props;
    if (this.props.loading) return <p>Cargando recomendaciones...</p>;
    if (this.props.error) return <p>Ha ocurrido un error al cargar tus recomendaciones</p>;
    return (
      <>
        <Typography variant="subtitle2">Hoy te recomendamos...</Typography>
        <div className={classes.listContainer}>
          <Typography variant="h6">Álbumes</Typography>
          <Divider />
          <div className={classes.recommendationsList}>
            {this.props.albums.map((recommendation, index) => (
              <div className={classes.cardContainer} key={index}>
                <AlbumCard
                  name={recommendation.name}
                  artist={recommendation.artist}
                  cover={recommendation.cover}
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
            {this.props.songs.map((recommendation, index) => (
              <div className={classes.cardContainer} key={index}>
                <SongCard
                  name={recommendation.name}
                  artist={recommendation.artist}
                  album={recommendation.album}
                  cover={recommendation.cover}
                  onClickOnSong={() => this.onClickOnSong(recommendation.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
}

Recommendations.propTypes = {
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  albums: PropTypes.array.isRequired,
  songs: PropTypes.array.isRequired,
  error: PropTypes.bool.isRequired,
  getRecommendations: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  ...state.recommendations
});

const mapDispatchToProps = dispatch => ({
  getRecommendations: () => dispatch(getRecommendations())
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Recommendations));
