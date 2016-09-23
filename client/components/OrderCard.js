import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Order from '../models/createOrderAPI';
import Customer from '../models/CustomerAPI';

export default class OrderCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      newOrder: {},
    };
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleSubmit() {
    this.setState({ open: false });
    const customerInfo = {
      name: this.refs.customerName.getValue(),
      phone: this.refs.customerPhone.getValue(),
      email: this.refs.customerEmail.getValue(),
      auth_key: true,
    };
    const orderInfo = {
      order: {
        name: this.refs.orderName.getValue(),
        created_on: new Date(), // populate this in Neo4J query??
        request_date: this.refs.requestDate.getValue(),
        fulfilled: false,
        total_price: this.props.price,
        address: this.refs.orderAddress.getValue(),
      },
      items: this.props.items,
      ownerId: this.props.ownerId,
      customerId: '',
      package: { id: this.props.ownerId, expires: '10/10/2016' },
    };
    Customer.create(customerInfo)
      .then(customer => {
        orderInfo.customerId = customer._id;
        Order.create(orderInfo)
          .then(order => this.setState({ newOrder: order }));
      });
  }
  handleCancel() {
    this.setState({ open: false });
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
        <div>
          <RaisedButton primary label="Submit" onTouchTap={e => this.handleOpen(e)} />
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
            <TextField
              ref="requestDate"
              hintText="Request date"
              floatingLabelText="Request date"
              floatingLabelFixed
            />
            <br />
            <TextField
              ref="orderAddress"
              hintText="Order address"
              floatingLabelText="Address"
              type="password"
            />
            <h4>{`Price: ${this.props.price}`}</h4>
          </Dialog>
        </div>
      </div>
    );
  }
}

