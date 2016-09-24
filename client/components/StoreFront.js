import React, { Component } from 'react';
import MenuCard from './MenuCard';
import AddMenuCard from './AddMenuCard';

import Cart from './Cart';
import CateringOptions from './CateringOptions';
import CompanyDescription from './CompanyDescription';

import Menu from '../models/menuAPI';
import Server from '../models/serverAPI';

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
        {this.state.ownerId === 903
          ? <div>
            <CompanyDescription style={style} />
            <CateringOptions />
          </div>
          : null }
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
