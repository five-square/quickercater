import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { PopoverAnimationVertical } from 'material-ui/Popover';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import ColorPicker from './ColorPicker';

export default class DashboardNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openDialog: false,
      oldColorTheme: null,
      colorTheme: this.props.colorTheme,
    };
    this.openMenu = e => this.handleOpenMenu(e);
    this.closeMenu = e => this.handleCloseMenu(e);
    this.closeMenuOpenDialog = e => this.handleCloseMenuOpenDialog(e);
    this.closeDialog = e => this.handleCloseDialog(e);
    this.cancelChange = e => this.handleCancelChange(e);
  }

  componentWillMount() {
    this.setState({
      oldColorTheme: Object.assign({}, this.props.colorTheme),
    });
  }

  handleOpenMenu() {
    this.setState({ open: true });
  }

  handleCloseMenu() {
    this.setState({ open: false });
  }

  handleCloseMenuOpenDialog() {
    this.setState({
      open: false,
      openDialog: true,
    });
  }

  handleCloseDialog() {
    this.setState({ openDialog: false });
  }

  handleCancelChange() {
    console.log('in DashboardNavBar: colorTheme', this.state.colorTheme);
    console.log('in DashboardNavBar: oldColorTheme', this.state.oldColorTheme);
    this.setState({ openDialog: false });
    this.props.changeTheme(this.state.oldColorTheme);
  }

  render() {
    const style = {
      dialog: {
        position: 'relative',
        height: 350,
        width: '100%',
      },
    };

    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={this.cancelChange}
      />,
      <FlatButton
        label="Submit"
        primary
        keyboardFocused
        onTouchTap={this.closeDialog}
      />,
    ];
    return (
      <div>
        <AppBar
          title="My Dashboard"
          titleStyle={{ textAlign: 'left' }}
          style={{ zIndex: 90 }}
          iconStyleLeft={{ display: 'none' }}
          iconElementRight={
            <IconMenu
              iconButtonElement={
                <IconButton><MoreVertIcon /></IconButton>
              }
              open={this.state.menuOpen}
              targetOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              animation={PopoverAnimationVertical}
            >
              <MenuItem
                primaryText="Edit Packages and Menus"
                onTouchTap={this.props.toggleEditing}
              />
              <MenuItem primaryText="Edit Color Scheme" onTouchTap={this.closeMenuOpenDialog} />
              <MenuItem primaryText="Edit Owner Profile" />
            </IconMenu>
          }
        />
        <Dialog
          title="Color Schemer"
          actions={actions}
          modal={false}
          open={this.state.openDialog}
          onRequestClose={this.closeDialog}
        >
          <div style={style.dialog}>
            <ColorPicker
              colorTheme={this.props.colorTheme}
              changeTheme={this.props.changeTheme}
            />
          </div>
        </Dialog>
      </div>
    );
  }
}
