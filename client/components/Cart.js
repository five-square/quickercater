import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import Card from 'material-ui/Card';
import CardHeader from 'material-ui/Card/CardHeader';
import CardText from 'material-ui/Card/CardText';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';

import CartItemCard from './CartItemCard';
import OrderCard from './OrderCard';


export default class Cart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      style: this.props.style,
      order: this.props.globalOrder,
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

  handleChoosePkg(event, value, ownerId) {
    if (value > 0) {
      const packId = this.props.globalOrder[ownerId].packages[value - 1].id;
      this.props.updatePackageOption(ownerId, packId);
    }
  }

  createCartItemsArray() {
    const style = {
      defaultPkgText: { color: 'red' },
    };
    if (this.props.globalOrder) {
      return Object.keys(this.props.globalOrder).map((owner, orderIndex) =>
        <Card key={orderIndex * 6} initiallyExpanded >
          <CardHeader
            title={this.props.globalOrder[owner].store.name}
            actAsExpander
            showExpandableButton
            onClick={e => this.handleShowHide(e)}
          />
          <CardText expandable>
            {this.props.globalOrder[owner].order.map((itemInfo, cardIndex) =>
              <CartItemCard
                key={(cardIndex * 6) + 1}
                passKey={(cardIndex * 6) + 1}
                style={this.props.style}
                item={itemInfo.item}
                quantity={itemInfo.quantity}
                priceToShow={itemInfo.priceToShow}
                updateOrderPrice={this.updateOrderPrice}
                updateItemToOrder={this.props.updateItemToOrder}
                removeItemFromOrder={this.props.removeItemFromOrder}
                ownerId={owner}
              />
            )}
          </CardText>
          {this.props.globalOrder[owner].packages.length > 0
            ? <DropDownMenu
              value={this.props.globalOrder[owner].selectedPkgId}
              autoWidth
              onChange={(e, value) => {
                const tempOwner = owner;
                this.handleChoosePkg(e, value, tempOwner);
              }}
              labelStyle={this.props.globalOrder[owner].selectedPkgId > 0
                ? null
                : style.defaultPkgText}
            >
              <MenuItem
                key={0}
                value={0}
                primaryText="Choose a package"
              />
              {this.props.globalOrder[owner].packages.map((pack, index) => {
                const pkgDesc = `${pack.name} : $ ${pack.cost}`;
                const indexPack = index + 1;
                return (<MenuItem
                  key={indexPack}
                  value={pack.id}
                  primaryText={pkgDesc}
                />);
              })}
            </DropDownMenu>
            : null
          }

          <CardText>
            Total Price = ${this.props.globalOrder[owner].totalPrice}
          </CardText>
          <OrderCard
            orderInfo={this.props.globalOrder[owner]}
            deleteOrderAfterSubmission={this.props.deleteOrderAfterSubmission}
            ownerId={owner}
            store={this.props.globalOrder[owner].store}
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
        <Drawer
          width={350}
          openSecondary
          open={this.props.open}
          onRequestChange={e => this.handleToggle(e)}
          style={{ zIndex: 200 }}
        >
          <AppBar
            title="My Order"
            titleStyle={{ textAlign: 'left' }}
            iconStyleLeft={{ display: 'none' }}
            iconStyleRight={{ marginTop: 14 }}
            iconElementRight={
              <RaisedButton
                secondary
                label="Close"
                onTouchTap={e => this.handleToggle(e)}
              />
            }
          />
          <br />
          {cartItems}
        </Drawer>
      </div>
    );
  }
}
