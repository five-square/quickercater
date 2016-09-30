import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import OrderAPI from '../models/orderAPI';
import Customer from '../models/CustomerAPI';


export default class OrderCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      newOrder: {},
      submitted: false,
      requestDate: '',
      ownerId: this.props.ownerId,
    };
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleRemoveOrder() {
    this.props.deleteOrderAfterSubmission(this.props.ownerId);
  }

  handleSubmit() {
    // this.setState({ open: false });
    const customerInfo = {
      name: this.refs.customerName.getValue(),
      phone: this.refs.customerPhone.getValue(),
      email: this.refs.customerEmail.getValue(),
      auth_key: true,
    };
    const orderInfo = {
      order: {
        name: this.refs.ordername.getValue(),
        created_on: new Date(), // populate this in Neo4J query??
        request_date: this.state.requestDate,
        fulfilled: false,
        total_price: this.props.orderInfo.totalPrice,
        address: this.refs.orderAddress.getValue(),
      },
      items: this.props.orderInfo.order
        .map(itemInfo => ({ itemId: itemInfo.item.id, quantity: itemInfo.quantity })),
      ownerId: this.props.orderInfo.order[0].ownerId,
      customerId: '',
      package: { id: this.props.ownerId, expires: '10/10/2016' },
    };
    Customer.create(customerInfo)
      .then(customer => {
        orderInfo.customerId = customer._id;
        OrderAPI.create(orderInfo)
          .then(orderDb => {
            this.setState({ newOrder: orderDb.order._id, submitted: true });
            // this.props.deleteOrderAfterSubmission(this.props.orderInfo.order[0].ownerId);
          });
      });
  }
  handleCancel() {
    this.setState({ open: false });
  }

  handleRequestDate(event, date) {
    // this.state.requestDate = date;
    this.setState({
      requestDate: date,
    });
  }

  render() {
    // action buttons for Modal
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={e => this.handleCancel(e)}
      />,
      <FlatButton
        label="Submit"
        primary
        keyboardFocused
        onTouchTap={e => this.handleSubmit(e)}
      />,
    ];
    // This is the actual modal
    return (
      <div>
        { this.state.submitted === false
          ? <div>
            <RaisedButton
              primary label="Submit"
              onTouchTap={e => this.handleOpen(e)}
            />
            <RaisedButton
              primary label="Cancel"
              onTouchTap={e => this.handleRemoveOrder(e)}
            />
            <Dialog
              title="Please enter your information"
              actions={actions}
              modal={false}
              open={this.state.open}
              onRequestClose={(e) => this.handleClose(e)}
            >
              <TextField
                ref="customerName"
                hintText="Your name"
                floatingLabelText="Your name"
                floatingLabelFixed
              />
              <br />
              <TextField
                ref="customerEmail"
                hintText="Email"
                floatingLabelText="Email"
                floatingLabelFixed
              />
              <br />
              <TextField
                ref="customerPhone"
                hintText="Phone"
                floatingLabelText="Phone"
                floatingLabelFixed
              />
              <br />
              <TextField
                ref="ordername"
                hintText="Order name"
                floatingLabelText="Order name"
                floatingLabelFixed
              />
              <br />
              Request Date
              <DatePicker
                hintText="Date Picker"
                onChange={this.handleRequestDate}
              />
              <br />
              <TextField
                ref="orderAddress"
                hintText="Order address"
                floatingLabelText="Address"
                type="text"
              />
              <h4>{`Price: ${this.props.orderInfo.totalPrice}`}</h4>
            </Dialog>
          </div>
        : <div> Order Submitted - # {this.state.newOrder} </div>}
      </div>);
  }
}
