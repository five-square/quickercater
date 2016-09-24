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
    console.log(props.pendingOrders);
    this.state = {
      hover: 2,
      showCheckboxes: false,
      thirdColumnTitle: this.props.thirdColumnTitle,
      buttonLabel: this.props.buttonLabel,
    };
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
            <TableRow selectable={false}>
              <TableRowColumn>1</TableRowColumn>
              <TableRowColumn>John Smith</TableRowColumn>
              <TableRowColumn>
               <FloatingActionButton mini onClick={() => console.log('stuff')} >
                 <ContentAdd />
               </FloatingActionButton>
              </TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>
      </div>
  );
  }
}
