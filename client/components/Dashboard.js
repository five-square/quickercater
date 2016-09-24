import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
// import Server from '../models/serverAPI';
import Paper from 'material-ui/Paper';
// import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn }
//  from 'material-ui/Table';
import OrderTable from './OrderTable';


export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: 2,
      rowSelected: '',
    };
  }

  handleOnMouseEnter() {
    this.setState({ hover: 5 });
  }

  handleOnMouseLeave() {
    this.setState({ hover: 2 });
  }

  render() {
    return (
      <div className="Dashboard">
        <Paper zDepth={this.state.hover}>
          <Card
            onMouseEnter={() => this.handleOnMouseEnter()}
            onMouseLeave={() => this.handleOnMouseLeave()}
          >
            <CardHeader
              title="All Orders Pending Approval"
              subtitle="(1)"
              actAsExpander
              showExpandableButton
            />
            <CardText expandable>
              <OrderTable
                handleRowSelection={(row) =>
                this.handleRowSelection(row)}
                orders={this.props.pendingOrders}
              />
              <CardActions>
                <FlatButton label="Approve" />
              </CardActions>
            </CardText>
          </Card>
        </Paper>
      </div>
  );
  }
}

