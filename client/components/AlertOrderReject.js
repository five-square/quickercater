import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

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

  handleClose() {
    this.setState({ open: false });
  }

  handleRejectorder() {
    this.setState({ open: false });
    this.props.handleReject(this.props.orderId);
  }

  render() {
    const actions = [
      <FlatButton
        label="No"
        primary={true}
        onTouchTap={e => this.handleClose(e)}
      />,
      <FlatButton
        label="Yes"
        primary={true}
        onTouchTap={e => this.handleRejectorder(e)}
      />,
    ];
    return (
      <div>
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          Are you sure you want to reject this order?
        </Dialog>
      </div>
    );
  }
}
