import React, { memo } from 'react';
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
  const { name, artist, cover } = props;
  return (
    <Card>
      <CardActionArea onClick={props.onClickOnAlbum}>
        <CardMedia className={classes.media} image={cover} />
        <CardContent>
          <Typography gutterBottom variant="h6">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            de {artist}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

AlbumCard.propTypes = {
  name: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  onClickOnAlbum: PropTypes.func.isRequired
};

AlbumCard.defaultProps = {
  onClickOnAlbum: () => ({})
};

export default memo(AlbumCard);
