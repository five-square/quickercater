import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Card from 'material-ui/Card';
import CardTitle from 'material-ui/Card/CardTitle';
import ContentRemove from 'material-ui/svg-icons/content/remove';

export default class AddPackageCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      hover: 2,
      newPackageName: '',
      newPackageDescription: '',
      newPackagePrice: '',
      newPackagePicture: 'http://i.imgur.com/GhWoMa1.png',
      newPackageType: '',
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

  handleAddPackage() {
    console.log('handleAddPackage props: ', this.props);
    this.setState({
      open: false,
    });
    const newPackage = Object.assign({}, {
      name: this.state.newPackageName,
      description: this.state.newPackageDescription,
      cost: this.state.newPackagePrice,
      type: this.state.newPackageType,
      picture: this.state.newPackagePicture,
      // order: this.props.count.length,
      ownerId: this.props.ownerId, //props
    });
    this.props.addPackage(newPackage);
  }

  handlePackageNameChange(e) {
    this.setState({
      newPackageName: e.currentTarget.value,
    });
  }

  handlePackageDescriptionChange(e) {
    this.setState({
      newPackageDescription: e.currentTarget.value,
    });
  }

  handlePackagePriceChange(e) {
    this.setState({
      newPackagePrice: e.currentTarget.value,
    });
  }

  handlePackageTypeChange(e) {
    this.setState({
      newPackageType: e.currentTarget.value,
    });
  }

  handlePackagePictureChange(e) {
    const reader = new FileReader();
    const file = e.currentTarget.files[0];
    reader.onload = (a) => {
      this.setState({
        newPackagePicture: a.target.result,
      });
    };
    reader.readAsDataURL(file);
  }

  handleCancel() {
    this.setState({
      open: false,
      newPackageName: '',
      newPackageDescription: '',
      newPackagePrice: '',
      newPackagePicture: 'http://i.imgur.com/GhWoMa1.png',
      newPackageType: '',
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
    if (this.state.newPackagePicture !== false) {
      divToRender = (
        <div>
          <img
            role="presentation"
            src={this.state.newPackagePicture}
            style={style.imgPrev}
            onChange={e => this.handlePackagePictureChange(e)}
          />
          <input
            title="Drag and drop on the Square only or Click to Add"
            type="file"
            style={style.imageInput}
            onChange={e => this.handlePackagePictureChange(e)}
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
      // floatingActionButton: {
      //   top: 15,
      //   right: 50,
      //   bottom: 80,
      //   position: 'absolute',
      // },
      // cardActions: {
      //   position: 'relative',
      //   height: 30,
      // },
      // card: {
      //   marginBottom: '5%',
      //   width: 250,
      // },
      imageInput: {
        cursor: 'pointer',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        width: '100%',
        opacity: 0,
      },
      // floatingDeleteButton: {
      //   right: 20,
      //   bottom: 20,
      //   position: 'absolute',
      // },
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
        onTouchTap={e => this.handleAddPackage(e)}
      />,
    ];
    // This is the actual modal
    return (
      <div>
        <FloatingActionButton
          mini
          onTouchTap={e => this.handleOpen(e)}
          zDepth={0}
        >
          <ContentAdd />
        </FloatingActionButton>
        <Dialog
          title="Add Package"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={(e) => this.handleClose(e)}
        >
          {this.renderPreview()}
          <TextField
            hintText="Package Name"
            floatingLabelText="Enter Package Name"
            value={this.state.newPackageName}
            onChange={e => this.handlePackageNameChange(e)}
          /><br />
          <TextField
            hintText="Description"
            floatingLabelText="Enter Package Description"
            value={this.state.newPackageDescription}
            onChange={e => this.handlePackageDescriptionChange(e)}
          /><br />
          <TextField
            hintText="Price"
            floatingLabelText="Enter Package Price"
            value={this.state.newPackagePrice}
            onChange={e => this.handlePackagePriceChange(e)}
          />
          <br />
          <TextField
            floatingLabelText="Add Package Type"
            value={this.state.newPackageType}
            onChange={e => this.handlePackageTypeChange(e)}
          />
          <br />
        </Dialog>
      </div>
    );
  }
}
