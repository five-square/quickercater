import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Card from 'material-ui/Card';
import CardTitle from 'material-ui/Card/CardTitle';
//
export default class AddPackageCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      hover: 2,
      newPackageName: '',
      newPackageDescription: '',
      newPackagePrice: '',
      newPackagePicture: false,
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
    this.setState({
      open: false,
    });
    this.props.addPackage({
      name: this.state.newPackageName,
      description: this.state.newPackageDescription,
      cost: this.state.newPackagePrice,
      type: this.state.newPackageType,
      picture: this.state.newPackagePicture,
    });
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

  handlePackagePictureChange(e) {
    this.setState({
      newPackagePicture: e.currentTarget.value,
    });
  }

  handlePackageTypeChange(e) {
    this.setState({
      newPackageType: e.currentTarget.value,
    });
  }

  handlePackagePictureChange(e) {
    e.preventDefault();

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
      newPackagePicture: 'https://ssl.gstatic.com/images/branding/product/1x/avatar_circle_blue_512dp.png',
      newPackageType: '',
    });
  }
  renderPreview() {
    let divToRender = '';
    const imgPrev = {
      float: 'right',
      marginRight: '3%',
      height: '25%',
      width: '25%',
    };
    if (this.state.newPackagePicture !== false) {
      divToRender = (
        <img
          alt="packagePic"
          src={this.state.newPackagePicture}
          style={imgPrev}
        />);
    } else {
      divToRender = (
        <img
          alt="packagePic"
          src={this.props.pic}
          style={imgPrev}
        />);
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
        width: 250,
      },
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
      <div style={style.card}>
        <Paper zDepth={this.state.hover} >
          <Card
            onMouseEnter={e => this.handleOnMouseEnter(e)}
            onMouseLeave={e => this.handleOnMouseLeave(e)}
            style={style.card}
          >
            <CardTitle title={'Add Package'} style={style.cardActions}>
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
        </Paper>
        <Dialog
          title="Add Package"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={(e) => this.handleClose(e)}
        >
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
          <br />
          <FlatButton
            label="Choose an Image"
            labelPosition="before"
          >
            <input
              type="file"
              style={style.imageInput}
              onChange={e => this.handlePackagePictureChange(e)}
            />
          </FlatButton>
        </Dialog>
      </div>
    );
  }
}
