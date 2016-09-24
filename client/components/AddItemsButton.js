import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Card from 'material-ui/Card';
import CardTitle from 'material-ui/Card/CardTitle';

export default class AddItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      hover: 2,
      newItemTitle: '',
      newItemDescription: '',
      newItemPrice: '',
      newItemPicture: '',
    };
  }

  handleOnMouseEnter() {
    this.setState({
      hover: 5,
    });
  }

  handleOnMouseLeave() {
    this.setState({
      hover: 2,
    });
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
      picture: this.state.newItemPicture,
    });
  }

  handleItemTitleChange(e) {
    this.setState({
      newItemTitle: e.currentTarget.value,
    });
  }

  handleItemDescriptionChange(e) {
    this.setState({
      newItemDescription: e.currentTarget.value,
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
        <Paper zDepth={this.state.hover}>
          <Card
            onMouseEnter={e => this.handleOnMouseEnter(e)}
            onMouseLeave={e => this.handleOnMouseLeave(e)}
          >
            <CardTitle
              title={'Add Item'}
            />
            <FloatingActionButton mini onTouchTap={e => this.handleOpen(e)} >
              <ContentAdd />
            </FloatingActionButton>
          </Card>
        </Paper>
        <Dialog
          title="Add Item"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={(e) => this.handleClose(e)}
        >
          <TextField
            hintText="Item"
            floatingLabelText="Enter Item Title"
            value={this.state.newItemTitle}
            onChange={e => this.handleItemTitleChange(e)}
          /><br />
          <TextField
            hintText="Description"
            floatingLabelText="Enter Item Description"
            value={this.state.newItemDescription}
            onChange={e => this.handleItemDescriptionChange(e)}
          /><br />
          <TextField
            hintText="Price"
            floatingLabelText="Enter Item Price"
            value={this.state.newItemPrice}
            onChange={e => this.handleItemPriceChange(e)}
          />
          <br />
          <TextField
            floatingLabelText="Add Picture"
            value={this.state.newItemPicture}
            onChange={e => this.handleItemPictureChange(e)}
          />
        </Dialog>
      </div>
    );
  }
}

