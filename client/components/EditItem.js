import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import TextField from 'material-ui/TextField';

export default class EditItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      hover: 2,
      name: this.props.name,
      description: this.props.description,
      price: this.props.price,
      picture: this.props.picture,
    };
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleSubmitEdit() {
    this.props.editItem({
      id: this.props.id,
      name: this.state.name,
      description: this.state.description,
      price: this.state.price,
      picture: this.state.picture,
    });
    this.setState({
      open: false,
    });
  }

  handleItemNameChange(e) {
    this.setState({
      name: e.currentTarget.value,
    });
  }

  handleItemDescriptionChange(e) {
    this.setState({
      description: e.currentTarget.value,
    });
  }

  handleItemPriceChange(e) {
    this.setState({
      price: e.currentTarget.value,
    });
  }

  handleCancelEdit() {
    this.setState({ open: false });
  }

  render() {
    const style = {
      floatingActionButton: {
        top: 15,
        right: 20,
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
          zDepth={0}
          secondary
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
            floatingLabelText="Enter Item Name"
            value={this.state.name}
            onChange={e => this.handleItemNameChange(e)}
          /><br />
          <TextField
            hintText="Description"
            floatingLabelText="Enter Item Description"
            value={this.state.description}
            onChange={e => this.handleItemDescriptionChange(e)}
          /><br />
          <TextField
            hintText="Price"
            floatingLabelText="Enter Item Price"
            value={this.state.price}
            onChange={e => this.handleItemPriceChange(e)}
          /><br />
        </Dialog>
      </div>
    );
  }
}

