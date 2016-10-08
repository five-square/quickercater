import React, { Component } from 'react';
import Card from 'material-ui/Card';
import CardTitle from 'material-ui/Card/CardTitle';
import CardText from 'material-ui/Card/CardText';

import ItemCard from './ItemCard';

import Menu from '../models/menuAPI';

export default class MenuCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hover: 2,
      items: [],
      updatedItemOnOrder: this.props.updatedItemOnOrder,
    };
    this.onMouseEnter = e => this.handleOnMouseEnter(e);
    this.onMouseLeave = e => this.handleOnMouseLeave(e);
    this.removeItem = e => this.handleRemoveItem(e);
    this.editItem = e => this.handleEditItem(e);
    this.addNewItem = e => this.handleAddNewItem(e);
    this.addExistingItem = e => this.handleAddExistingItem(e);
  }

  componentWillMount() {
    Menu.getItems(this.props.menu.id)
    .then(items => {
      this.setState({
        items,
      });
    });
  }

  handleOnMouseEnter() {
    this.setState({
      hover: 5,
    });
  }

  handleOnMouseLeave() {
    this.setState({
      hover: 2,
    });
  }

  handleAddItemToOrder(itemObj) {
    this.props.addItemToOrder(itemObj);
  }

  render() {
    return (
      <div style={this.props.style}>
        <Card
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          containerStyle={{ borderRadius: 20 }}
          style={{ borderRadius: 20 }}
          zDepth={this.state.hover}
        >
          <CardTitle
            title={this.props.menu.name}
            subtitle={this.props.menu.description}
            titleStyle={{ fontSize: 30 }}
            actAsExpander
            showExpandableButton={false}
          />
          <CardText expandable={false}>
            {this.state.items.map((item, index) => {
              let pic = item.item.picture;
              if (item.item.picture.length < 5 || item.item.picture === false) {
                pic = 'https://ssl.gstatic.com/images/branding/product/1x/avatar_circle_blue_512dp.png';
              }
              return (<ItemCard
                key={index}
                editing={this.props.editing}
                item={item.item}
                picture={pic}
                addItemToOrder={this.props.addItemToOrder}
                updateTotalPrice={this.props.updateTotalPrice}
                ownerId={this.props.ownerId}
                removeItem={this.removeItem}
                editItem={this.editItem}
                packages={this.props.packages}
              />);
            })}
          </CardText>
        </Card>
        <br />
      </div>
    );
  }
}
        // </Paper>
