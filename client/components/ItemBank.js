import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import Card from 'material-ui/Card';
import CardHeader from 'material-ui/Card/CardHeader';
// import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import BankItemList from './BankItemList';
import Item from '../models/itemAPI';
// import BankItemCard from './BankItemCard';


export default class ItemBank extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: this.props.open,
      // items: [],
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

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    console.log('in ItemBank: ', this.state.items);
    // action buttons for Modal
    const actions = [
      <FlatButton
        label="Close"
        primary
        onTouchTap={e => this.handleClose(e)}
      />,
    ];
    // This is the actual modal
    return (
      <div>
        <RaisedButton
          label="Item Bank"
          primary
          style={{ margin: 10 }}
          onClick={e => this.handleOpen(e)}
        />
        <Dialog
          title="My Items"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={(e) => this.handleClose(e)}
        >
          {this.props.items.length
            ? <BankItemList
              items={this.props.items}
              editing={this.props.editing}
            />
            // this.props.items.map((item, index) =>
            //   <BankItemCard
            //     key={index}
            //     editing={this.props.editing}
            //     item={item}
            //     // addItemToOrder={this.props.addItemToOrder}
            //     // updateTotalPrice={this.props.updateTotalPrice}
            //     // ownerId={this.props.ownerId}
            //     // removeItem={e => this.handleRemoveItem(e)}
            //   />
            // )
            : <Card>
              <CardHeader
                title="No unassigned menu items!"
                subtitle="Go to your menu to add new items"
              />
            </Card>
          }
        </Dialog>
      </div>
    );
  }
}
