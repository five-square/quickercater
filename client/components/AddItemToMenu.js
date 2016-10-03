import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

export default class PopoverExampleSimple extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      anchorEl: event.currentTarget,
    };
    this.touchTap = e => this.handleTouchTap(e);
    this.requestClose = e => this.handleRequestClose(e);
    this.pickMenu = e => this.handlePickMenu(e);
  }

  handleTouchTap(event) {
    event.preventDefault();
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  handlePickMenu(menuId) {
    console.log(`You picked menu id: ${menuId}, ${this.props.item.id}`);
    this.handleRequestClose();
    this.props.addItemToMenu(this.props.item.id, menuId);
  }

  render() {
    return (
      <div>
        <FloatingActionButton
          style={this.props.style}
          mini
          secondary
          zDepth={0}
          onTouchTap={this.touchTap}
        >
          <ContentAdd />
        </FloatingActionButton>
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          onRequestClose={this.requestClose}
        >
          <Menu>
            {this.props.menus.map((menu, index) =>
              <MenuItem
                key={index}
                value={menu.id}
                primaryText={menu.name}
                onTouchTap={() => this.pickMenu(menu.id)}
              />
            )}
          </Menu>
        </Popover>
      </div>
    );
  }
}
