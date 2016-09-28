import React, { Component } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn }
  from 'material-ui/Table';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
// import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
// import Server from '../models/serverAPI';
// import Paper from 'material-ui/Paper';


export default class OrderTable extends Component {
  constructor(props) {
    super(props);

    // var orders = [];
    // if (this.props.acceptedOrders === undefined) {
    //   if(this.props.pendingOrders === undefined) {
    //     //throw new Error('No orders passed to via either acceptedOrders/pendingOrders');
    //   } else {
    //     orders = this.props.pendingOrders.map(x=>x.order);
    //   }
    // } else {
    //   orders = this.props.acceptedOrders.map(x=>x.order);
    // }
    this.state = {
      // orders,
      onClickMethod: (this.props.onRowClick  == undefined) ? (r) => console.log('default row click action on row: ',r) : this.props.onRowClick,
      hover: 2,
      showCheckboxes: false,
      thirdColumnTitle: this.props.thirdColumnTitle,
      buttonLabel: this.props.buttonLabel,
    };
    // console.log('Order Table:',this.state.orders);
  }

  handleOnMouseEnter() {
    this.setState({ hover: 5 });
  }

  handleOnMouseLeave() {
    this.setState({ hover: 2 });
  }

  render() {
    let orders = [];
    orders = this.props.AnyOrders.map(x => x.order);
    console.log('orders: ', orders);
    return (
      <div className="OrderTable">
        <Table onCellClick={this.state.onClickMethod}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>Order Number</TableHeaderColumn>
              <TableHeaderColumn>Customer Name</TableHeaderColumn>
              <TableHeaderColumn>Total Order Price</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} showRowHover >
            {orders.map(order =>
              <TableRow key={order._id}>
                <TableRowColumn>{order._id}</TableRowColumn>
                <TableRowColumn>{order.properties.name}</TableRowColumn>
                <TableRowColumn>
                  {order.properties.total_price}
                </TableRowColumn>
              </TableRow>
              )}
          </TableBody>
        </Table>
      </div>
  );
  }
}
