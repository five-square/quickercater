import React, { Component } from 'react';
import MenuContainer from './MenuContainer';
import Cart from './Cart';
import PackageCard from './PackageCard';
import OrderAPI from '../models/orderAPI';
import Dashboard from './Dashboard';
import CompanyDescription from './StoreDescription';
import Server from '../models/serverAPI';
import Package from '../models/packageAPI';
import Owner from '../models/ownerAPI';
import AddPackageCard from './AddPackageCard';

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
    Package.getAllPackages(this.state.ownerId)
    .then(packages => {
      this.setState({ packages });
    });

    Server.getStoresByOwner(this.state.ownerId)
    .then(store => {
      console.log('storeplease: ', store);
      this.setState({ store });
    });
  }

  showMenus() {
    Owner.getMenus(this.state.ownerId)
    .then(menus => {
      this.setState({ menus });
    });
  }

  // handleAddMenu(menuObj) {
  //   const newMenu = Object.assign({}, menuObj, {
  //     order: this.state.menus.length,
  //     ownerId: this.state.ownerId,
  //   });
  //   Menu.create(newMenu)
  //   .then(() => {
  //     this.showMenus();
  //   });
  // }

  // handleDeleteMenu(menuId) {
  //   const newMenu = this.state.menus.filter(element => element.id !== menuId);
  //   console.log('new menu: ', newMenu);
  //   Menu.delete(menuId, this.state.ownerId)
  //   .then(menus => {
  //     console.log('after delete, in promise: ', menus);
  //     this.setState({ menus });
  //   });
  // }

  // showMenus() {
  //   // e.persist();
  //   // e.preventDefault();
  //   // this.hideMenus(e);
  //   Owner.getMenus(this.state.ownerId)
  //   .then(menus => {
  //     console.log('Menus: ', menus);
  //     this.setState({ menus });
  //   });
  // }

  // hideMenus(e) {
  //   e.persist();
  //   e.preventDefault();
  //   this.setState({
  //     menus: [],
  //   });
  // }

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
            <PackageCard
              style={style}
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
        <MenuContainer
          style={style}
          ownerId={this.state.ownerId}
          menus={this.state.menus}
          // addMenu={e => this.handleAddMenu(e)}
        />
      </div>
    );
  }
}
