import React from 'react';
import { NavLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import HeadsetIcon from '@material-ui/icons/Headset';
import { makeStyles } from '@material-ui/core/styles';
import { DRAWER_WIDTH } from './constants';

const useStyles = makeStyles(theme => ({
  appBar: {
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    marginLeft: DRAWER_WIDTH
  },
  toolbar: theme.mixins.toolbar,
  icon: {
    marginRight: 10
  },
  title: {
    flexGrow: 1
  }
}));

const LinkToLogin = React.forwardRef((props, ref) => <NavLink innerRef={ref} exact {...props} />);

const AppHeader = () => {
  const classes = useStyles();
  return (
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
  );
};

export default AppHeader;
