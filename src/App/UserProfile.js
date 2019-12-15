import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import PersonIcon from '@material-ui/icons/Person';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 20
  },
  paper: {
    padding: 20,
    width: 700
  },
  imageContainer: {
    width: 160,
    height: 160,
    backgroundColor: theme.palette.grey[200],
    borderRadius: 5
  },
  icon: {
    width: '100%',
    height: '100%'
  },
  userInfoContainer: {
    display: 'flex'
  },
  userDataContainer: {
    marginLeft: 10
  },
  link: {
    textDecoration: 'none'
  }
}));

const locations = [
  { city: 'Jaén', country: 'España' },
  { city: 'Granada', country: 'España' },
  { city: 'Málaga', country: 'España' },
  { city: 'Madrid', country: 'España' },
  { city: 'Las Vegas', country: 'EEUU' },
  { city: 'Pamplona', country: 'España' },
  { city: 'Tampa', country: 'EEUU' },
  { city: 'Bolonia', country: 'Italia' },
  { city: 'Lisboa', country: 'Protugal' },
  { city: 'Dublin', country: 'Irlanda' }
];

const getRandomData = () => {
  const randomLocationIndex = Math.floor(Math.random() * locations.length);
  const location = locations[randomLocationIndex];
  return {
    age: Math.floor(Math.random() * 80),
    city: location.city,
    country: location.country
  };
};

const LinkToItem = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);

const UserProfile = props => {
  const classes = useStyles();
  const randomData = getRandomData();
  const { lastAlbums, lastSongs } = props;
  const numberOfAlbums = lastAlbums.length;
  const numberOfSongs = lastSongs.length;
  const thereAreItemsInHistory = numberOfAlbums > 0 || numberOfSongs > 0;
  return (
    <>
      <div className={classes.container}>
        <Paper className={classes.paper}>
          <div className={classes.userInfoContainer}>
            <div className={classes.imageContainer}>
              <PersonIcon className={classes.icon} />
            </div>
            <div className={classes.userDataContainer}>
              <Typography variant="body2" color="textSecondary">
                Nombre:{' '}
                <Typography variant="body1" color="textPrimary" display="inline">
                  {props.userName}
                </Typography>
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Edad:{' '}
                <Typography variant="body1" color="textPrimary" display="inline">
                  {randomData.age}
                </Typography>
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Ciudad:{' '}
                <Typography variant="body1" color="textPrimary" display="inline">
                  {randomData.city}
                </Typography>
              </Typography>
              <Typography variant="body2" color="textSecondary">
                País:{' '}
                <Typography variant="body1" color="textPrimary" display="inline">
                  {randomData.country}
                </Typography>
              </Typography>
            </div>
          </div>
        </Paper>
      </div>
      {thereAreItemsInHistory && (
        <div className={classes.container}>
          <Paper className={classes.paper}>
            {numberOfAlbums > 0 && (
              <>
                <Typography>Últimos álbumes visitados</Typography>
                <List>
                  {lastAlbums.map((album, index) => (
                    <Fragment key={index}>
                      <ListItem>
                        <Link
                          to={`/album-list/${album.id}`}
                          component={LinkToItem}
                          className={classes.link}
                          color="inherit"
                        >
                          <ListItemText primary={album.name} secondary={`de ${album.artist}`} />
                        </Link>
                      </ListItem>
                      {index !== numberOfAlbums - 1 && <Divider />}
                    </Fragment>
                  ))}
                </List>
              </>
            )}

            {numberOfSongs > 0 && (
              <>
                <Typography>Últimas canciones escuchadas</Typography>
                <List>
                  {lastSongs.map((song, index) => (
                    <Fragment key={index}>
                      <ListItem>
                        <Link
                          to={`/player/song/${song.id}`}
                          component={LinkToItem}
                          className={classes.link}
                          color="inherit"
                        >
                          <ListItemText primary={song.name} secondary={`de ${song.artist}`} />
                        </Link>
                      </ListItem>
                      {index !== numberOfSongs - 1 && <Divider />}
                    </Fragment>
                  ))}
                </List>
              </>
            )}
          </Paper>
        </div>
      )}
    </>
  );
};

UserProfile.propTypes = {
  userName: PropTypes.string,
  lastAlbums: PropTypes.array.isRequired,
  lastSongs: PropTypes.array.isRequired
};

const mapStateToProps = state => {
  return {
    userName: state.user.name,
    lastAlbums: state.history.albums,
    lastSongs: state.history.songs
  };
};

export default connect(mapStateToProps)(UserProfile);
