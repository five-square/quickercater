import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Server from '../models/serverAPI';
import Paper from 'material-ui/Paper';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';


export default class OrderTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: 2,
      selectable: false,
      showCheckboxes: false,
    };
  }

  handleOnMouseEnter() {
      this.setState({ hover: 5 });
    }

  handleOnMouseLeave() {
    this.setState({ hover: 2 });
  }



// major problems here in order of importance
// 1. OrderTable is generalized between pending and accepted. Need to figure out min props to make it work as one or the other
// 2. Need to map over orders and display them in the table.

  render() {
    return (
      <div className="OrderTable">
      <Table selectable={true} onRowSelection={(e) => this.props.handleRowSelection(e)}>
       <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
      <TableRow>
        <TableHeaderColumn>Order Number</TableHeaderColumn>
        <TableHeaderColumn>Customer Name</TableHeaderColumn>
        <TableHeaderColumn>Status</TableHeaderColumn>
      </TableRow>
    </TableHeader>

    <TableBody displayRowCheckbox={false} >
      
      <TableRow>
        <TableRowColumn>1</TableRowColumn>
        <TableRowColumn>John Smith</TableRowColumn>
        <TableRowColumn>Pending</TableRowColumn>
      </TableRow>
    </TableBody>
  </Table>
      </div>
  );
  }
}

 
