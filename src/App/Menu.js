import React from 'react';
import { NavLink } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import { DRAWER_WIDTH } from './constants';
import menuItems from './menuItems';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
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
  },
  menuActive: {
    backgroundColor: theme.palette.action.selected
  }
}));

const LinkToItemRoute = React.forwardRef((props, ref) => (
  <NavLink innerRef={ref} exact {...props} />
));

const Menu = () => {
  const classes = useStyles();
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
          const { Icon, text, route } = menuItem;

          return (
            <ListItem
              button
              key={text}
              component={LinkToItemRoute}
              to={route}
              activeClassName={classes.menuActive}
            >
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
};

export default Menu;
