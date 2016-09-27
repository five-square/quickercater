import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import BankItemCard from './BankItemCard';
import Item from '../models/itemAPI';


export default class ItemBank extends Component {

  constructor(props) {
    super(props);
    this.state = {
      style: this.props.style,
      open: this.props.open,
      ownerId: this.props.ownerId,
      items: [],
    };
  }

  componentWillMount() {
    Item.getUnassignedItems(this.props.ownerId)
    .then(items => {
      this.setState({
        items,
      });
    });
  }

  getUnassignedItems() {
    Item.getUnassignedItems(this.props.ownerId)
    .then(items => {
      this.setState({
        items,
      });
    });
  }

  handleToggle() {
    this.props.viewItemBank();
  }

  render() {
    return (
      <div>
        <Drawer width={325} openSecondary open={this.props.open} >
          <Toolbar>
            <ToolbarGroup>
              <ToolbarTitle text="My Items" />
            </ToolbarGroup>
            <ToolbarGroup>
              <RaisedButton
                primary
                label="Close"
                onTouchTap={e => this.handleToggle(e)}
              />
            </ToolbarGroup>
          </Toolbar>
          <br />
          {this.state.items.map((item, index) =>
            <BankItemCard
              key={index}
              editing={this.props.editing}
              item={item}
              addItemToOrder={this.props.addItemToOrder}
              updateTotalPrice={this.props.updateTotalPrice}
              ownerId={this.props.ownerId}
              removeItem={e => this.handleRemoveItem(e)}
            />
          )}
        </Drawer>
      </div>
    );
  }
}
