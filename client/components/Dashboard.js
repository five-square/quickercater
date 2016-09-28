import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
// import Server from '../models/serverAPI';
import Paper from 'material-ui/Paper';
// import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn }
//  from 'material-ui/Table';
import OrderTable from './OrderTable';
import OrderAPI from './../models/OrderAPI';
import OrderDetails from './OrderDetails';

// Implement 1) allow owner to view details of pending order with modal
//           2) Move order acceptance to details modal
//           3) Complete order button on Accepted orders table

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: 2,
      ownerId: this.props.ownerId,
      pendingOrders: [],
      acceptedOrders: [],
      showOrderDetails: -1,
      orderInfo: {},
      returning: false,
    };
  }

  componentWillMount (){
    this.fetchPendingOrders(this.props.ownerId);
    this.fetchAcceptedOrders(this.props.ownerId);
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

  handleOnRowClick(row) {
   if(this.state.pendingOrders.length > 0){
      var orderId = this.state.pendingOrders[row].order._id;
      OrderAPI.fetchOrderDetails(orderId).then(resp => {
        console.log(resp);
        this.setState({showOrderDetails: orderId, orderInfo: resp});
      });
   }
  }

  handleOrderAccept(orderId) {
    OrderAPI.createAcceptOrderRelationship(orderId)
      .then(resp => {
        console.log('handleOrderAccept resp: ', resp);
        this.fetchPendingOrders(this.props.ownerId);
        this.fetchAcceptedOrders(this.props.ownerId);
        this.setState({returning: true});
      });
  }

  handleOrderReject(orderId) {
    console.log('handleOrderReject orderId: ', orderId);
    OrderAPI.deleteRejectedOrder(orderId)
      .then(resp => {
        console.log('handleOrderReject resp: ', resp);
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
    // only mount orderdetails if we have a click. Then pass in correct orderObj via orderInfo prop(call with row number passed onClick)
    return (
      <div >
        {this.state.showOrderDetails !== -1
          ? <OrderDetails
              showMe={this.state.showOrderDetails > -1}
              orderInfo={this.state.orderInfo} pending={true}
              handleOrderAccept={e => this.handleOrderAccept(e)}
              handleOrderReject={e=> this.handleOrderReject(e)}
              />
           : null
        }
        
        <Paper zDepth={this.state.hover}>
          <Card
            expanded={this.state.pendingOrders.length === 0 ? false : undefined}
            onMouseEnter={() => this.handleOnMouseEnter()}
            onMouseLeave={() => this.handleOnMouseLeave()}
          >
            <CardHeader
              title="Pending Orders"
              subtitle={this.state.pendingOrders === undefined ? '0' : this.state.pendingOrders.length}
              actAsExpander={(Array.isArray(this.state.pendingOrders) && this.state.pendingOrders.length > 0)}
              showExpandableButton={(Array.isArray(this.state.pendingOrders) && this.state.pendingOrders.length > 0)}
            />
            <CardText expandable>
              <OrderTable
                handleRowSelection={(row) =>
                this.handleRowSelection(row)}
                AnyOrders={this.state.pendingOrders}
                thirdColumnTitle="Accept Order"
                buttonLabel="Accept"
                onRowClick={this.handleOnRowClick.bind(this)}
              />
            </CardText>
          </Card>
          <Card
            onMouseEnter={() => this.handleOnMouseEnter()}
            onMouseLeave={() => this.handleOnMouseLeave()}
          >
            <CardHeader
              title="Approved Orders"
              subtitle={this.state.acceptedOrders === undefined? '0' : this.state.acceptedOrders.length}
               actAsExpander={(Array.isArray(this.state.acceptedOrders) && this.state.acceptedOrders.length > 0)}
              showExpandableButton={(Array.isArray(this.state.acceptedOrders) && this.state.acceptedOrders.length > 0)}
            />
            <CardText expandable >
              <OrderTable
                handleRowSelection={(row) =>
                this.handleRowSelection(row)}
                AnyOrders={this.state.acceptedOrders}
                thirdColumnTitle="Complete Order"
                buttonLabel="Complete"
              />
            </CardText>
          </Card>
        </Paper>
      </div>
  );
  }
}

