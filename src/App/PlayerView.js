import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { getSong, openFloatingPlayer, startPlaying, stopPlaying, clearSong } from './actions/song';
import Player from './Player';

const styles = () => ({
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  paper: {
    width: '80%',
    padding: 20,
    textAlign: 'center'
  },
  cover: {
    width: 250,
    height: 250,
    borderRadius: 5,
    display: 'block',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginBottom: 10
  },
  title: {
    fontWeight: 600
  },
  controls: {
    alignSelf: 'center'
  },
  infoContainer: {
    marginBottom: 45
  },
  linearProgress: {
    padding: 20
  }
});

class PlayerView extends Component {
  componentDidMount() {
    const songId = this.props.match.params.id;
    this.props.getSong(songId);
  }

  componentWillUnmount = () => {
    if (this.props.playing) {
      this.props.openFloatingPlayer();
    } else {
      this.props.clearSong();
    }
  };

  render() {
    const { classes } = this.props;
    if (this.props.loading) return <p>Cargando canción...</p>;
    if (this.props.error) return <p>Ha ocurrido un error al cargar la canción</p>;
    return (
      <div className={classes.container}>
        <Paper className={classes.paper}>
          <div className={classes.infoContainer}>
            <img src={this.props.albumCover} className={classes.cover} />
            <Typography variant="h6">Sonando: {this.props.songName}</Typography>
            <Typography variant="subtitle2" color="textSecondary">
              de {this.props.artist}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              Álbum: {this.props.albumName}
            </Typography>
          </div>
          <Player
            startPlaying={this.props.startPlaying}
            stopPlaying={this.props.stopPlaying}
            audio={this.props.audio}
          />
        </Paper>
      </div>
    );
  }
}

PlayerView.propTypes = {
  getSong: PropTypes.func.isRequired,
  openFloatingPlayer: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  songName: PropTypes.string,
  audio: PropTypes.string,
  seconds: PropTypes.number,
  albumCover: PropTypes.string,
  artist: PropTypes.string,
  albumName: PropTypes.string,
  error: PropTypes.bool.isRequired,
  floatingPlayerOpen: PropTypes.bool.isRequired,
  playing: PropTypes.bool.isRequired,
  startPlaying: PropTypes.func.isRequired,
  stopPlaying: PropTypes.func.isRequired,
  clearSong: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  ...state.song
});

const mapDispatchToProps = dispatch => ({
  getSong: id => dispatch(getSong(id)),
  openFloatingPlayer: () => dispatch(openFloatingPlayer()),
  startPlaying: () => dispatch(startPlaying()),
  stopPlaying: () => dispatch(stopPlaying()),
  clearSong: () => dispatch(clearSong())
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PlayerView));
