import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppHeader from './AppBar';
import Menu from './Menu';
import Recommendations from './Recommendations';
import AlbumList from './AlbumList';
import Album from './Album';
import Player from './Player';
import Login from './Login';
import ErrorBoundary from './ErrorBoundary';

const styles = theme => ({
  root: {
    display: 'flex'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: theme.palette.grey[100],
    height: '100%'
  },
  toolbar: theme.mixins.toolbar
});

class App extends Component {
  reloadPage = () => {
    window.location.reload();
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <ErrorBoundary
          message="Algo ha ido mal al cargar la applicación. Pulsa el botón para refrescar la página:"
          onRetry={this.reloadPage}
        >
          <Router>
            <AppHeader />
            <Menu />
            <main className={classes.content}>
              <div className={classes.toolbar} />
              <ErrorBoundary
                message="Ha ocurrido un error en la página a la que estás accediendo. Pulsa el botón para refrescar:"
                onRetry={this.reloadPage}
              >
                <Switch>
                  <Route exact path="/" component={Recommendations} />
                  <Route exact path="/albums" component={AlbumList} />
                  <Route exact path="/albums/:id" component={Album} />
                  <Route exact path="/player/song/:id" component={Player} />
                  <Route exact path="/login" component={Login} />
                </Switch>
              </ErrorBoundary>
            </main>
          </Router>
        </ErrorBoundary>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
