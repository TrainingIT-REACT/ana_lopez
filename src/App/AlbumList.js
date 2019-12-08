import React, { Component } from 'react';
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

  render() {
    const { albums } = this.state;
    return (
      <>
        <Grid container spacing={2}>
          {albums.map(album => (
            <Grid item xs={12} sm={6} md={4} xl={3}>
              <AlbumCard album={album} />
            </Grid>
          ))}
        </Grid>
      </>
    );
  }
}

export default AlbumList;
