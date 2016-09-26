import React, { Component } from 'react';
import Badge from 'material-ui/Badge';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Lobby from './Lobby';
import StoreFront from './StoreFront';
import Server from '../models/serverAPI';
import Navigation from './Navigation';
import Cart from './Cart';

import Badge from 'material-ui/Badge';
import cookieAPI from'../models/cookieAPI';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      owners: [],
      stores: [],
      currentOwnerId: false,
      currentStore: {},
      currentStoreName: 'Welcome to QuickerCater',
      showStore: false,
      globalOrder: {},
      openCart: false,
    };
  }


  componentWillMount() {
    console.log('Mounted',cookieAPI.getCookie('sessionId'));
    Server.getAllOwners()
    .then(owners => {
      this.setState({ owners });
       var ownerName = owners.find(owner=> owner.properties.auth_key == cookieAPI.getCookie('sessionId')).properties;
      console.log('ownername: ',ownerName);
    });
    Server.getAllStores()
    .then(stores => {
      console.log('stores: ', stores);
      this.setState({ stores });
    });
  }

  selectStore(storeObj) {
    Server.getOwnerByStoreId(storeObj.id)
    .then(owner => {
      console.log('in select Store', storeObj);
      this.setState({
        currentOwnerId: owner.id,
        currentStore: storeObj,
        currentStoreName: `Welcome to ${storeObj.name}`,
        showStore: true,
      });
    });
  }

  updateTotalPrice(sum) {
    this.setState({ totalPrice: this.state.totalPrice + sum });
  }

  handleAddItemToOrder(itemObj) {
    if (!this.state.globalOrder[itemObj.ownerId]) {
      this.state.globalOrder[itemObj.ownerId] = {};
      this.state.globalOrder[itemObj.ownerId].order = [];
      this.state.globalOrder[itemObj.ownerId].totalPrice = 0;
    }
    const itemPos = this.state.globalOrder[itemObj.ownerId].order
      .map(itemInfo => itemInfo.item.id).indexOf(itemObj.item.id);
    // Check to see if the item is already in the list
    if (itemPos < 0) {
      this.state.globalOrder[itemObj.ownerId].order.push(itemObj);
      this.setState({
        openCart: true,
      });
    }
  }

  updateItemToOrder(itemObj) {
    const itemPos = this.state.globalOrder[itemObj.ownerId].order
      .map(itemInfo => itemInfo.item.id).indexOf(itemObj.item.id);
    this.state.globalOrder[itemObj.ownerId].order[itemPos] = itemObj;
    if (this.state.globalOrder[itemObj.ownerId].order.length > 1) {
      this.state.globalOrder[itemObj.ownerId].totalPrice =
        this.state.globalOrder[itemObj.ownerId].order
        .reduce((a, b) => (a.item.price * a.quantity) + (b.item.price * b.quantity));
    } else {
      this.state.globalOrder[itemObj.ownerId].totalPrice =
          (this.state.globalOrder[itemObj.ownerId].order[0].item.price
          * this.state.globalOrder[itemObj.ownerId].order[0].quantity);
    }
    this.setState({
      openCart: true,
    });
  }

  removeItemFromOrder(ownerId, itemId) {
    const itemPos = this.state.globalOrder[ownerId].order
      .map(itemInfo => itemInfo.item.id).indexOf(itemId);
    this.state.globalOrder[ownerId].totalPrice =
      (this.state.globalOrder[ownerId].totalPrice -
          (this.state.globalOrder[ownerId].order[itemPos].item.price
          * this.state.globalOrder[ownerId].order[itemPos].quantity));
    this.state.globalOrder[ownerId].order.splice(itemPos, 1);
    this.setState({
      openCart: true,
    });
  }

  deleteOrderAfterSubmission(ownerId) {
    delete this.state.globalOrder[ownerId];
    this.setState({
      openCart: true,
    });
  }

  viewCart() {
    console.log('trying to view cart');
    this.setState({
      openCart: !this.state.openCart,
    });
  }

  handleBackClick() {
    this.setState({
      showStore: false,
      currentStoreName: 'Welcome to QuickerCater',
    });
  }
        // muiTheme={getMuiTheme(darkBaseTheme)}>

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <Navigation
              title={this.state.currentStoreName}
              inStore={this.state.showStore}
              goBack={e => this.handleBackClick(e)}
              viewCart={e => this.viewCart(e)}
              showMyStore={cookieAPI.getCookie('sessionId') !== ''}
            />
            <div>
              <Cart
                open={this.state.openCart}
                globalOrder={this.state.globalOrder}
                viewCart={e => this.viewCart(e)}
                ownerId={this.state.currentOwnerId}
                totalPrice={this.state.updateTotalPrice}
                updateItemToOrder={(e, x) => this.updateItemToOrder(e, x)}
                removeItemFromOrder={(e, x) => this.removeItemFromOrder(e, x)}
                deleteOrderAfterSubmission={e => this.deleteOrderAfterSubmission(e)}
              />
            </div>
            { this.state.showStore
              ? <StoreFront
                ownerId={this.state.currentOwnerId}
                store={this.state.currentStore}
                addItemToOrder={e => this.handleAddItemToOrder(e)}
                updateTotalPrice={this.updateTotalPrice}
              />
              : <Lobby stores={this.state.stores} selectStore={(id, name) => this.selectStore(id, name)} />
            }
          </div>
        </MuiThemeProvider>
        <MuiThemeProvider>
          <div style={{ textAlign: 'center' }}>
            <Badge
              badgeContent="&copy;QuickerCater"
              badgeStyle={{ fontSize: 12 }}
            />
          </div>
        </MuiThemeProvider>
      </div>
  );
  }
}

