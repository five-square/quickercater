import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import Card from 'material-ui/Card';
import CardText from 'material-ui/Card/CardText';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import CartItemCard from './CartItemCard';
import OrderCard from './OrderCard';


export default class Cart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      style: this.props.style,
      order: this.props.globalOrder,
      currentOwnerId: this.props.ownerId,
    };
  }

  handleToggle() {
    this.props.viewCart();
  }

  createCartItemsArray() {
    const cartItems = [];
    let owner = '';
    if (this.props.globalOrder) {
      for (owner in this.props.globalOrder) {
        if (this.props.globalOrder.hasOwnProperty(owner)) {
          cartItems.push(<Card>
            <h4>Owner:{owner}</h4>
            {this.props.globalOrder[owner].order.map((itemInfo, index) =>
              <CartItemCard
                key={index}
                style={this.props.style}
                item={itemInfo.item}
                quantity={itemInfo.quantity}
                updateOrderPrice={this.updateOrderPrice}
                updateItemToOrder={this.props.updateItemToOrder}
                removeItemFromOrder={this.props.removeItemFromOrder}
                ownerId={owner}
              />
            )}
            <CardText>
              Total Price = ${this.props.globalOrder[owner].totalPrice}
            </CardText>
            <OrderCard
              orderInfo={this.props.globalOrder[owner]}
              deleteOrderAfterSubmission={this.props.deleteOrderAfterSubmission}
              OwnerId={owner}
            />
          </Card>);
        }
      }
    }
    return cartItems;
  }

  render() {
    const cartItems = this.createCartItemsArray();
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
          {cartItems}
        </Drawer>
      </div>
    );
  }
}
