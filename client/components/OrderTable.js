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

    var orders = [];
    if (this.props.acceptedOrders === undefined) {
      if(this.props.pendingOrders === undefined) {
        //throw new Error('No orders passed to via either acceptedOrders/pendingOrders');
      } else {
        orders = this.props.pendingOrders.map(x=>x.order);
      }
    } else {
      orders = this.props.acceptedOrders.map(x=>x.order);
    }
    this.state = {
      orders,
      hover: 2,
      showCheckboxes: false,
      thirdColumnTitle: this.props.thirdColumnTitle,
      buttonLabel: this.props.buttonLabel,
    };

    console.log('Order Table:',this.state.orders);
  }

  handleOnMouseEnter() {
    this.setState({ hover: 5 });
  }

  handleOnMouseLeave() {
    this.setState({ hover: 2 });
  }

// major problems here in order of importance
// 1. OrderTable is generalized between pending and accepted.
//  Need to figure out min props to make it work as one or the other
// 2. Need to map over orders and display them in the table.

  render() {
    return (
      <div className="OrderTable">
        <Table onRowSelection={(e) => this.props.handleRowSelection(e)}>
          <TableHeader displaySelectAll={false} >
            <TableRow>
              <TableHeaderColumn>Order Number</TableHeaderColumn>
              <TableHeaderColumn>Customer Name</TableHeaderColumn>
              <TableHeaderColumn>{this.state.thirdColumnTitle}</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} >
            {this.state.orders.map(order => 
              <TableRow selectable={false} key={order._id}>
              <TableRowColumn>{order._id}</TableRowColumn>
              <TableRowColumn>{order.properties.name}</TableRowColumn>
              <TableRowColumn>
               <FloatingActionButton mini onClick={() => console.log(order._id)} >
                 <ContentAdd />
               </FloatingActionButton>
              </TableRowColumn>
            </TableRow>
              )}
            
          </TableBody>
        </Table>
      </div>
  );
  }
}
