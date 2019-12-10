import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import AppHeader from './AppBar';
import Menu from './Menu';
import ErrorBoundary from './ErrorBoundary';

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

const Recommendations = React.lazy(() => import('./Recommendations'));
const AlbumList = React.lazy(() => import('./AlbumList'));
const Album = React.lazy(() => import('./Album'));
const Player = React.lazy(() => import('./Player'));
const Login = React.lazy(() => import('./Login'));

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
                        <Route exact path="/albums" component={AlbumList} />
                        <Route exact path="/albums/:id" component={Album} />
                        <Route exact path="/player/song/:id" component={Player} />
                        <Route exact path="/login" component={Login} />
                      </Switch>
                    </ErrorBoundary>
                  </div>
                </React.Suspense>
              </main>
            </Router>
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
