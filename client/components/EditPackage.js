import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import TextField from 'material-ui/TextField';

export default class EditPackage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      hover: 2,
      name: this.props.name,
      description: this.props.description,
      cost: this.props.cost,
      type: this.props.type,
      picture: this.props.picture,
    };
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleSubmitEdit() {
    this.props.addPackage({
      name: this.state.name,
      description: this.state.description,
      cost: this.state.cost,
      type: this.state.type,
      picture: this.state.picture,
    });
    this.setState({
      open: false,
    });
  }

  handlePackageNameChange(e) {
    this.setState({
      name: e.currentTarget.value,
    });
  }

  handlePackageDescriptionChange(e) {
    this.setState({
      description: e.currentTarget.value,
    });
  }

  handlePackageCostChange(e) {
    this.setState({
      cost: e.currentTarget.value,
    });
  }

  handlePackageTypeChange(e) {
    this.setState({
      type: e.currentTarget.value,
    });
  }

  handlePackagePictureChange(e) {
    this.setState({
      picture: e.currentTarget.value,
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
      <div style={style.floatingEditButton}>
        <FloatingActionButton
          style={this.props.style}
          mini
          onTouchTap={() => this.setState({ open: true })}
        >
          <ModeEdit />
        </FloatingActionButton >
        <Dialog
          title="Edit Package Information"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={(e) => this.handleClose(e)}
        >
          <TextField
            hintText="Package Name"
            floatingLabelText="Enter Package Name"
            value={this.state.name}
            onChange={e => this.handlePackageNameChange(e)}
          /><br />
          <TextField
            hintText="Description"
            floatingLabelText="Enter Package Description"
            value={this.state.description}
            onChange={e => this.handlePackageDescriptionChange(e)}
          /><br />
          <TextField
            hintText="Price"
            floatingLabelText="Enter Package Price"
            value={this.state.cost}
            onChange={e => this.handlePackageCostChange(e)}
          /><br />
          <TextField
            hintText="Type"
            floatingLabelText="Enter Package Type"
            value={this.state.type}
            onChange={e => this.handlePackageTypeChange(e)}
          /><br />
        </Dialog>
      </div>
    );
  }
}