import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  },
  content: {
    flex: 1
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1)
  },
  playIcon: {
    height: 38,
    width: 38
  },
  cover: {
    width: 151
  },
  songName: {
    fontWeight: 600
  }
}));

const SongCard = props => {
  const classes = useStyles();
  const { song, album } = props;
  return (
    <Card className={classes.card}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography variant="subtitle2" className={classes.songName}>
            {song.name}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {song.artist}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            Álbum: {song.album}
          </Typography>
          <div className={classes.controls}></div>
          <div className={classes.controls}>
            <IconButton>
              <PlayArrowIcon className={classes.playIcon} />
            </IconButton>
          </div>
        </CardContent>
      </div>
      <CardMedia className={classes.cover} image={song.cover} />
    </Card>
  );
};

SongCard.propTypes = {
  classes: PropTypes.object.isRequired,
  song: PropTypes.object.isRequired,
  album: PropTypes.object.isRequired
};

export default SongCard;
