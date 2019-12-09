import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import HeadsetIcon from '@material-ui/icons/Headset';
import { withStyles } from '@material-ui/core/styles';
import Menu from './Menu';
import Recommendations from './Recommendations';
import AlbumList from './AlbumList';
import Album from './Album';
import Player from './Player';
import Login from './Login';
import { DRAWER_WIDTH } from './constants';

const styles = theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    marginLeft: DRAWER_WIDTH
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: theme.palette.grey[100],
    height: '100%'
  },
  toolbar: theme.mixins.toolbar,
  title: {
    flexGrow: 1
  },
  icon: {
    marginRight: 10
  }
});

const LinkToLogin = React.forwardRef((props, ref) => <NavLink innerRef={ref} exact {...props} />);

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Router>
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
              <HeadsetIcon className={classes.icon} />
              <Typography variant="h6" className={classes.title}>
                Reactify
              </Typography>
              <Button color="inherit" component={LinkToLogin} to="/login">
                Login
              </Button>
            </Toolbar>
          </AppBar>
          <Menu />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Switch>
              <Route exact path="/" component={Recommendations} />
              <Route exact path="/albums" component={AlbumList} />
              <Route exact path="/albums/:id" component={Album} />
              <Route exact path="/player/song/:id" component={Player} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </main>
        </Router>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
