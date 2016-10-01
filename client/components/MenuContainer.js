import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';

import MenuCard from './MenuCard';
import AddMenuCard from './AddMenuCard';
import Menu from '../models/menuAPI';
import Owner from '../models/ownerAPI';
import Item from '../models/itemAPI';

import SortableListItem from './SortableListItem';
import MenuCardDraggable from './MenuCardDraggable';

export default class MenuContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menus: [],
      itemBank: [],
      style: this.props.style,
      ownerId: this.props.ownerId,
      menuToDelete: null,
      updatedItemOnOrder: this.props.updatedItemOnOrder,
      draggingIndex: null,
    };
    this.deleteMenu = (e, i) => this.handleDeleteMenu(e, i);
    this.moveMenu = (d, e) => this.handleMoveMenu(d, e);
    this.editMenu = e => this.handleEditMenu(e);
    this.handleUpdateState = e => this.updateState(e);
    this.addMenu = e => this.handleAddMenu(e);

    this.menuCards = [];
    this.menuCardsDraggable = [];
  }

  componentWillMount() {
    Owner.getMenus(this.props.ownerId)
    .then(menus => {
      Item.getUnassignedItems(this.props.ownerId)
      .then(items => {
        this.setState({ menus, itemBank: items });
      });
    });
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      openItemBank: newProps.editing,
    });
  }

  getDraggableMenus() {
    this.menuCardsDraggable = this.state.menus.length
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
  }

  getStaticMenus() {
    this.menuCards = this.state.menus.length
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
    Owner.getMenus(this.props.ownerId)
    .then(menus => {
      this.setState({ menus });
    });
  }

  handleAddMenu(menuObj) {
    const newMenu = Object.assign({}, menuObj, {
      order: this.state.menus.length,
      ownerId: this.props.ownerId,
    });
    Menu.create(newMenu)
    .then(() => {
      this.showMenus();
    });
  }

  handleDeleteMenu(menuId, hasItems) {
    if (hasItems !== 0) {
      Menu.deleteWithItems(menuId, this.props.ownerId)
      .then(menus => {
        this.setState({ menus });
      });
    } else {
      Menu.deleteEmptyMenu(menuId, this.props.ownerId)
      .then(menus => {
        this.setState({ menus });
      });
    }
  }

  handleEditMenu(menuObj) {
    Menu.edit(menuObj, this.props.ownerId)
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
    const style = {
      paper: {
        width: '64%',
        flex: '50%',
        marginLeft: 'auto',
        marginRight: 'auto',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      },
      toolbar: {
        width: '100%',
        flex: '50%',
        marginLeft: 'auto',
        marginRight: 'auto',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      },
    };
    // const menuCardsDraggable = this.state.menus.length
    //   ? this.state.menus.map((menu, index) =>
    //     <MenuCardDraggable
    //       key={index}
    //       style={this.state.style}
    //       editing={this.props.editing}
    //       menu={menu}
    //       addItemToOrder={this.props.addItemToOrder}
    //       updateTotalPrice={this.props.updateTotalPrice}
    //       deleteMenu={this.deleteMenu}
    //       moveMenu={this.moveMenu}
    //       editMenu={this.editMenu}
    //       ownerId={this.props.ownerId}
    //     />
    //   )
    //   : [];
    this.getDraggableMenus();
    this.getStaticMenus();

    // const menuCards = this.state.menus.length
    //   ? this.state.menus.map((menu, index) =>
    //     <MenuCard
    //       key={index}
    //       style={this.state.style}
    //       editing={this.props.editing}
    //       menu={menu}
    //       addItemToOrder={this.props.addItemToOrder}
    //       updateTotalPrice={this.props.updateTotalPrice}
    //       deleteMenu={this.deleteMenu}
    //       moveMenu={this.moveMenu}
    //       editMenu={this.editMenu}
    //       ownerId={this.props.ownerId}
    //     />
    //   )
    //   : [];

    return (
      <div className="menu-container">
        <Paper zDepth={2} style={style.paper}>
          <Toolbar style={style.toolbar}>
            <ToolbarGroup>
              <ToolbarTitle text={`${this.props.title}'s Menu`} />
            </ToolbarGroup>
          </Toolbar>
          <div className="list">
            {this.props.editing
              ? this.menuCardsDraggable.map((menuCardDraggable, index) => (
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
              : this.menuCards
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
        </Paper>
      </div>
    );
  }
}
