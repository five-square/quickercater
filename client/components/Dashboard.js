import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
// import Server from '../models/serverAPI';
import Paper from 'material-ui/Paper';
// import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn }
//  from 'material-ui/Table';
import OrderTable from './OrderTable';
import OrderAPI from './../models/OrderAPI';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: 2,
      rowSelected: '',
      ownerId: this.props.ownerId,
    };
  }

  componentWillMount (){
    // console.log(this.props.ownerId);
    var ownerId = this.props.ownerId;
    OrderAPI.getPendingOrders(ownerId).then(orders => {
      //this.setState({pendingOrders: orders});
      console.log(orders);
    });
  }

  handleOnMouseEnter() {
    this.setState({ hover: 5 });
  }

  handleOnMouseLeave() {
    this.setState({ hover: 2 });
  }

  render() {
    return (
      <div >
        <Paper zDepth={this.state.hover}>
          <Card
            onMouseEnter={() => this.handleOnMouseEnter()}
            onMouseLeave={() => this.handleOnMouseLeave()}
          >
            <CardHeader
              title="Pending Orders"
              subtitle="(<count>)"
              actAsExpander
              showExpandableButton
            />
            <CardText expandable>
              <OrderTable
                handleRowSelection={(row) =>
                this.handleRowSelection(row)}
                orders={this.state.pendingOrders}
                thirdColumnTitle="Accept Order"
                buttonLabel="Accept"
              />
            </CardText>
          </Card>
          <Card
            onMouseEnter={() => this.handleOnMouseEnter()}
            onMouseLeave={() => this.handleOnMouseLeave()}
          >
            <CardHeader
              title="Approved Orders"
              subtitle="(<count>)"
              actAsExpander
              showExpandableButton
            />
            <CardText expandable>
              <OrderTable
                handleRowSelection={(row) =>
                this.handleRowSelection(row)}
                orders={this.state.pendingOrders}
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

