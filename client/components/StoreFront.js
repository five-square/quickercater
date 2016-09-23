import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import MenuCard from './MenuCard';
import AddMenuCard from './AddMenuCard';

import Cart from './Cart';
import CateringOptions from './CateringOptions';
import CompanyDescription from './CompanyDescription';

import Menu from '../models/menuAPI';
import Server from '../models/serverAPI';

// import Cart from './Cart';

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
    console.log('in Storefront, adding menu: ', menuObj);
    const newMenu = Object.assign({}, menuObj, {
      order: this.state.menus.length + 1,
      ownerId: this.state.ownerId,
    });
    Menu.create(newMenu)
    .then(menu => {
      console.log('after server call: ', menu);
      Server.getMenusByOwner(this.state.ownerId)
      .then(menus => {
        console.log('after second server call: ', menus);
        this.setState({ menus });
      });
    });
  }

  // handleAddItemToOrder(itemObj) {
  //   const items = this.state.order;
  //   items.push(itemObj);
  //   console.log('item added', itemObj);
  //   this.openCart();
  //   this.setState({
  //     order: items,
  //   });
  // }
        // <div>
        //   {
        //     this.state.openCart
        //     ? <Cart
        //       open={this.state.openCart}
        //       order={this.state.order}
        //     />
        //     : null
        //   }
        // </div>
        // <Paper zDepth={1} style={Object.assign({}, style, { width: '60%', paddingTop: '2%' })}>
        // </Paper>

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
        <CateringOptions />
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
      </div>
  );
  }
}
