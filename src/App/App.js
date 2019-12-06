import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Menu from './Menu';
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
  toolbar: theme.mixins.toolbar
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      albums: []
    };
  }

  async componentDidMount() {
    try {
      const res = await fetch('/albums');
      const json = await res.json();
      this.setState(prevState => ({
        ...prevState,
        loading: false,
        albums: json
      }));
    } catch (err) {
      console.error('Error accediendo al servidor', err);
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6">Reactify</Typography>
          </Toolbar>
        </AppBar>
        <Menu />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Typography variant="h6">Main page</Typography>
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(App);
