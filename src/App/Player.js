import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
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
    marginLeft: 'auto'
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
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      album: {},
      song: {}
    };
  }

  async componentDidMount() {
    try {
      const songId = this.props.match.params.id;
      const resSong = await fetch(`/songs/${songId}`);
      const song = await resSong.json();
      const albumId = song.album_id;
      const resAlbum = await fetch(`/albums/${albumId}`);
      const album = await resAlbum.json();
      this.setState(prevState => ({
        ...prevState,
        loading: false,
        song,
        album
      }));
    } catch (err) {
      console.error('Error accediendo al servidor', err);
    }
  }

  render() {
    const { classes } = this.props;
    const { album, song } = this.state;
    return (
      <div className={classes.container}>
        <Paper className={classes.paper}>
          <div className={classes.infoContainer}>
            <img src={album.cover} className={classes.cover} />
            <Typography variant="h6">Sonando: {song.name}</Typography>
            <Typography variant="subtitle2" color="textSecondary">
              de {album.artist}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              Álbum: {album.name}
            </Typography>
          </div>
          <div className={classes.controls}>
            <IconButton aria-label="play">
              <PlayArrowIcon className={classes.playIcon} />
            </IconButton>
            <div className={classes.linearProgress}>
              <LinearProgress variant="determinate" value={0} />
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(Player);
