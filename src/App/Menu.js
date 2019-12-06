import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import { DRAWER_WIDTH } from './constants';
import menuItems from './menuItems';
import { Typography } from '@material-ui/core';

const styles = theme => ({
  drawer: {
    width: DRAWER_WIDTH,
    flexShrink: 0
  },
  drawerPaper: {
    width: DRAWER_WIDTH,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
  toolbar: theme.mixins.toolbar,
  menuItemIcon: {
    minWidth: 35,
    color: theme.palette.primary.contrastText
  }
});

class Menu extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {menuItems.map(menuItem => {
            const { Icon, text } = menuItem;
            return (
              <ListItem button key={text}>
                <ListItemIcon className={classes.menuItemIcon}>
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={<Typography>{text}</Typography>} />
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    );
  }
}

export default withStyles(styles)(Menu);
