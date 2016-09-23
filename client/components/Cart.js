import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import CartItemCard from './CartItemCard';

export default class Cart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      style: this.props.style,
      order: this.props.order,
    };
  }

  handleToggle() {
    this.props.viewCart();
  }

  render() {
    return (
      <div>
        <Drawer width={300} openSecondary open={this.props.open} >
          <Toolbar>
            <ToolbarGroup>
              <ToolbarTitle text="My Order" />
            </ToolbarGroup>
            <ToolbarGroup>
              <RaisedButton
                primary
                label="Close"
                onTouchTap={e => this.handleToggle(e)}
              />
            </ToolbarGroup>
          </Toolbar>
          <br />
          {this.state.order.map((item, index) =>
            <CartItemCard
              key={index}
              style={this.props.style}
              item={item}
            />
          )}
        </Drawer>
      </div>
    );
  }
}
