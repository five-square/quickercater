import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import Card from 'material-ui/Card';
import CardHeader from 'material-ui/Card/CardHeader';
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
      classname: 'hidden',
    };
  }

  handleToggle() {
    this.props.viewCart();
  }

  handleShowHide() {
    if (this.state.classname === 'hidden') {
      this.setState({ classname: 'show' });
    } else {
      this.setState({ classname: 'hidden' });
    }
  }

  createCartItemsArray() {
    if (this.props.globalOrder) {
      return Object.keys(this.props.globalOrder).map((owner, orderIndex) =>
        <Card key={orderIndex * 2}>
          <CardHeader
            title={this.props.globalOrder[owner].storeName}
            actAsExpander
            showExpandableButton
            onClick={e => this.handleShowHide(e)}
          />
          {console.log('orderIndex in Cart: ', orderIndex * 2)}
          {this.props.globalOrder[owner].order.map((itemInfo, cardIndex) =>
            <CartItemCard
              key={(cardIndex * 2) + 1}
              style={this.props.style}
              item={itemInfo.item}
              quantity={itemInfo.quantity}
              priceToShow={itemInfo.priceToShow}
              updateOrderPrice={this.updateOrderPrice}
              updateItemToOrder={this.props.updateItemToOrder}
              removeItemFromOrder={this.props.removeItemFromOrder}
              ownerId={owner}
            >{console.log('cardIndex in Cart: ', (cardIndex * 2) + 1)}</CartItemCard>
          )}
          <CardText>
            Total Price = ${this.props.globalOrder[owner].totalPrice}
          </CardText>
          <OrderCard
            orderInfo={this.props.globalOrder[owner]}
            deleteOrderAfterSubmission={this.props.deleteOrderAfterSubmission}
            ownerId={owner}
          />
        </Card>
      );
    }
    return null;
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
