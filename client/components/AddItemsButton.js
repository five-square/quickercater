import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';

export default class AddItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      newItemTitle: '',
      newItemDescription: '',
      newItemPrice: '',
      newPicture: '',
    };
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleAddItem() {
    this.setState({
      open: false,
    });
    this.props.addItem({
      name: this.state.newItemTitle,
      description: this.state.newItemDescription,
      price: this.state.newItemPrice,
    });
  }

  handleItemTitleChange(e) {
    this.setState({
      newItemTitle: e.currentTarget.value,
    });
  }

  handleItemDescriptionChange(e) {
    this.setState({
      newMenuDescription: e.currentTarget.value,
    });
  }

  handleItemPriceChange(e) {
    this.setState({
      newItemPrice: e.currentTarget.value,
    });
  }

  handleItemPictureChange(e) {
    this.setState({
      newItemPicture: e.currentTarget.value,
    });
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
        onTouchTap={e => this.handleAddItem(e)}
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
            id="ItemTitle"
            hintText="Item"
            floatingLabelText="Enter Item Title"
            value={this.state.newMenuTitle}
            onChange={e => this.handleItemTitleChange(e)}
          /><br />
          <TextField
            id="ItemDescription"
            hintText="Description"
            floatingLabelText="Enter Item Description"
            value={this.state.newItemDescription}
            onChange={e => this.handleItemDescriptionChange(e)}
          /><br />
          <TextField
            id="price"
            hintText="Price"
            floatingLabelText="Enter Item Price"
            value={this.state.newItemPrice}
            defaultValue="$"
            onChange={e => this.handleItemPriceChange(e)}
          />
          <br />
          <TextField
            id="picture"
            floatingLabelText="Add Picture"
            value={this.state.newPicture}
            onChange={e => this.handleItemPictureChange(e)}
          />
        </Dialog>
      </div>
    );
  }
}

