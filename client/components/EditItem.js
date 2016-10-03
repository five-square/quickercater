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

  componentWillReceiveProps(newProps) {
    this.setState({ newProps });
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
            src={this.props.pic}
            style={style.imgPrev}
          />
        </div>);
    }
    return divToRender;
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
          title="Edit Item Information"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={(e) => this.handleClose(e)}
        >
          <div>
            { this.renderPreview() }
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
              floatingLabelText="Enter Item Price (in dollars)"
              value={this.state.price}
              onChange={e => this.handleItemPriceChange(e)}
            /><br />
          </div>
        </Dialog>
      </div>
    );
  }
}

