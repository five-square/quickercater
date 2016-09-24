import React, { Component } from 'react';
// import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Lobby from './Lobby';
import StoreFront from './StoreFront';
import Server from '../models/serverAPI';
import Navigation from './Navigation';
import Cart from './Cart';

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

  handleAddItemToOrder(itemObj) {
    const items = this.state.order;
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
              />
            </div>
            { this.state.showStore
              ? <StoreFront
                ownerId={this.state.currentOwnerId}
                addItemToOrder={e => this.handleAddItemToOrder(e)}
              />
              : <Lobby selectStore={(id, name) => this.selectStore(id, name)} />
            }
          </div>
        </MuiThemeProvider>
      </div>
  );
  }
}

