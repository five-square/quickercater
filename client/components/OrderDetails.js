import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn }
  from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Card from 'material-ui/Card';
import CardText from 'material-ui/Card/CardText';

export default class OrderDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: 2,
      open: this.props.showMe,
    };
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleCancel() {
    this.setState({ open: false });
  }

  handleAccept() {
    this.props.handleOrderAccept();
  }

  handleReject() {
    this.props.handleOrderReject();
  }

  handleOnMouseEnter() {
    this.setState({ hover: 5 });
  }

  handleOnMouseLeave() {
    this.setState({ hover: 2 });
  }

  render() {
    // removed by GH____
    // <RaisedButton
    //       primary label="View order"
    //       onTouchTap={e => this.handleOpen(e)}
    //     />
    //     <RaisedButton
    //       primary label="Cancel"
    //       onTouchTap={e => this.handleRemoveOrder(e)}
    //     />
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={e => this.handleCancel(e)}
      />,
      <FlatButton
        label="Accept"
        primary
        keyboardFocused
        onTouchTap={e => this.handleAccept(e)}
      />,
      <FlatButton
        label="Reject"
        primary
        keyboardFocused
        onTouchTap={e => this.handleReject(e)}
      />,
    ];
    return (
      <div>
        <Dialog
          title={`Order # ${this.props.orderInfo.order.id}`}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={(e) => this.handleClose(e)}
        >
          <Card>
            <CardText>
              <h3>Customer Information: </h3>
              <h4>Name: {this.props.orderInfo.customer.name}</h4>
              <h4>Email: {this.props.orderInfo.customer.email} </h4>
              <h4>Phone: {this.props.orderInfo.customer.phone}</h4>
              <h4>Address: {this.props.orderInfo.customer.address}</h4>
            </CardText>
          </Card>
          <div className="OrderTable">
            <Table>
              <TableHeader
                adjustForCheckbox={false}
                displaySelectAll={false}
              >
                <TableRow>
                  <TableHeaderColumn>Item Id</TableHeaderColumn>
                  <TableHeaderColumn>Name</TableHeaderColumn>
                  <TableHeaderColumn>Quantity</TableHeaderColumn>
                  <TableHeaderColumn>Price</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                {this.props.orderInfo.items.map(item =>
                  <TableRow selectable={false} key={item.id}>
                    <TableRowColumn>{item.id}</TableRowColumn>
                    <TableRowColumn>{item.name}</TableRowColumn>
                    <TableRowColumn>{item.quantity}</TableRowColumn>
                    <TableRowColumn>${item.price}</TableRowColumn>
                  </TableRow>
                  )}
              </TableBody>
            </Table>
            <h4>Total Price ${this.props.orderInfo.order.total_price}</h4>
          </div>
        </Dialog>
      </div>
  );
  }
}
