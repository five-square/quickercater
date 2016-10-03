import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { PopoverAnimationVertical } from 'material-ui/Popover';
// import NavigationClose from 'material-ui/svg-icons/navigation/close';
import EditColorScheme from './EditColorScheme';

const AppBarExampleIconMenu = (props) => (
  <AppBar
    title="My Dashboard"
    titleStyle={{ alignItems: 'left' }}
    iconStyleLeft={{ display: 'none' }}
    iconElementRight={
      <IconMenu
        iconButtonElement={
          <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        animation={PopoverAnimationVertical}
      >
        <MenuItem
          primaryText="Edit Packages and Menus"
          onTouchTap={props.toggleEditing}
        />
        <EditColorScheme />
        <MenuItem primaryText="Edit Owner Profile" />
      </IconMenu>
    }
  />
);

export default AppBarExampleIconMenu;
