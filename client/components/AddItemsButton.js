import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';
import ItemAPI from '../models/itemAPI';

export default class AddItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleSubmit() { // right now this consoles item obj
    this.setState({ open: false });
    const item = {
      name: this.refs.name.getValue(),
      description: this.refs.description.getValue(),
      price: this.refs.price.getValue(),
      picture: this.refs.picture.getValue(),
    };
    console.log('Attempt Item Add: ', item);
  }

  handleCancel() {
    this.setState({ open: false });
  }

  render() {
    // action buttons for Modal
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={e => this.handleCancel(e)}
      />,
      <FlatButton
        label="Submit"
        primary
        keyboardFocused
        onTouchTap={e => this.handleSubmit(e)}
      />,
    ];
    // This is the actual modal
    return (
      <div>
        <FloatingActionButton mini onTouchTap={e => this.handleOpen(e)} >
          <ContentAdd />
        </FloatingActionButton>
        <Dialog
          title="Add Item"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={(e) => this.handleClose(e)}
        >
          <TextField
            ref="name"
            hintText="Item"
            floatingLabelText="Item Name"
          />
          <br />
          <TextField
            ref="description"
            hintText="Description"
            floatingLabelText="Item Description"
          />
          <br />
          <TextField
            ref="price"
            hintText="Price"
            floatingLabelText="Item Price"
            defaultValue="$"
          />
          <br />
          <TextField
            ref="picture"
            floatingLabelText="Add Picture"
          />
        </Dialog>
      </div>
    );
  }
}

