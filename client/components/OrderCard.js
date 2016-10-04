import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import OrderAPI from '../models/orderAPI';
import Customer from '../models/CustomerAPI';
import OrderConfirmation from './OrderConfirmation';
import OrderDetails from './OrderDetails';
import Email from './emailHtml';

export default class OrderCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      newOrder: {},
      submitted: false,
      requestDate: '',
      ownerId: this.props.ownerId,
      orderInfo: {},
      customerInfo: {},
      reviewOrder: false,
      errorTextPhone: '',
    };
  }

  onChangePhone(event) {
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if (event.target.value.match(phoneRegex)) {
      this.setState({ errorTextPhone: '' });
    } else {
      this.setState({ errorTextPhone: 'Invalid format: ###-###-####' });
    }
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
      id: '',
      name: this.refs.customerName.getValue(),
      phone: this.refs.customerPhone.getValue(),
      email: this.refs.customerEmail.getValue(),
      auth_key: true,
    };
    const orderInfo = {
      order: {
        id: '',
        name: this.refs.ordername.getValue(),
        created_on: new Date(), // populate this in Neo4J query??
        request_date: this.state.requestDate,
        fulfilled: false,
        total_price: this.props.orderInfo.totalPrice,
        address: this.refs.orderAddress.getValue(),
      },
      items: this.props.orderInfo.order.map(itemInfo =>
        Object.assign({}, itemInfo.item,
          { quantity: itemInfo.quantity,
           total: itemInfo.item.price * parseInt(itemInfo.quantity, 10) })),
      ownerId: this.props.orderInfo.order[0].ownerId,
      customer: customerInfo,
      package: { id: this.props.orderInfo.selectedPkgId,
                  name: this.props.orderInfo.selectedPkgDesc,
                  cost: this.props.orderInfo.selectedPkgCost,
                  expires: '10/10/2016' },
    };
 // var result = { items: items, order: orderObj, customer: orderItemRel[0].customer.properties };
    this.state.customerInfo = customerInfo;
    this.state.orderInfo = orderInfo;
    this.setState({ reviewOrder: true });
  }

  handleOrderAccept() {
    Customer.create(this.state.customerInfo)
      .then(customer => {
        this.state.orderInfo.customer.id = customer._id;
        OrderAPI.create(this.state.orderInfo)
          .then(orderDb => {
            console.log('handleOrderAccept orderDb: ', orderDb);
            this.state.orderInfo.order.id = orderDb.order._id;
            this.setState({ newOrder: orderDb.order._id,
                            submitted: true });
            const mailOptions = {
              from: 'fivesquare43@gmail.com',
              to: `${this.state.customerInfo.email}`,
              subject: 'Hello from QuickerCater',
              generateTextFromHTML: true,
              html: Email.compose(this.state.orderInfo, this.props.storeName, 'pending'),
            };
            Customer.sendEmail(mailOptions)
              .then(response => {
                console.log('response after confirmation email sent: ', response);
              });
            // this.props.deleteOrderAfterSubmission(this.props.ownerId);
          });
      });
  }


  resetAfterConfirmation() {
    this.setState({ reviewOrder: false, open: false, submitted: false });
    this.props.deleteOrderAfterSubmission(this.props.ownerId);
  }

  handleCancel() {
    this.setState({ open: false });
  }

  handleRequestDate(event, date) {
    this.state.requestDate = JSON.stringify(date).slice(1, 11);
  }

  handleModalCancel() {
    this.setState({ reviewOrder: false, open: false });
  }

  renderComponent() {
    const style = {
      cancelBtn: {
        right: 30,
        bottom: 0,
        position: 'absolute',
      },
      card: {
        margin: 1,
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        position: 'relative',
      },
    };
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
    if (this.state.reviewOrder === false) {
      return (<div>
        <RaisedButton
          primary label="Submit"
          onTouchTap={e => this.handleOpen(e)}
        />
        <FlatButton
          primary label="Cancel"
          style={style.cancelBtn}
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
            errorText={this.state.errorTextPhone}
            onChange={e => this.onChangePhone(e)}
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
            ref="requestDate"
            hintText="Date Picker"
            onChange={(e, date) => this.handleRequestDate(e, date)}
          />
          <br />
          <TextField
            ref="orderAddress"
            hintText="Order address"
            floatingLabelText="Address"
            type="text"
          />
          <h4>{`Price: $${this.props.orderInfo.totalPrice}`}</h4>
        </Dialog>
      </div>);
    } else if (this.state.submitted) {
      return (<OrderConfirmation
        orderId={this.state.newOrder}
        storeName={this.props.storeName}
        showMe
        ownerId={this.props.ownerId}
        resetAfterConfirmation={e => this.resetAfterConfirmation(e)}
      />);
    }
    return (<OrderDetails
      showMe
      orderInfo={this.state.orderInfo}
      orderState={'customerView'}
      handleOrderAccept={e => this.handleOrderAccept(e)}
      handleOrderReject={e => this.handleOrderReject(e)}
      handleModalCancel={e => this.handleModalCancel(e)}
    />);
  }


  render() {
    const style = {
      cancelBtn: {
        right: 30,
        bottom: 0,
        position: 'absolute',
      },
      card: {
        margin: 1,
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        position: 'relative',
      },
    };
    return (
      <div style={style.card}>
        {this.renderComponent()}
      </div>);
  }
}
