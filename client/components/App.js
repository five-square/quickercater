import React, { Component } from 'react';
// import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Lobby from './Lobby';
import StoreFront from './StoreFront';
import Server from '../models/serverAPI';
import Navigation from './Navigation';
import Cart from './Cart';
import Badge from 'material-ui/Badge';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      owners: [],
      currentOwnerId: false,
      currentStoreName: 'Welcome to QuickerCater',
      showStore: false,
      order: [],
      openCart: false,
      totalPrice : 0,
    };
  }

  componentWillMount() {
    Server.getAllOwners()
    .then(owners => {
      this.setState({ owners });
    });
  }

  selectStore(storeId, storeName) {
    Server.getOwnerByStoreId(storeId)
    .then(owner => {
      this.setState({
        currentOwnerId: owner.id,
        currentStoreName: `Welcome to ${storeName}`,
        showStore: true,
      });
    });
  }

  updateTotalPrice(sum) {
    this.setState({ totalPrice: this.state.totalPrice + sum });
  }
  handleAddItemToOrder(itemObj) {
    const items = this.state.order;
    console.log('itemObj in App:', itemObj);
    items.push(itemObj);
    console.log('item added', itemObj);
    this.setState({
      order: items,
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
            />
            <div>
              <Cart
                open={this.state.openCart}
                order={this.state.order}
                viewCart={e => this.viewCart(e)}
                ownerId={this.state.currentOwnerId}
                totalPrice={this.state.updateTotalPrice}
              />
            </div>
            { this.state.showStore
              ? <StoreFront
                ownerId={this.state.currentOwnerId}
                addItemToOrder={e => this.handleAddItemToOrder(e)}
                updateTotalPrice={this.updateTotalPrice}
              />
              : <Lobby selectStore={(id, name) => this.selectStore(id, name)} />
            }
          </div>
        </MuiThemeProvider>
        <MuiThemeProvider>
          <div style={{ textAlign: 'center' }}>
            <Badge
              badgeContent="&copy;"
              badgeStyle={{ fontSize: 20 }}
            >
      QuickerCater
            </Badge>
          </div>
        </MuiThemeProvider>
      </div>
  );
  }
}

