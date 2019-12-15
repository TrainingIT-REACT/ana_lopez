import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import HeadsetIcon from '@material-ui/icons/Headset';
import { makeStyles } from '@material-ui/core/styles';
import UserAppMenu from './UserAppMenu';
import { DRAWER_WIDTH } from '../constants';

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

const AppHeader = props => {
  const classes = useStyles();
  const { user } = props;
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <HeadsetIcon className={classes.icon} />
        <Typography variant="h6" className={classes.title}>
          Reactify
        </Typography>
        {user && <UserAppMenu user={user} />}
        {!user && (
          <Button color="inherit" component={LinkToLogin} to="/login">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

AppBar.propTypes = {
  user: PropTypes.string
};

const mapStateToProps = state => {
  return {
    user: state.user.name
  };
};

export default connect(mapStateToProps)(AppHeader);
