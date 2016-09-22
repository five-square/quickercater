import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import CartItemCard from './CartItemCard';

export default class Cart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      style: this.props.style,
      // open: this.props.open,
      order: this.props.order,
    };
  }

  // componentWillReceiveProps(open) {
  //   this.setState({
  //     open,
  //   });
  // }

  handleToggle() {
    this.props.viewCart();
  }
              // zDepth={0} containerStyle={{ marginTop: 64, marginRight: 8, borderLeft: '1px solid #e8e8e8' }}
              // <ToolbarSeparator />

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
