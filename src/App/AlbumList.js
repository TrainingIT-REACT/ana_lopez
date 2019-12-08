import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import AlbumCard from './components/AlbumCard';

class AlbumList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      albums: []
    };
  }

  async componentDidMount() {
    try {
      const resAlbums = await fetch('/albums');
      const albums = await resAlbums.json();
      this.setState(prevState => ({
        ...prevState,
        loading: false,
        albums
      }));
    } catch (err) {
      console.error('Error accediendo al servidor', err);
    }
  }

  onClickOnAlbum = albumId => {
    const currentLocation = this.props.location.pathname;
    this.props.history.push(`${currentLocation}/${albumId}`);
  };

  render() {
    const { albums } = this.state;
    return (
      <>
        <Grid container spacing={2}>
          {albums.map((album, index) => (
            <Grid item xs={12} sm={6} md={4} xl={3} key={index}>
              <AlbumCard album={album} onClickOnAlbum={() => this.onClickOnAlbum(album.id)} />
            </Grid>
          ))}
        </Grid>
      </>
    );
  }
}

AlbumList.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default AlbumList;
