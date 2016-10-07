import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import Card from 'material-ui/Card';
import CardHeader from 'material-ui/Card/CardHeader';
import CardText from 'material-ui/Card/CardText';
import FlatButton from 'material-ui/FlatButton';
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
            title={this.props.globalOrder[owner].storeName}
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
          <DropDownMenu
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
          <CardText>
            Total Price = ${this.props.globalOrder[owner].totalPrice}
          </CardText>
          <OrderCard
            orderInfo={this.props.globalOrder[owner]}
            deleteOrderAfterSubmission={this.props.deleteOrderAfterSubmission}
            ownerId={owner}
            storeName={this.props.globalOrder[owner].storeName}
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
        <Drawer width={300} openSecondary open={this.props.open} style={{ zIndex: 200 }} >
          <AppBar
            title="My Order"
            titleStyle={{ textAlign: 'left' }}
            iconStyleLeft={{ display: 'none' }}
          >
            <FlatButton
              secondary
              label="Close"
              onTouchTap={e => this.handleToggle(e)}
            />
          </AppBar>
          <br />
          {cartItems}
        </Drawer>
      </div>
    );
  }
}
