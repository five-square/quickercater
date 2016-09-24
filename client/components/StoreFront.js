import React, { Component } from 'react';
// import Paper from 'material-ui/Paper';
import MenuCard from './MenuCard';
import AddMenuCard from './AddMenuCard';
import Cart from './Cart';
import CateringOptions from './PackageCard';
import Server from '../models/serverAPI';
<<<<<<< HEAD
import OrderAPI from '../models/orderAPI';
import Dashboard from './Dashboard';
import CompanyDescription from './CompanyDescription';
=======
import Dashboard from './Dashboard';
import CompanyDescription from './CompanyDescription';
// import Cart from './Cart';
>>>>>>> db4071b151f8b38ea156f5fc0ade8e5c82f35c78

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
<<<<<<< HEAD
  //   // OA.cAO needs to remove the -[rel:EDIT]->(owner) relationship
  //   // discuss this with team

  // }

  // fetchPendingOrders() {
  //   return OrderAPI.fetchPendingOrders(this.state.ownerId);
=======
  //   //.             -- OA.cAO needs to remove the -[rel:EDIT]->(owner) relationship
  //   //                -- discuss this with team
  // }

  // handleAddItemToOrder(itemObj) {
  //   const items = this.state.order;
  //   items.push(itemObj);
  //   console.log('item added', itemObj);
  //   this.openCart();
  //   this.setState({
  //     order: items,
  //   });
>>>>>>> db4071b151f8b38ea156f5fc0ade8e5c82f35c78
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
        <CompanyDescription />
        <Dashboard />
        <CateringOptions ownerId={this.state.ownerId} />
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
