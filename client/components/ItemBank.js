import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import Card from 'material-ui/Card';
import CardHeader from 'material-ui/Card/CardHeader';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import BankItemList from './BankItemList';

export default class ItemBank extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: this.props.open,
    };
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    // console.log('in ItemBank: items: ', this.props.items, ', menus: ', this.props.menus);
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
          {this.props.items.length && this.props.menus.length
            ? <BankItemList
              items={this.props.items}
              menus={this.props.menus}
              editing={this.props.editing}
              editItemInBank={this.props.editItemInBank}
              deleteItemInBank={this.props.deleteItemInBank}
              addItemToMenu={this.props.addItemToMenu}
            />
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
