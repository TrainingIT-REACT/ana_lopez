import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { getSong } from './actions/song';

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

class Player extends Component {
  componentDidMount() {
    const songId = this.props.match.params.id;
    this.props.getSong(songId);
  }

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
          <audio controls>
            <source src={this.props.audio} type="audio/mpeg" />
            Tu navegador no soporta audio
          </audio>
        </Paper>
      </div>
    );
  }
}

Player.propTypes = {
  getSong: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  ...state.song
});

const mapDispatchToProps = dispatch => ({
  getSong: id => dispatch(getSong(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Player));
