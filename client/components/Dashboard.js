import React, { Component } from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import OrderTable from './OrderTable';
import OrderAPI from './../models/orderAPI';
import OrderDetails from './OrderDetails';
import Customer from '../models/CustomerAPI';
import Email from './emailHtml';
import DashboardNavBar from './DashboardNavBar';

// Implement:
// 1. fetchCompletedOrders - API, endpoint, db call

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: 2,
      ownerId: this.props.ownerId,
      pendingOrders: [],
      acceptedOrders: [],
      completedOrders: [],
      showOrderDetails: -1,
      orderInfo: {},
      returning: false,
      viewMenu: false,
      orderState: 'pending',
    };
    this.openMenu = e => this.handleOpenMenu(e);
    this.closeMenu = e => this.handleCloseMenu(e);
    this.onRowClickTF = this.handleOnRowClick.bind(this, true, false);
    this.onRowClickFF = this.handleOnRowClick.bind(this, false, false);
    this.onRowClickFT = this.handleOnRowClick.bind(this, false, true);
  }

  componentWillMount() {
    this.fetchPendingOrders(this.props.ownerId);
    this.fetchAcceptedOrders(this.props.ownerId);
    this.fetchCompletedOrders(this.props.ownerId);
  }

  fetchPendingOrders(ownerId) {
    OrderAPI.fetchPendingOrders(ownerId).then(resp => {
      this.setState({ pendingOrders: resp });
    });
  }

  fetchAcceptedOrders(ownerId) {
    OrderAPI.fetchAcceptedOrders(ownerId).then(resp => {
      this.setState({ acceptedOrders: resp });
    });
  }

  fetchCompletedOrders(ownerId) {
    OrderAPI.fetchCompletedOrders(ownerId).then(resp => {
      this.setState({ completedOrders: resp });
    });
  }

  handleOpenMenu() {
    this.setState({ viewMenu: true });
  }

  handleCloseMenu() {
    this.setState({ viewMenu: false });
  }

  handleOnRowClick(pendingOrder, completedOrder, row) {
  // pendingOrder is bool whether click came from pendingOrder list
    // console.log('pendingOrder: ', pendingOrder, 'completedOrder: ', completedOrder);
    let orderId;
    let orderType;
    if (pendingOrder) {
      orderId = this.state.pendingOrders[row].order._id;
      orderType = 'pending';
    } else if (completedOrder) {
      orderId = this.state.completedOrders[row].order._id;
      orderType = 'completed';
    } else {
      orderId = this.state.acceptedOrders[row].order._id;
      orderType = 'accepted';
    }
    // console.log('handleOnRowClick orderType: ', orderType);
    OrderAPI.fetchOrderDetails(orderId).then(resp => {
      // console.log(resp);
      this.setState({ showOrderDetails: orderId,
        orderInfo: resp,
        orderState: orderType,
         });
    });
  }

  handleOrderAccept(orderId) {
    OrderAPI.createAcceptOrderRelationship(orderId)
      .then(() => {
      // .then(resp => {
        // console.log('handleOrderAccept resp: ', resp);
        const mailOptions = {
          from: 'fivesquare43@gmail.com',
          to: `${this.state.orderInfo.customer.email}`,
          subject: 'Hello from QuickerCater',
          generateTextFromHTML: true,
          html: Email.compose(this.state.orderInfo, this.props.storeName, 'accepted'),
        };
        Customer.sendEmail(mailOptions, this.props.ownerId)
          .then(() => {
          // .then(response => {
            // console.log('response after confirmation email sent: ', response);
          });
        this.fetchPendingOrders(this.props.ownerId);
        this.fetchAcceptedOrders(this.props.ownerId);
        this.setState({ returning: true, showOrderDetails: -1 });
      });
  }

  handleOrderFulfilled(orderId) {
    OrderAPI.createFulfilledOrderRelationship(orderId)
      .then(() => {
      // .then(response => {
        // console.log('handleOrderFulfilled response: ', response);
        this.fetchPendingOrders(this.props.ownerId);
        this.fetchAcceptedOrders(this.props.ownerId);
        this.fetchCompletedOrders(this.props.ownerId);
        this.setState({ returning: true, showOrderDetails: -1 });
      });
  }

  handleModalCancel() {
    this.setState({ showOrderDetails: -1 });
  }

  handleOrderReject(orderId) {
    // console.log('handleOrderReject orderId: ', orderId);
    OrderAPI.deleteRejectedOrder(orderId)
      .then(() => {
      // .then(resp => {
        // console.log('handleOrderReject resp: ', resp);
        this.fetchPendingOrders(this.props.ownerId);
        this.fetchAcceptedOrders(this.props.ownerId);
      });
  }

  handleOnMouseEnter() {
    this.setState({ hover: 5 });
  }

  handleOnMouseLeave() {
    this.setState({ hover: 2 });
  }

  render() {
    /* only mount orderdetails if we have a click. Then pass in correct orderObj
    via orderInfo prop(call with row number passed onClick) */
    return (
      <div style={this.props.style}>
        <Paper zDepth={this.state.hover}>
          <DashboardNavBar
            toggleEditing={this.props.toggleEditing}
            open={this.state.viewMenu}
            openMenu={this.openMenu}
            closeMenu={this.closeMenu}
            colorTheme={this.props.colorTheme}
            changeTheme={this.props.changeTheme}
          />
          {this.state.showOrderDetails !== -1
            ? <OrderDetails
              showMe
              orderInfo={this.state.orderInfo}
              handleOrderAccept={e => this.handleOrderAccept(e)}
              handleOrderReject={e => this.handleOrderReject(e)}
              handleModalCancel={e => this.handleModalCancel(e)}
              handleOrderFulfilled={e => this.handleOrderFulfilled(e)}
              orderState={this.state.orderState}
              storeName={this.props.storeName}
              ownerId={this.props.ownerId}
            />
             : null
          }
          <Card
            expanded={this.state.pendingOrders.length === 0 ? false : undefined}
            onMouseEnter={() => this.handleOnMouseEnter()}
            onMouseLeave={() => this.handleOnMouseLeave()}
          >
            <CardHeader
              title="Pending Orders"
              subtitle={this.state.pendingOrders === undefined ? '0'
                        : this.state.pendingOrders.length}
              actAsExpander={(Array.isArray(this.state.pendingOrders)
                && this.state.pendingOrders.length > 0)}
              showExpandableButton={(Array.isArray(this.state.pendingOrders)
                && this.state.pendingOrders.length > 0)}
            />
            <CardText expandable>
              <OrderTable
                AnyOrders={this.state.pendingOrders}
                onRowClick={this.onRowClickTF}
              />
            </CardText>
          </Card>
          <Card
            expanded={this.state.acceptedOrders.length === 0 ? false : undefined}
            onMouseEnter={() => this.handleOnMouseEnter()}
            onMouseLeave={() => this.handleOnMouseLeave()}
          >
            <CardHeader
              title="Approved Orders"
              subtitle={this.state.acceptedOrders === undefined ? '0'
                        : this.state.acceptedOrders.length}
              actAsExpander={(Array.isArray(this.state.acceptedOrders)
                              && this.state.acceptedOrders.length > 0)}
              showExpandableButton={(Array.isArray(this.state.acceptedOrders)
                              && this.state.acceptedOrders.length > 0)}
            />
            <CardText expandable >
              <OrderTable
                onRowClick={this.onRowClickFF}
                AnyOrders={this.state.acceptedOrders}
              />
            </CardText>
          </Card>
          <Card
            onMouseEnter={() => this.handleOnMouseEnter()}
            onMouseLeave={() => this.handleOnMouseLeave()}
          >
            <CardHeader
              title="Completed Orders"
              subtitle={this.state.completedOrders === undefined ? '0'
                        : this.state.completedOrders.length}
              actAsExpander={(Array.isArray(this.state.completedOrders)
                              && this.state.completedOrders.length > 0)}
              showExpandableButton={(Array.isArray(this.state.completedOrders)
                              && this.state.completedOrders.length > 0)}
            />
            <CardText expandable >
              <OrderTable
                onRowClick={this.onRowClickFT}
                AnyOrders={this.state.completedOrders}
              />
            </CardText>
          </Card>
        </Paper>
      </div>
    );
  }
}

