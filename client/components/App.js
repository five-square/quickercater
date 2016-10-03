import React, { Component } from 'react';
import Badge from 'material-ui/Badge';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Lobby from './Lobby';
import StoreFront from './StoreFront';
import Server from '../models/serverAPI';
import Navigation from './Navigation';
import Cart from './Cart';
import cookieAPI from '../models/cookieAPI';
import OwnerAPI from '../models/ownerAPI';
import RegisterModal from './RegisterModal';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      owners: [],
      stores: [],
      currentOwnerId: false,
      currentStore: {},
      currentStoreName: 'Welcome to QuickerCater',
      storeName: 'QuickerCater',
      showStore: false,
      globalOrder: {},
      openCart: false,
      myStore: null,
      showRegisterModal: false,
    };
  }


  componentWillMount() {
    console.log('Mounted App. Session Id: ', cookieAPI.getCookie('sessionId'));
    const sessId = cookieAPI.getCookie('sessionId');

    // sessId = 'ya29.Ci9qAxZIA7hXRvO68DYxb45faKUCweuu2YrGawMJzrH1LZ_U8ia_8GCw52jdmgS8CQ';
    Server.getAllStores().then(stores => {
      this.setState({ stores });
    });

    if (sessId !== undefined && sessId !== '') {
      OwnerAPI.getStoreAndOwnerByAuthKey(sessId).then(storeAndOwner => {
        if (storeAndOwner && storeAndOwner.length > 0 && storeAndOwner[0].store) {
          console.log('Owner of storeAndOwner:', storeAndOwner);
          this.setState({
            myStore: storeAndOwner[0].store,
            currentOwnerId: storeAndOwner[0].owner._id,
          });
        } else if (storeAndOwner.length > 0 || storeAndOwner[0].owner) {
          console.log('Logged in, no associated store', storeAndOwner);
          this.setState({
            showRegisterModal: true,
            currentOwnerId: storeAndOwner[0].owner._id,
          });
        }
      });
    } else {
      console.log('Unauthenticated user.');
    }
  }

  selectStore(storeObj) {
    console.log('Select store: ', storeObj);
    let id = storeObj.id;
    if (storeObj._id && id === undefined) {
      id = storeObj._id;
    }
    Server.getOwnerByStoreId(id)
    .then(owner => {
      console.log('in select Store', storeObj);
      this.setState({
        currentOwnerId: owner.id,
        currentStore: storeObj,
        currentStoreName: `Welcome to ${storeObj.name}`,
        storeName: storeObj.name,
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
      this.state.globalOrder[itemObj.ownerId].storeName = this.state.storeName;
    }
    const tempOrder = Object.assign({}, this.state.globalOrder);
    const itemPos = tempOrder[itemObj.ownerId].order
      .map(itemInfo => itemInfo.item.id).indexOf(itemObj.item.id);
    // Check to see if the item is already in the list
    if (itemPos < 0) {
      tempOrder[itemObj.ownerId].order.push(itemObj);
      tempOrder[itemObj.ownerId].totalPrice =
            Number(parseFloat(tempOrder[itemObj.ownerId].totalPrice) +
                        (parseFloat(itemObj.item.price)))
                        .toFixed(2);
      this.setState({
        globalOrder: tempOrder,
        openCart: true,
      });
    }
  }

  updateItemToOrder(itemObj) {
    const tempOrder = Object.assign({}, this.state.globalOrder);
    const itemPos = tempOrder[itemObj.ownerId].order
      .map(itemInfo => itemInfo.item.id).indexOf(itemObj.item.id);
    tempOrder[itemObj.ownerId].order[itemPos] = itemObj;
    if (tempOrder[itemObj.ownerId].order.length > 1) {
      tempOrder[itemObj.ownerId].totalPrice =
        Number(tempOrder[itemObj.ownerId].order
        .reduce((a, b) => a + (b.item.price * parseInt(b.quantity, 10)), 0))
        .toFixed(2);
    } else if (tempOrder[itemObj.ownerId].order.length === 1) {
      tempOrder[itemObj.ownerId].totalPrice =
          Number((tempOrder[itemObj.ownerId].order[0].item.price
          * tempOrder[itemObj.ownerId].order[0].quantity))
          .toFixed(2);
    }
    this.setState({
      globalOrder: tempOrder,
      openCart: true,
    });
  }

  removeItemFromOrder(ownerId, itemId) {
    const tempOrder = Object.assign({}, this.state.globalOrder);
    const itemPos = tempOrder[ownerId].order
      .map(itemInfo => itemInfo.item.id).indexOf(itemId);
    tempOrder[ownerId].totalPrice =
          (tempOrder[ownerId].totalPrice -
          (tempOrder[ownerId].order[itemPos].item.price
          * tempOrder[ownerId].order[itemPos].quantity))
          .toFixed(2);
    tempOrder[ownerId].order.splice(itemPos, 1);
    this.setState({
      globalOrder: tempOrder,
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

  handleMyStoreClick(){ //used to show reg modal when no
    this.setState({showRegisterModal: true});
    console.log('setState in app')
  }

  handleUnmountRegisterModal(){
    this.setState({showRegisterModal: false});
  }

  handleBackClick() {
    this.setState({
      showStore: false,
      currentStoreName: 'Welcome to QuickerCater',
    });
  }
        // muiTheme={getMuiTheme(darkBaseTheme)}>

  render() {
    // console.log(this.state.owners);
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <Navigation
              title={this.state.currentStoreName}
              inStore={this.state.showStore}
              goBack={e => this.handleBackClick(e)}
              viewCart={e => this.viewCart(e)}
              showMyStore={this.state.myStore !== null}
              myStore={this.state.myStore}
              goToMyStore={this.selectStore.bind(this)}
              openRegisterModal={this.handleMyStoreClick.bind(this)}
              loggedIn={!!this.state.currentOwnerId}
            />
            {this.state.showRegisterModal
              ? <RegisterModal
                  handleUnmountRegisterModal={this.handleUnmountRegisterModal.bind(this)}
                  ownerId={this.state.currentOwnerId} />
              : null
            }
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
                title={this.state.currentStoreName}
                ownerId={this.state.currentOwnerId}
                store={this.state.currentStore}
                addItemToOrder={e => this.handleAddItemToOrder(e)}
                updateTotalPrice={this.updateTotalPrice}
                showDashboard={this.state.myStore._id == this.state.currentStore.id}
              />
              : <Lobby stores={this.state.stores} selectStore={(id, name) => this.selectStore(id, name)} />
            }
          </div>
        </MuiThemeProvider>
        <MuiThemeProvider>
          <div style={{ textAlign: 'center' }}>
            <Badge
              badgeContent="&copy;QuickerCater"
              badgeStyle={{ fontSize: 12, background: 0 }}
            />
          </div>
        </MuiThemeProvider>
      </div>
  );
  }
}

