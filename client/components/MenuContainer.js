import React, { Component } from 'react';
import MenuCard from './MenuCard';
import AddMenuCard from './AddMenuCard';
import Menu from '../models/menuAPI';
import Owner from '../models/ownerAPI';

import SortableListItem from './SortableListItem';
import MenuCardDraggable from './MenuCardDraggable';

export default class MenuContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menus: [],
      style: this.props.style,
      ownerId: this.props.ownerId,
      menuToDelete: null,
      updatedItemOnOrder: this.props.updatedItemOnOrder,
      draggingIndex: null,
    };
    this.deleteMenu = e => this.handleDeleteMenu(e);
    this.moveMenu = (d, e) => this.handleMoveMenu(d, e);
    this.editMenu = e => this.handleEditMenu(e);
    this.handleUpdateState = e => this.updateState(e);
    this.addMenu = e => this.handleAddMenu(e);
  }

  componentWillMount() {
    Owner.getMenus(this.state.ownerId)
    .then(menus => {
      this.setState({ menus });
    });
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      openItemBank: newProps.editing,
    });
  }

  updateState(obj) {
    this.setState(obj);
    if (obj.draggingIndex === null) {
      this.setState(obj, this.updateDatabase);
    }
  }

  updateDatabase() {
    Menu.updateOrder(this.state.menus)
    .then(menus => {
      console.log('in MenuContainer updateDatabase: ', menus);
      this.setState({ menus });
    });
  }

  showMenus() {
    Owner.getMenus(this.state.ownerId)
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
    Menu.delete(menuId, this.state.ownerId)
    .then(() => {
      this.showMenus();
    });
  }

  handleEditMenu(menuObj) {
    Menu.edit(menuObj, this.state.ownerId)
    .then(() => {
      this.showMenus();
    });
  }

  viewItemBank() {
    this.setState({
      openItemBank: false,
    });
  }

  render() {
    const menuCardsDraggable = this.state.menus.length
      ? this.state.menus.map((menu, index) =>
        <MenuCardDraggable
          key={index}
          style={this.state.style}
          editing={this.props.editing}
          menu={menu}
          addItemToOrder={this.props.addItemToOrder}
          updateTotalPrice={this.props.updateTotalPrice}
          deleteMenu={this.deleteMenu}
          moveMenu={this.moveMenu}
          editMenu={this.editMenu}
          ownerId={this.props.ownerId}
        />
      )
      : [];

    const menuCards = this.state.menus.length
      ? this.state.menus.map((menu, index) =>
        <MenuCard
          key={index}
          style={this.state.style}
          editing={this.props.editing}
          menu={menu}
          addItemToOrder={this.props.addItemToOrder}
          updateTotalPrice={this.props.updateTotalPrice}
          deleteMenu={this.deleteMenu}
          moveMenu={this.moveMenu}
          editMenu={this.editMenu}
          ownerId={this.props.ownerId}
        />
      )
      : [];

    return (
      <div className="menu-container">
        <div className="list">
          {this.props.editing
            ? menuCardsDraggable.map((menuCardDraggable, index) => (
              <SortableListItem
                key={index}
                updateState={this.handleUpdateState}
                draggingIndex={this.state.draggingIndex}
                items={this.state.menus}
                sortId={index}
                outline="list"
              >{menuCardDraggable}</SortableListItem>
              )
            )
            : menuCards
          }
        </div>
        {this.props.editing
          ? <AddMenuCard
            key={this.state.menus.length + 1}
            addMenu={this.addMenu}
            style={this.state.style}
          />
          : null
        }
      </div>
    );
  }
}
