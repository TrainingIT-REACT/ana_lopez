import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import { getAlbumDetails } from './actions/albumDetails';
import { getSong, openFloatingPlayer } from './actions/song';

const styles = () => ({
  albumContainer: {
    width: '95%',
    padding: 15,
    display: 'flex'
  },
  cover: {
    width: 160,
    height: 160,
    borderRadius: 5,
    marginRight: 10
  },
  songsContainer: {
    width: '95%',
    padding: 15,
    marginTop: 10
  },
  link: {
    textDecoration: 'none'
  }
});

const LinkToSong = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);

class Album extends Component {
  componentDidMount() {
    const albumId = this.props.match.params.id;
    this.props.getAlbumDetails(albumId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.loadingSong && !this.props.loadingSong) {
      this.props.openFloatingPlayer();
    }
  }

  getHoursFromSeconds = totalSeconds => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor((totalSeconds % 3600) % 60);

    const hoursToDisplay = hours > 0 ? `${hours}h ` : '';
    const minsToDisplay = minutes > 0 ? `${minutes}min ` : '';
    const secondsToDisplay = seconds > 0 ? `${seconds}s` : '';

    return hoursToDisplay + minsToDisplay + secondsToDisplay;
  };

  getAlbumDuration = songs => {
    const totalSeconds = songs.reduce((total, currentSong) => total + currentSong.seconds, 0);
    return this.getHoursFromSeconds(totalSeconds);
  };

  onClickOnPlaySong = id => {
    this.props.getSong(id);
  };

  render() {
    const { classes, album, songs } = this.props;
    const albumDuration = this.getAlbumDuration(songs);
    const numberOfSongs = songs.length;
    if (this.props.loading) return <p>Cargando album info...</p>;
    if (this.props.error) return <p>Ha ocurrido un error al cargar la información del album</p>;
    return (
      <>
        <Paper className={classes.albumContainer}>
          <img src={album.cover} className={classes.cover}></img>
          <div>
            <Typography variant="h6">{album.name}</Typography>
            <Typography variant="body2" component="p">
              de {album.artist}
            </Typography>
            <Typography variant="caption" color="textSecondary" component="p">
              {songs.length} canciones
            </Typography>
            <Typography variant="caption" color="textSecondary" component="p">
              {albumDuration}
            </Typography>
          </div>
        </Paper>
        <Paper className={classes.songsContainer}>
          <List>
            {songs.map((song, index) => (
              <Fragment key={index}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <MusicNoteIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <Link
                    to={`/player/song/${song.id}`}
                    component={LinkToSong}
                    className={classes.link}
                    color="inherit"
                  >
                    <ListItemText
                      primary={song.name}
                      secondary={this.getHoursFromSeconds(song.seconds)}
                    />
                  </Link>
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="play"
                      onClick={() => this.onClickOnPlaySong(song.id)}
                    >
                      <PlayArrowIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                {index !== numberOfSongs - 1 && <Divider />}
              </Fragment>
            ))}
          </List>
        </Paper>
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  album: PropTypes.object,
  songs: PropTypes.array,
  error: PropTypes.bool.isRequired,
  getAlbumDetails: PropTypes.func.isRequired,
  loadingSong: PropTypes.bool
};

const mapStateToProps = state => ({
  ...state.albumDetails,
  loadingSong: state.song.loading
});

const mapDispatchToProps = dispatch => ({
  getAlbumDetails: id => dispatch(getAlbumDetails(id)),
  getSong: id => dispatch(getSong(id)),
  openFloatingPlayer: () => dispatch(openFloatingPlayer())
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Album));
