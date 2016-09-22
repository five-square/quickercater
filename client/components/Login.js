import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export default class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleSubmit() { // right now this consoles user input
    this.setState({ open: false });
    const username = this.refs.username.getValue();
    const password = this.refs.password.getValue();
    console.log('Attempt USR: ', username);
    console.log('Attempt PWD: ', password);
  }

  handleCancel(){
    this.setState({ open: false });
  }

  render() {
    // action buttons for Modal
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={(e) => this.handleCancel(e)}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={(e) => this.handleSubmit(e)}
      />,
    ];
    // This is the actual modal
    return (
      <div>
        <div>
          <RaisedButton primary label="Login" onTouchTap={(e) => this.handleOpen(e)} />
          <Dialog
            title="Login"
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={(e) => this.handleClose(e)}
          >
            <TextField
              ref="username"
              hintText="Username"
              floatingLabelText="Please enter a username"
              floatingLabelFixed={true}
            />
            <br />
            <TextField
              ref="password"
              hintText="Password Field"
              floatingLabelText="Password"
              type="password"
            />
          </Dialog>
        </div>
      </div>
    );
  }
}

