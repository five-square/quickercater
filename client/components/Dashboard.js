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
      pendingOrders: this.props.pendingOrders || [],
      acceptedOrders: this.props.acceptedOrders || [],
    };
  }

  componentWillReceiveProps (){
    console.log('Dash:', this.props.pendingOrders);
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
              subtitle={this.props.pendingOrders === undefined? '0' : this.props.pendingOrders.length}
              actAsExpander={(Array.isArray(this.props.pendingOrders) && this.props.pendingOrders.length > 0)}
              showExpandableButton={(Array.isArray(this.props.pendingOrders) && this.props.pendingOrders.length > 0)}
            />
            <CardText expandable>
              <OrderTable
                handleRowSelection={(row) =>
                this.handleRowSelection(row)}
                pendingOrders={this.props.pendingOrders}
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
              subtitle={this.props.acceptedOrders === undefined? '0' : this.props.acceptedOrders.length}
               actAsExpander={(Array.isArray(this.props.acceptedOrders) && this.props.acceptedOrders.length > 0)}
              showExpandableButton={(Array.isArray(this.props.acceptedOrders) && this.props.acceptedOrders.length > 0)}
            />
            <CardText expandable >
              <OrderTable
                handleRowSelection={(row) =>
                this.handleRowSelection(row)}
                acceptedOrders={this.props.acceptedOrders}
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

