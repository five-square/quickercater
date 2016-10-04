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
import Customer from '../models/CustomerAPI';
import Email from './emailHtml';

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
    console.log('clickaway');
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
      tempItems[itemPos].quantity * tempItems[itemPos].price;
    tempItems[itemPos].total =
      Math.round((tempItems[itemPos].total + 0.00001) * 100) / 100;
    tempOrder.total_price = tempItems
      .reduce((a, b) => a + parseInt(b.total, 10), 0);
    this.setState({ items: tempItems, order: tempOrder, orderUpdated: true });
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
              console.log(order);
              const mailOptions = {
                from: 'fivesquare43@gmail.com',
                to: `${this.state.customer.email}`,
                subject: 'Hello from QuickerCater',
                generateTextFromHTML: true,
                html: Email.compose(order, this.props.storeName, 'updated'),
              };
              Customer.sendEmail(mailOptions)
                .then(response => {
                  console.log('response after confirmation email sent: ', response);
                });
            });
        });
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

  buttonsToRender() {
    console.log('orderDetails this.props.orderState: ', this.props.orderState);
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
            showMe={true}
            orderId={this.state.order.id}
            handleReject={e => this.handleReject(e)}
            handleRejectNo={e => this.handleRejectNo(e)}
          />
          : null
        }
        <Dialog
          autoScrollBodyContent
          title={this.props.orderState === 'customerView'
            ? 'Review Order'
            : `Order # ${this.state.order.id}`}
          actions={this.buttonsToRender()}
          modal={false}
          open={this.state.open}
          onRequestClose={(e) => this.handleClose(e)}
        >
          <Card>
            <CardText>
              {this.props.orderState === 'customerView'
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
            {this.props.orderState === 'customerView'
              ? <h4>{this.state.package.name}: ${this.state.package.cost}</h4>
              : null}
            <h4>Total Price ${this.state.order.total_price}</h4>
          </div>
        </Dialog>
      </div>
  );
  }
}
