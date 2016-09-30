import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn }
  from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Card from 'material-ui/Card';
import CardText from 'material-ui/Card/CardText';
import AlertOrderReject from './AlertOrderReject';
import OrderAPI from '../models/orderAPI';

export default class OrderDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: 2,
      open: this.props.showMe,
      rejectAlert: false,
      items: this.props.orderInfo.items,
      order: this.props.orderInfo.order,
      customer: this.props.orderInfo.customer,
      removedItems: [],
    };
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleCancel() {
    this.setState({ open: false });
    this.props.handleModalCancel();
  }

  handleClose() {
    console.log('clickaway');
  }

  handleAccept() {
    this.props.handleOrderAccept(this.state.order.id);
    this.setState({ open: false });
  }

  showRejectAlert() {
    this.setState({ rejectAlert: true });
    // this.props.handleOrderReject(this.props.orderInfo.order.id);
  }

  handleReject(orderId) {
    this.setState({ open: false });
    this.props.handleOrderReject(orderId);
    this.setState({ rejectAlert: false });
  }

  handleQuantityChange(e) {
    const tempItems = this.state.items.slice();
    const itemId = parseInt(e.currentTarget.id, 10);
    const tempOrder = Object.assign({}, this.state.order);
    const itemPos = tempItems.map(item => item.id).indexOf(itemId);
    if (e.currentTarget.value < 0) {
      tempItems[itemPos].quantity = 0;
    } else {
      tempItems[itemPos].quantity = e.currentTarget.value;
    }
    tempItems[itemPos].total =
      tempItems[itemPos].quantity * tempItems[itemPos].price;
    tempItems[itemPos].total =
      Math.round((tempItems[itemPos].total + 0.00001) * 100) / 100;
    tempOrder.total_price = tempItems
      .reduce((a, b) => a + parseInt(b.total, 10), 0);
    this.setState({ items: tempItems, order: tempOrder });
  }

  handleRemoveItem(e, itemId) {
    const tempItems = this.state.items.slice();
    const tempOrder = Object.assign({}, this.state.order);
    const itemPos = tempItems.map(item => item.id).indexOf(itemId);
    if (tempOrder.total_price > 0) {
      tempOrder.total_price -= (tempItems[itemPos].price * tempItems[itemPos].quantity);
    }
    tempItems.splice(itemPos, 1);
    this.state.removedItems.push(itemId);
    this.setState({ items: tempItems, order: tempOrder });
  }

  handleSubmit() {
    if (this.props.customerView) {
      this.props.handleOrderAccept();
      this.setState({ open: false });
    } else {
      OrderAPI.updateOrder(this.state.order, this.state.items, this.state.removedItems)
        .then(resp => console.log('handleSubmit resp: ', resp));
      this.setState({ open: false });
      this.props.handleModalCancel();
    }
  }

  handleOnMouseEnter() {
    this.setState({ hover: 5 });
  }

  handleOnMouseLeave() {
    this.setState({ hover: 2 });
  }

  render() {
    console.log(this.props.editable);
    const actions = [
      <FlatButton
        label="Accept"
        primary
        keyboardFocused
        onTouchTap={e => this.handleAccept(e)}
      />,
      <FlatButton
        label="Reject"
        primary
        onTouchTap={e => this.showRejectAlert(e)}
      />,
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={e => this.handleCancel(e)}
      />,
    ];
    const actionsEditable = [
      <FlatButton
        label="Submit"
        primary
        keyboardFocused
        onTouchTap={e => this.handleSubmit(e)}
      />,
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={e => this.handleCancel(e)}
      />,
    ];
    return (
      <div>
        {
          this.state.rejectAlert
          ? <AlertOrderReject
            showMe={this.state.rejectAlert}
            orderId={this.state.order.id}
            handleReject={e => this.handleReject(e)}
          />
          : null
        }
        <Dialog
          autoScrollBodyContent
          title={this.props.customerView ? 'Review Order' : `Order # ${this.state.order.id}`}
          actions={this.props.editable || this.props.customerView ? actionsEditable : actions}
          modal={false}
          open={this.state.open}
          onRequestClose={(e) => this.handleClose(e)}
        >
          <Card>
            <CardText>
              {this.props.customerView
                ? <h3>Your Information: </h3>
                : <h3>Customer Information: </h3>
              }
              <h4>Name: {this.state.customer.name}</h4>
              <h4>Email: {this.state.customer.email} </h4>
              <h4>Phone: {this.state.customer.phone}</h4>
              <h4>Address: {this.state.order.address}</h4>
              <h4>Request Date: {this.state.order.request_date}</h4>
            </CardText>
          </Card>
          <div className="OrderTable">
            <Table>
              <TableHeader
                adjustForCheckbox={false}
                displaySelectAll={false}
              >
                <TableRow>
                  <TableHeaderColumn>Item Id</TableHeaderColumn>
                  <TableHeaderColumn>Name</TableHeaderColumn>
                  <TableHeaderColumn>Quantity</TableHeaderColumn>
                  <TableHeaderColumn>Price</TableHeaderColumn>
                  <TableHeaderColumn>Total</TableHeaderColumn>
                  {this.props.editable
                    ? <TableHeaderColumn>''</TableHeaderColumn>
                    : null
                  }
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                {this.state.items.map(item =>
                  <TableRow selectable={false} key={item.id}>
                    <TableRowColumn>{item.id}</TableRowColumn>
                    <TableRowColumn>{item.name}</TableRowColumn>
                    <TableRowColumn>
                      {this.props.editable
                        ? <TextField
                          ref="quantity"
                          id={item.id.toString()}
                          type="number"
                          style={{ width: 50 }}
                          value={item.quantity}
                          onChange={e => this.handleQuantityChange(e)}
                          floatingLabelFixed
                        />
                      : item.quantity
                      }

                    </TableRowColumn>
                    <TableRowColumn>${item.price}</TableRowColumn>
                    <TableRowColumn>${item.total}</TableRowColumn>
                    {this.props.editable
                      ? <TableRowColumn>
                        <FlatButton
                          label="Remove"
                          secondary
                          onTouchTap={e => this.handleRemoveItem(e, item.id)}
                        />
                      </TableRowColumn>
                      : null
                    }

                  </TableRow>
                  )}
              </TableBody>
            </Table>
            <h4>Total Price ${this.state.order.total_price}</h4>
          </div>
        </Dialog>
      </div>
  );
  }
}
