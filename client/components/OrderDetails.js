import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn }
  from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import AlertOrderReject from './AlertOrderReject';

import OrderAPI from '../models/orderAPI';
import Customer from '../models/customerAPI';
import Email from '../models/emailHtml';
import Taxes from '../config/Taxes';


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
      package: this.props.orderInfo.package,
      removedItems: [],
      orderUpdated: false,
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
    this.setState({ open: false });
  }

  handleAccept() {
    this.props.handleOrderAccept(this.state.order.id);
    this.setState({ open: false });
  }

  handleFulfilled() {
    this.props.handleOrderFulfilled(this.state.order.id);
    this.setState({ open: false });
  }

  showRejectAlert() {
    this.setState({ rejectAlert: true });
    // this.props.handleOrderReject(this.props.orderInfo.order.id);
  }

  handleRejectNo() {
    this.setState({ rejectAlert: false });
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
      Number(tempItems[itemPos].quantity * tempItems[itemPos].price).toFixed(2);

    const totalPrice = tempItems.reduce((a, b) => a + parseFloat(b.total), 0);

    tempOrder.taxes = (totalPrice * Taxes.texas.sales).toFixed(2);

    let packCost = 0;
    if (this.state.package) {
      packCost = this.state.package.cost;
    }

    tempOrder.total_price = (packCost + parseFloat(tempOrder.taxes) +
          tempItems.reduce((a, b) => a + parseFloat(b.total), 0)).toFixed(2);

    this.setState({ items: tempItems, order: tempOrder, orderUpdated: true });
  }

  handleRemoveItem(e, itemId) {
    const tempItems = this.state.items.slice();
    const tempOrder = Object.assign({}, this.state.order);
    const itemPos = tempItems.map(item => item.id).indexOf(itemId);
    if (parseFloat(tempOrder.total_price) > 0) {
      tempOrder.taxes = ((parseFloat(tempOrder.taxes) - (tempItems[itemPos].price *
                        tempItems[itemPos].quantity * (Taxes.texas.sales))).toFixed(2));
      tempOrder.total_price = (parseFloat(tempOrder.total_price) - (tempItems[itemPos].price *
                      tempItems[itemPos].quantity * (1 + Taxes.texas.sales))).toFixed(2);
    }
    tempItems.splice(itemPos, 1);
    this.state.removedItems.push(itemId);
    this.setState({ items: tempItems, order: tempOrder, orderUpdated: true });
  }

  handleSubmit() {
    if (this.props.orderState === 'customerView') {
      this.props.handleOrderAccept();
      this.setState({ open: false });
    } else {
      OrderAPI.updateOrder(this.state.order, this.state.items, this.state.removedItems)
        .then(orderInfo => {
          // fetch the updated order information from database to email the customer
          OrderAPI.fetchOrderDetails(orderInfo[0][0].order._id)
            .then(order => {
              const mailOptions = {
                from: 'fivesquare43@gmail.com',
                to: `${this.state.customer.email}`,
                subject: 'Hello from QuickerCater',
                generateTextFromHTML: true,
                html: Email.compose(order, this.props.storeName, 'updated'),
              };
              Customer.sendEmail(mailOptions, this.props.ownerId);
            });
          this.setState({ open: false });
          this.props.handleModalCancel();
        });
    }
  }

  handleOnMouseEnter() {
    this.setState({ hover: 5 });
  }

  handleOnMouseLeave() {
    this.setState({ hover: 2 });
  }

  buttonsToRender() {
    const pendingActions = [
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
        label="Update"
        primary
        keyboardFocused
        onTouchTap={e => this.handleSubmit(e)}
      />,
      <FlatButton
        label="Fulfilled"
        primary
        onTouchTap={e => this.handleFulfilled(e)}
      />,
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={e => this.handleCancel(e)}
      />,
    ];
    const actionsCustomer = [
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
    const actionsFulfilled = [
      <FlatButton
        label="Ok"
        primary
        onTouchTap={e => this.handleCancel(e)}
      />,
    ];
    const actionsEditableBasic = [
      <FlatButton
        label="Fulfilled"
        keyboardFocused
        primary
        onTouchTap={e => this.handleFulfilled(e)}
      />,
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={e => this.handleCancel(e)}
      />,
    ];

    if (this.props.orderState === 'customerView') {
      return actionsCustomer;
    } else if (this.props.orderState === 'accepted') {
      if (this.state.orderUpdated) {
        return actionsEditable;
      }
      return actionsEditableBasic;
    } else if (this.props.orderState === 'pending') {
      return pendingActions;
    }
    return actionsFulfilled;
  }

  render() {
    return (
      <div>
        {
          this.state.rejectAlert
          ? <AlertOrderReject
            showMe
            orderId={this.state.order.id}
            handleReject={e => this.handleReject(e)}
            handleRejectNo={e => this.handleRejectNo(e)}
          />
          : null
        }
        <Dialog
          autoScrollBodyContent
          title={this.props.orderState === 'customerView'
            ? 'Review Order:'
            : `Order # ${this.state.order.id}:`}
          actions={this.buttonsToRender()}
          modal={false}
          open={this.state.open}
          onRequestClose={(e) => this.handleClose(e)}
        >
          <div className="orderDetailsCard">
            <div className="orderDetailsContainer">
              <div className="orderDetailsCstmInfo">
                {this.props.orderState === 'customerView'
                  ? <h4><b>Your Information:</b></h4>
                  : <h4><b>Customer Information:</b></h4>
                }
                <div className="orderDetailsInfotext">
                  <p>Name: {this.state.customer.name}</p>
                  <p>Email: {this.state.customer.email} </p>
                  <p>Phone: {this.state.customer.phone}</p>
                  <p>Address: {this.state.order.address}</p>
                </div>
              </div>
              <div className="orderDetailsEvtInfo">
                <h4><b>Event Information:</b></h4>
                <div className="orderDetailsInfotext">
                  <p>Request Date: {this.state.order.request_date}</p>
                  <p>Start time: {this.state.order.start_time}</p>
                  <p>End time: {this.state.order.end_time}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="OrderTable">
            <div className="orderDetailsTable">
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
                    {this.props.orderType === 'accepted'
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
                        {this.props.orderState === 'accepted'
                          ? <TextField
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
                      {this.props.orderState === 'accepted'
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
            </div>
            <div className="orderDetailsTotalCost">
              {this.state.package && this.state.package.id > 0
                ? <h5>{this.state.package.name}: ${this.state.package.cost}</h5>
                : null
              }
              <h5>Taxes: ${this.state.order.taxes}</h5>
              <h4>Total Price: ${this.state.order.total_price}</h4>
            </div>
          </div>
        </Dialog>
      </div>
  );
  }
}
