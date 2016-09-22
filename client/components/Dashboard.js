import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Server from '../models/serverAPI';
import Paper from 'material-ui/Paper';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import OrderTable from './OrderTable';
import FlatButton from 'material-ui/FlatButton';

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
          <Card onMouseEnter={() => this.handleOnMouseEnter()} 
                onMouseLeave={() => this.handleOnMouseLeave()}>
            
                <CardHeader
      title="All Orders Pending Approval"
      subtitle="(1)"
      actAsExpander={true}
      showExpandableButton={true}
    />
            <CardText expandable={true}>
             <OrderTable handleRowSelection={(row) => this.handleRowSelection(row)}/>
             <CardActions>
              <FlatButton label="Approve" onClick={(e) => console.log('Approve order: ',this.state.rowSelected)} />
             
            </CardActions>
            </CardText>
          </Card> 
          </Paper> 
      </div>
  );
  }
}

