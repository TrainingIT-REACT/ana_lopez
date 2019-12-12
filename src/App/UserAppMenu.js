import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { withStyles } from '@material-ui/core/styles';
import { logout } from './actions/login';

const styles = theme => ({
  menu: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white
  }
});

class UserAppMenu extends Component {
  constructor(props) {
    super(props);
    this.anchorRef = React.createRef();
    this.state = {
      menuOpen: false
    };
  }

  handleToggle = () => {
    this.setState(state => {
      return { menuOpen: !state.menuOpen };
    });
  };

  handleClose = () => {
    this.setState({ menuOpen: false });
  };

  onClickOnLogout = () => {
    this.handleClose();
    this.props.logout();
  };

  onClickOnUserProfile = () => {
    this.handleClose();
    this.props.history.push('/profile');
  };

  render() {
    const { user, classes } = this.props;
    return (
      <>
        <Button
          ref={this.anchorRef}
          onClick={this.handleToggle}
          color="inherit"
          startIcon={<AccountCircleIcon />}
          endIcon={<ArrowDropDownIcon />}
        >
          {user}
        </Button>
        <Popper
          open={this.state.menuOpen}
          anchorEl={this.anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <MenuList autoFocusItem={this.state.menuOpen} className={classes.menu}>
                    <MenuItem onClick={this.onClickOnUserProfile}>Your Profile</MenuItem>
                    <MenuItem onClick={this.onClickOnLogout}>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </>
    );
  }
}

UserAppMenu.propTypes = {
  user: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

const styledUserAppMenu = withStyles(styles)(UserAppMenu);
const connectedUserAppMenu = connect(null, mapDispatchToProps)(styledUserAppMenu);
export default withRouter(connectedUserAppMenu);
