import React, { Component } from 'react';

import MenuCard from './MenuCard';
import Cart from './Cart';

import Server from '../models/serverAPI';

export default class StoreFront extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ownerId: 1090,
      menus: [],
      order: [],
      openCart: false,
    };
  }

  componentWillMount() {
    Server.getMenusByOwner(this.state.ownerId)
    .then(menus => {
      console.log(menus);
      this.setState({ menus });
    });

    if (this.state.order.length) {
      this.setState({
        openCart: true,
      });
    }
  }

  componentWillUpdate() {
    console.log('firing');
    // if (this.state.order.length) {
    //   this.setState({
    //     openCart: true,
    //   });
    // }
  }

  handleAddItem(itemObj) {
    const items = this.state.order;
    items.push(itemObj);
    console.log('item added', itemObj);
    this.setState({
      order: items,
      openCart: true,
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
            addItem={element => this.handleAddItem(element)}
          />
        )}
      </div>
  );
  }
}
