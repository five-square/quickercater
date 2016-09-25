import React, { Component } from 'react';
import MenuCard from './MenuCard';
import AddMenuCard from './AddMenuCard';
import Cart from './Cart';
import CateringOptions from './PackageCard';
import Server from '../models/serverAPI';
import OrderAPI from '../models/orderAPI';
import Dashboard from './Dashboard';
import CompanyDescription from './StoreDescription';
import Menu from '../models/menuAPI';
import PackageAPI from '../models/packageAPI';
import AddPackageCard from './AddPackageCard'

export default class StoreFront extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ownerId: this.props.ownerId,
      menus: [],
      packages: [],
      store: [],
    };
  }

  componentWillMount() {
    Server.getMenusByOwner(this.state.ownerId)
    .then(menus => {
      console.log(menus);
      this.setState({ menus });
    });
    PackageAPI.getAllPackages(this.state.ownerId)
    .then(packages => {
      console.log('StoreFront packages', packages);
      this.setState({ packages });
    });

    Server.getStoresByOwner(this.state.ownerId)
    .then(store => {
      console.log('storeplease: ', store);
      this.setState({ store });
    });
  }

  showMenus() {
    Server.getMenusByOwner(this.state.ownerId)
    .then(menus => {
      this.setState({ menus });
    });
  }

  handleAddMenu(menuObj) {
    const newMenu = Object.assign({}, menuObj, {
      order: this.state.menus.length,
      ownerId: this.state.ownerId,
    });
    Menu.create(newMenu)
    .then(() => {
      this.showMenus();
    });
  }

  handleDeleteMenu(menuId) {
    Menu.delete(menuId)
    .then(() => {
      this.showMenus();
    });
  }

  fetchPendingOrders() {
    return OrderAPI.fetchPendingOrders(this.state.ownerId);
  }

  // acceptPendingOrder(orderId) {
  //   // need to make call to OrderAPI to change pending order --> accepted
  //   // this means the (Order) -[rel:EDIT]->(owner)
  // }

  // completeAcceptedOrder(orderId) {
  //   // 1. Call OrderAPI.completeAcceptedOrder?
  //   // OA.cAO needs to remove the -[rel:EDIT]->(owner) relationship
  //   // discuss this with team

  // }

  render() {
    const style = {
      width: '60%',
      flex: '50%',
      marginLeft: 'auto',
      marginRight: 'auto',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    };
    return (
      <div className="StoreFront" >
        <div className="CompanyDescription">
          { this.state.store.map((e, i) =>
            <CompanyDescription
              key={i}
              ownerId={this.state.ownerId}
              store={e.store}
            />
        )}
        </div>
        <Dashboard />
        <div className="CateringOptions">
          {this.state.packages.map((pack, index) =>
            <CateringOptions
              key={index}
              ownerId={this.state.ownerId}
              pack={pack}
            />
          ).concat(
          <AddPackageCard/>

          )}
        </div>
        <div>
          <h1>Edit Yo Menu</h1>
          {
            this.state.openCart
            ? <Cart
              open={this.state.openCart}
              order={this.state.order}
            />
            : null
          }
        </div>
        { this.state.menus.map((menu, index) =>
          <MenuCard
            key={index}
            style={style}
            menu={menu}
            addItemToOrder={this.props.addItemToOrder}
            updateTotalPrice={this.props.updateTotalPrice}
            deleteMenu={e => this.handleDeleteMenu(e)}
            ownerId={this.state.ownerId}
          />
          ).concat(
          <AddMenuCard
            key={this.state.menus.length + 1}
            addMenu={e => this.handleAddMenu(e)}
            style={style}
          />
        )}
      </div>
    );
  }
}
