import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import AlbumCard from './components/AlbumCard';
import { getAlbums } from '../actions/albums';

class AlbumList extends Component {
  componentDidMount() {
    this.props.getAlbums();
  }

  onClickOnAlbum = albumId => {
    const currentLocation = this.props.location.pathname;
    this.props.history.push(`${currentLocation}/${albumId}`);
  };

  render() {
    const { albums } = this.props;
    if (this.props.loading) return <p>Cargando álbumes...</p>;
    if (this.props.error) return <p>Ha ocurrido un error al cargar la lista de álbumes</p>;
    return (
      <Grid container spacing={2}>
        {albums.map((album, index) => (
          <Grid item xs={12} sm={6} md={4} xl={3} key={index}>
            <AlbumCard
              name={album.name}
              artist={album.artist}
              cover={album.cover}
              onClickOnAlbum={() => this.onClickOnAlbum(album.id)}
            />
          </Grid>
        ))}
      </Grid>
    );
  }
}

AlbumList.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  albums: PropTypes.array.isRequired,
  error: PropTypes.bool.isRequired,
  getAlbums: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  ...state.albums
});

const mapDispatchToProps = dispatch => ({
  getAlbums: () => dispatch(getAlbums())
});

export default connect(mapStateToProps, mapDispatchToProps)(AlbumList);
