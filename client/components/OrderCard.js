import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';

import OrderConfirmation from './OrderConfirmation';
import OrderDetails from './OrderDetails';

import OrderAPI from '../models/orderAPI';
import Customer from '../models/customerAPI';
import Email from '../models/emailHtml';
import Taxes from '../config/Taxes';

export default class OrderCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      newOrder: {},
      submitted: false,
      requestDate: {},
      eventStartTime: {},
      eventEndTime: {},
      ownerId: this.props.ownerId,
      orderInfo: {},
      customerInfo: {},
      reviewOrder: false,
      errorTextPhone: '',
      errorTextEmail: '',
      errorTextPhoneReq: '* Required',
      errorTextName: '* Required',
      errorTextEmailReq: '* Required',
      errorTextReqdate: '* Required',
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      eventAddress: '',
      orderName: '',
    };
  }

  onChangePhone(event) {
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    this.state.customerPhone = event.target.value;
    this.setState({ errorTextPhoneReq: '' });
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
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    const customerInfo = {
      id: '',
      name: this.state.customerName,
      phone: this.state.customerPhone,
      email: this.state.customerEmail,
      auth_key: true,
    };
    const taxes = Number(((parseFloat(this.props.orderInfo.totalPrice) -
                  this.props.orderInfo.selectedPkgCost) * Taxes.texas.sales).toFixed(2));
    const totalPrice = Number((parseFloat(this.props.orderInfo.totalPrice) + taxes).toFixed(2));
    const newline = '';
    const orderInfo = {
      order: {
        id: '',
        name: this.state.orderName,
        created_on: new Date(), // populate this in Neo4J query??
        request_date: this.state.requestDate.toDateString(),
        start_time: this.formatTime(this.state.eventStartTime),
        end_time: this.formatTime(this.state.eventEndTime),
        fulfilled: false,
        total_price: totalPrice,
        address: this.state.eventAddress,
        taxes,
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
            this.state.orderInfo.order.id = orderDb.order._id;
            this.setState({ newOrder: orderDb.order._id,
                            submitted: true });
            const mailOptions = {
              from: 'fivesquare43@gmail.com',
              to: `${this.state.customerInfo.email}`,
              subject: 'Hello from QuickerCater',
              generateTextFromHTML: true,
              html: Email.compose(this.state.orderInfo, this.props.store.name, 'pending'),
            };
            Customer.sendEmail(mailOptions, this.props.ownerId)
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

  handlecustomerName(e) {
    this.state.customerName = e.currentTarget.value;
    if (e.currentTarget.value) {
      this.setState({ errorTextName: '' });
    } else {
      this.setState({ errorTextName: '* Required' });
    }
  }

  handlecustomerEmail(e) {
    const emailRegex = /\S+@\S+\.\S+/;
    this.setState({ errorTextEmailReq: '' });
    this.state.customerEmail = e.currentTarget.value;
    if (e.currentTarget.value.match(emailRegex)) {
      this.setState({ errorTextEmail: '' });
    } else {
      this.setState({ errorTextEmail: 'Invalid format' });
    }
  }

  handleRequestDate(event, date) {
    this.setState({
      requestDate: date,
      errorTextReqdate: '' });
  }

  handleStartTime(event, time) {
    this.setState({ eventStartTime: time });
  }

  handleEndTime(event, time) {
    this.setState({ eventEndTime: time });
  }

  handleeventAddress(e) {
    this.state.eventAddress = e.currentTarget.value;
    this.setState({ eventAddress: e.currentTarget.value });
  }

  handleOrderName(e) {
    this.state.orderName = e.currentTarget.value;
    this.setState({ orderName: e.currentTarget.value });
  }

  handleModalCancel() {
    this.setState({ reviewOrder: false });
  }

  formatTime(time) {
    if (Object.prototype.toString.call(time) === '[object Date]') {
      let hours = time.getHours();
      let am = true;
      if (hours > 12) {
        am = false;
        hours -= 12;
      } else if (hours === 12) {
        am = false;
      } else if (hours === 0) {
        hours = 12;
      }
      let minutes = time.getMinutes();
      if (minutes === 0) {
        minutes = '00';
      } else if (minutes < 10) {
        minutes = `0${minutes}`;
      }
      const meridiem = (am ? 'a.m.' : 'p.m.');
      return `${hours}:${minutes} ${meridiem}`;
    }
    return '';
  }

  renderComponent() {
    const style = {
      cancelBtn: {
        right: 15,
        bottom: 0,
        position: 'absolute',
      },
      checkOutBtn: {
        left: 15,
        bottom: 0,
        position: 'relative',
      },
      textColor: {
        color: 'black',
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
        label="Review"
        primary
        keyboardFocused
        onTouchTap={e => this.handleSubmit(e)}
      />,
    ];
    const actionsDefault = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={e => this.handleCancel(e)}
      />,
    ];
    if (this.state.reviewOrder === false) {
      return (<div>
        {this.props.orderInfo.selectedPkgId > 0 || this.props.orderInfo.packages.length === 0
          ? <RaisedButton
            primary
            label="Check out"
            style={style.checkOutBtn}
            onTouchTap={e => this.handleOpen(e)}
          />
          : null
        }
        <FlatButton
          primary
          label="Cancel"
          style={style.cancelBtn}
          onTouchTap={e => this.handleRemoveOrder(e)}
        />
        <Dialog
          title="Please enter your information"
          actions={this.state.errorTextName === '' && this.state.errorTextEmail === ''
                    && this.state.errorTextReqdate === '' && this.state.errorTextPhoneReq === ''
                    && this.state.errorTextPhone === '' && this.state.errorTextEmailReq === ''
                    ? actions
                    : actionsDefault}
          modal={false}
          open={this.state.open}
          onRequestClose={(e) => this.handleClose(e)}
          autoScrollBodyContent
        >
          <TextField
            hintText="Your name"
            floatingLabelText="Your name"
            floatingLabelStyle={style.textColor}
            errorText={this.state.errorTextName}
            floatingLabelFixed
            value={this.state.customerName}
            onChange={e => this.handlecustomerName(e)}
          />
          <br />
          <TextField
            hintText="@email.com"
            type="text"
            floatingLabelText="Email"
            floatingLabelStyle={style.textColor}
            floatingLabelFixed
            errorText={this.state.errorTextEmail === ''
                        ? this.state.errorTextEmailReq
                        : this.state.errorTextEmail}
            value={this.state.customerEmail}
            onChange={e => this.handlecustomerEmail(e)}
          />
          <br />
          <TextField
            hintText="xxx-xxx-xxxx"
            floatingLabelText="Phone"
            floatingLabelStyle={style.textColor}
            floatingLabelFixed
            errorText={this.state.errorTextPhone === ''
                        ? this.state.errorTextPhoneReq
                        : this.state.errorTextPhone}
            value={this.state.customerPhone}
            onChange={e => this.onChangePhone(e)}
          />
          <br />
          <TextField
            hintText="Order name"
            floatingLabelText="Order name"
            floatingLabelStyle={style.textColor}
            floatingLabelFixed
            value={this.state.orderName}
            onChange={e => this.handleOrderName(e)}
          />
          <br />
          <TextField
            hintText="Order address"
            floatingLabelText="Address"
            floatingLabelStyle={style.textColor}
            floatingLabelFixed
            value={this.state.eventAddress}
            onChange={e => this.handleeventAddress(e)}
          />
          <br />
          <DatePicker
            floatingLabelText="Request Date"
            floatingLabelStyle={style.textColor}
            floatingLabelFixed
            hintText="Request Date"
            errorText={this.state.errorTextReqdate}
            value={this.state.requestDate}
            onChange={(e, date) => this.handleRequestDate(e, date)}
          />
          <TimePicker
            hintText="Start time"
            floatingLabelText="Event start time"
            floatingLabelStyle={style.textColor}
            floatingLabelFixed
            value={this.state.eventStartTime}
            onChange={(e, date) => this.handleStartTime(e, date)}
          />
          <TimePicker
            hintText="End time"
            floatingLabelText="Event end time"
            floatingLabelStyle={style.textColor}
            floatingLabelFixed
            value={this.state.eventEndTime}
            onChange={(e, date) => this.handleEndTime(e, date)}
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
