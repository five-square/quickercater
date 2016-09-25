import React, { Component } from 'react';
import MenuCard from './MenuCard';
import AddMenuCard from './AddMenuCard';
import Menu from '../models/menuAPI';
import Owner from '../models/ownerAPI';

export default class MenuContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menus: [],
      style: this.props.style,
      ownerId: this.props.ownerId,
      menuToDelete: null,
    };
  }

  componentDidMount() {
    Owner.getMenus(this.state.ownerId)
    .then(menus => {
      this.setState({ menus });
    });
  }

  componentDidUpdate() {
    console.log('Menu ID to delete: ', this.state.menuToDelete);
    if (this.state.menuToDelete !== null) {
      this.state.menuToDelete = null;
    }
  }

  showMenus() {
    Owner.getMenus(this.state.ownerId)
    .then(menus => {
      console.log('Menus in showMenus: ', menus);
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
    Menu.delete(menuId, this.state.ownerId);
  }

  render() {
    console.log('in MenuContainer render(): ', this.state.menus);
    return (
      <div className="menu-container">
        { this.state.menus.map((menu, index) =>
          <MenuCard
            key={index}
            style={this.state.style}
            show
            menu={menu}
            addItemToOrder={this.props.addItemToOrder}
            updateTotalPrice={this.props.updateTotalPrice}
            deleteMenu={e => this.handleDeleteMenu(e)}
          />
          ).concat(
          <AddMenuCard
            key={this.state.menus.length + 1}
            addMenu={e => this.handleAddMenu(e)}
            style={this.state.style}
          />
        )}

      </div>
    );
  }
}
