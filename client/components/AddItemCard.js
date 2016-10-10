import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';
import Card from 'material-ui/Card';
import CardTitle from 'material-ui/Card/CardTitle';
import { Tabs, Tab } from 'material-ui/Tabs';

import AddItemList from './AddItemList';

import Item from '../models/itemAPI';

export default class AddItemCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      hover: 2,
      newItemTitle: '',
      newItemDescription: '',
      newItemPrice: '',
      newItemPicture: 'http://i.imgur.com/GhWoMa1.png',
      unassignedItems: [],
    };
  }

  componentDidMount() {
    Item.getUnassignedItems(this.props.ownerId)
    .then(items => {
      this.setState({ unassignedItems: items });
    });
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

  handleAddNewItem() {
    this.setState({
      open: false,
    });
    this.props.addNewItem({
      name: this.state.newItemTitle,
      description: this.state.newItemDescription,
      price: this.state.newItemPrice,
      picture: this.state.newItemPicture,
    });
  }

  handleAddExistingItem(itemObj) {
    this.setState({
      open: false,
    });
    this.props.addExistingItem(itemObj);
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
    const reader = new FileReader();
    const file = e.currentTarget.files[0];
    reader.onload = (a) => {
      this.setState({
        newItemPicture: a.target.result,
      });
    };
    reader.readAsDataURL(file);
  }

  handleCancel() {
    this.setState({
      open: false,
      newItemTitle: '',
      newItemDescription: '',
      newItemPrice: '',
      newItemPicture: 'http://i.imgur.com/GhWoMa1.png',
    });
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
    if (this.state.newItemPicture !== false) {
      divToRender = (
        <div>
          <img
            role="presentation"
            src={this.state.newItemPicture}
            style={style.imgPrev}
          />
          <input
            title="Drag and drop on the Square only or Click to Add"
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
      addItem: {
        width: '90%',
        flex: '50%',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 20,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      },
    };
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
        onTouchTap={e => this.handleAddNewItem(e)}
      />,
    ];
    // This is the actual modal
    return (
      <div style={style.card}>
        <Card
          onMouseEnter={e => this.handleOnMouseEnter(e)}
          onMouseLeave={e => this.handleOnMouseLeave(e)}
          style={style.addItem}
          zDepth={this.state.hover}
        >
          <CardTitle title={'Add Item'} style={style.cardActions}>
            <FloatingActionButton
              mini
              secondary
              onTouchTap={e => this.handleOpen(e)}
              style={style.floatingActionButton}
              zDepth={0}
            >
              <ContentAdd />
            </FloatingActionButton>
          </CardTitle>
        </Card>
        <Dialog
          title="Add Item"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={(e) => this.handleClose(e)}
        >
          <Tabs>
            <Tab label="Create New" >
              <div>
                { this.renderPreview() }
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
              </div>
            </Tab>
            <Tab label="Add Existing" >
              <div>
                <AddItemList
                  items={this.state.unassignedItems}
                  addExistingItem={e => this.handleAddExistingItem(e)}
                />
              </div>
            </Tab>
          </Tabs>
        </Dialog>
      </div>
    );
  }
}

