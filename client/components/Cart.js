import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import CartItemCard from './CartItemCard';

export default class Cart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      style: this.props.style,
      open: this.props.open,
      order: this.props.order,
    };
  }

  handleToggle() {
    this.setState({
      open: !this.state.open,
    });
  }

  render() {
    return (
      <div>
        <RaisedButton
          style={{ textAlign: 'right' }}
          label="View Cart"
          onTouchTap={e => this.handleToggle(e)}
        />
        <Drawer width={300} openSecondary open={this.state.open} >
          <AppBar title="Current Order" />
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
