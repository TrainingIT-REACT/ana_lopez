import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '@babel/polyfill';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import AppHeader from './AppBar';
import Menu from './Menu';
import Recommendations from './Recommendations';
import ErrorBoundary from './ErrorBoundary';
import PrivateRoute from './PrivateRoute';
import FloatingPlayer from './FloatingPlayer';
import store from './store';

const styles = theme => ({
  root: {
    display: 'flex'
  },
  main: {
    width: '100%'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: theme.palette.grey[100],
    height: '100%'
  },
  toolbar: theme.mixins.toolbar
});

const AlbumList = React.lazy(() => import('./AlbumList'));
const Album = React.lazy(() => import('./Album'));
const Player = React.lazy(() => import('./PlayerView'));
const Login = React.lazy(() => import('./Login'));
const UserProfile = React.lazy(() => import('./UserProfile'));
const Search = React.lazy(() => import('./Search'));
const NotFound = React.lazy(() => import('./NotFound'));

class App extends Component {
  reloadPage = () => {
    window.location.reload();
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Suspense fallback="Cargando...">
        <div className={classes.root}>
          <ErrorBoundary
            message="Algo ha ido mal al cargar la applicación. Pulsa el botón para refrescar la página:"
            onRetry={this.reloadPage}
          >
            <Provider store={store}>
              <Router>
                <AppHeader />
                <Menu />
                <main className={classes.main}>
                  <div className={classes.toolbar} />
                  <React.Suspense fallback={<LinearProgress />}>
                    <div className={classes.content}>
                      <ErrorBoundary
                        message="Ha ocurrido un error en la página a la que estás accediendo. Pulsa el botón para refrescar:"
                        onRetry={this.reloadPage}
                      >
                        <Switch>
                          <Route exact path="/" component={Recommendations} />
                          <Route exact path="/album-list" component={AlbumList} />
                          <Route exact path="/album-list/:id([0-9]*)" component={Album} />
                          <Route exact path="/player/song/:id([0-9]*)" component={Player} />
                          <Route exact path="/search" component={Search} />
                          <Route exact path="/login" component={Login} />
                          <PrivateRoute exact path="/profile" component={UserProfile} />
                          <Route component={NotFound} />
                        </Switch>
                      </ErrorBoundary>
                    </div>
                  </React.Suspense>
                </main>
              </Router>
              <FloatingPlayer />
            </Provider>
          </ErrorBoundary>
        </div>
      </React.Suspense>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
