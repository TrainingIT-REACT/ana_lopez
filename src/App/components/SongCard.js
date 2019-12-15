import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
    minHeight: 125,
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: theme.palette.action.hover
    }
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  },
  content: {
    flex: 1
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
  const { name, artist, album, cover } = props;
  return (
    <Card className={classes.card} onClick={props.onClickOnSong}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography variant="subtitle2" className={classes.songName}>
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {artist}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            Álbum: {album}
          </Typography>
        </CardContent>
      </div>
      <CardMedia className={classes.cover} image={cover} />
    </Card>
  );
};

SongCard.propTypes = {
  name: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  album: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
  onClickOnSong: PropTypes.func.isRequired
};

export default memo(SongCard);
