import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
  media: {
    height: 140
  }
});

const AlbumCard = props => {
  const classes = useStyles();
  const { album } = props;
  return (
    <Card>
      <CardActionArea>
        <CardMedia className={classes.media} image={album.cover} />
        <CardContent>
          <Typography gutterBottom variant="h6">
            {album.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            de {album.artist}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

AlbumCard.propTypes = {
  classes: PropTypes.object.isRequired,
  album: PropTypes.object.isRequired
};

export default AlbumCard;
