import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import TextField from 'material-ui/TextField';

export default class EditMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      hover: 2,
      name: '',
      description: '',
    };
    this.open = e => this.handleOpen(e);
  }

  componentWillMount() {
    this.setState({
      name: this.props.name,
      description: this.props.description,
    });
  }

  componentWillReceiveProps(props) {
    this.setState({
      name: props.name,
      description: props.description,
    });
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleSubmitEdit() {
    this.props.editMenu({
      id: this.props.id,
      name: this.state.name,
      description: this.state.description,
    });
    this.setState({
      open: false,
    });
  }

  handleMenuNameChange(e) {
    this.setState({
      name: e.currentTarget.value,
    });
  }

  handleMenuDescriptionChange(e) {
    this.setState({
      description: e.currentTarget.value,
    });
  }

  handleCancelEdit() {
    this.setState({ open: false });
  }

  render() {
    const style = {
      floatingEditButton: {
        right: 170,
        bottom: 20,
        position: 'absolute',
      },
      cardActions: {
        position: 'relative',
        height: 30,
      },
      card: {
        marginBottom: '5%',
      },
    };
    // action buttons for Modal
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={e => this.handleCancelEdit(e)}
      />,
      <FlatButton
        label="Submit"
        primary
        keyboardFocused
        onTouchTap={e => this.handleSubmitEdit(e)}
      />,
    ];
    // This is the actual modal
    return (
      <div style={style.card}>
        <FloatingActionButton
          style={this.props.style}
          mini
          onTouchTap={() => this.setState({ open: true })}
        >
          <ModeEdit />
        </FloatingActionButton>
        <Dialog
          title="Edit Menu Information"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={(e) => this.handleClose(e)}
        >
          <TextField
            hintText="Item"
            floatingLabelText="Enter Menu Name"
            value={this.state.name}
            onChange={e => this.handleMenuNameChange(e)}
          /><br />
          <TextField
            hintText="Description"
            floatingLabelText="Enter Menu Description"
            value={this.state.description}
            onChange={e => this.handleMenuDescriptionChange(e)}
          /><br />
        </Dialog>
      </div>
    );
  }
}

