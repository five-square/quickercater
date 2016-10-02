import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import TextField from 'material-ui/TextField';

export default class EditPackage extends Component {

  constructor(props) {
    super(props);
    console.log('Edit Package constructor props', this.props);
    this.state = {
      open: false,
      hover: 2,
      name: this.props.package.name,
      description: this.props.package.description,
      cost: this.props.package.cost,
      type: this.props.package.type,
      picture: this.props.package.picture,
    };
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleSubmitEdit() {
    this.setState({
      open: false,
    });
    const editPackage = Object.assign({}, {
      id: this.props.package.id,
      name: this.state.name,
      description: this.state.description,
      cost: this.state.price,
      type: this.state.type,
      picture: this.state.picture,
      ownerId: this.props.ownerId,
    });
    this.props.editPackage(editPackage);
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

  handleItemPictureChange(e) {
    const reader = new FileReader();
    const file = e.currentTarget.files[0];
    reader.onload = (a) => {
      a.preventDefault();
      this.setState({
        picture: a.target.result,
      });
    };
    reader.readAsDataURL(file);
  }

  handleCancelEdit() {
    this.setState({ open: false });
  }

  renderPreview() {
    let divToRender = '';
    const style = {
      imgPrev: {
        float: 'right',
        marginTop: '8%',
        marginRight: '3%',
        height: '25%',
        width: '25%',
      },
      imageInput: {
        cursor: 'pointer',
        position: 'absolute',
        top: '35%',
        left: '72%',
        height: '50%',
        width: '25%',
        opacity: 0,
      },
      imgButton: {
        float: 'right',
        marginTop: '8%',
        marginRight: '3%',
        height: '25%',
        width: '25%',
      },
    };
    if (this.state.picture !== false) {
      divToRender = (
        <div>
          <img
            role="presentation"
            src={this.state.picture}
            style={style.imgPrev}
          />
          <input
            title="Drag and drop to replace image or Click to Add new"
            type="file"
            style={style.imageInput}
            onChange={e => this.handleItemPictureChange(e)}
          />
        </div>);
    } else {
      divToRender = (
        <div>
          <input
            type="file"
            style={style.imageInput}
            onChange={e => this.handleItemPictureChange(e)}
          />
          <img
            role="presentation"
            src={this.props.package.picture}
            style={style.imgPrev}
          />
        </div>);
    }
    return divToRender;
  }

  render() {
    const style = {
      // floatingEditButton: {
      //   right: 170,
      //   bottom: 20,
      //   position: 'absolute',
      // },
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
          {this.renderPreview()}
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
