import React, { Component } from 'react';
<<<<<<< 51693c11530732adf3fc39024ba2432c9536d40c
=======
// import Paper from 'material-ui/Paper';
>>>>>>> Less lint. More Glint.
import MenuCard from './MenuCard';
import AddMenuCard from './AddMenuCard';

import Cart from './Cart';
import CateringOptions from './CateringOptions';
import CompanyDescription from './CompanyDescription';

import Menu from '../models/menuAPI';
import Server from '../models/serverAPI';
<<<<<<< 51693c11530732adf3fc39024ba2432c9536d40c
import OrderAPI from '../models/orderAPI';
=======
// import orderAPI from '../models/orderAPI';
>>>>>>> Less lint. More Glint.
import Dashboard from './Dashboard';

export default class StoreFront extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ownerId: this.props.ownerId,
      menus: [],
    };
  }

  componentWillMount() {
    Server.getMenusByOwner(this.state.ownerId)
    .then(menus => {
      console.log(menus);
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
      Server.getMenusByOwner(this.state.ownerId)
      .then(menus => {
        this.setState({ menus });
      });
    });
  }

  // fetchPendingOrders() {
  //   return OrderAPI.fetchPendingOrders(this.state.ownerId);
  // }

  // acceptPendingOrder(orderId) {
  //   // need to make call to OrderAPI to change pending order --> accepted
  //   // this means the (Order) -[rel:EDIT]->(owner)
  // }

  // completeAcceptedOrder(orderId) {
  //   // 1. Call OrderAPI.completeAcceptedOrder?
  //   // OA.cAO needs to remove the -[rel:EDIT]->(owner) relationship
  //   // discuss this with team

  // }

  // fetchPendingOrders() {
  //   return OrderAPI.fetchPendingOrders(this.state.ownerId);
  // }

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
<<<<<<< 51693c11530732adf3fc39024ba2432c9536d40c
        <CompanyDescription style={style} />
=======
        <CompanyDescription />
        <Dashboard />
>>>>>>> Less lint. More Glint.
        <CateringOptions />
        <Dashboard pendingOrders={this.fetchPendingOrders()} />
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
          />
          ).concat(
          <AddMenuCard
            key={this.state.menus.length + 1}
            addMenu={e => this.handleAddMenu(e)}
            style={style}
          />
          )}
        { this.state.menus.map((menu, index) =>
          <MenuCard
            key={index}
            style={style}
            menu={menu}
            addItemToOrder={this.props.addItemToOrder}
          />
        )}
      </div>
    );
  }
}
