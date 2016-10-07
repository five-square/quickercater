import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';


export default class OrderTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onClickMethod: this.props.onRowClick,
      showCheckboxes: false,
      buttonLabel: this.props.buttonLabel,
    };
  }

  render() {
    const style = {
      text: {
        color: 'black',
      },
    };
    let orders = [];
    orders = this.props.AnyOrders.map(x => x.order);
    return (
      <div className="OrderTable">
        <Table onCellClick={this.state.onClickMethod}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn style={style.text}>Order Number</TableHeaderColumn>
              <TableHeaderColumn style={style.text}>Order Name</TableHeaderColumn>
              <TableHeaderColumn style={style.text}>Total Order Price</TableHeaderColumn>
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
