import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Card from 'material-ui/Card';
import CardTitle from 'material-ui/Card/CardTitle';

export default class AddPackageCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      hover: 2,
      newPackageName: '',
      newPackageDescription: '',
      newPackagePrice: '',
      newPackagePicture: '',
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
    this.props.addItem({
      name: this.state.newItemTitle,
      description: this.state.newItemDescription,
      price: this.state.newItemPrice,
      picture: this.state.newItemPicture,
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

  handleCancel() {
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
        width: 250,
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
            floatingLabelText="Add Picture"
            value={this.state.newPackagePicture}
            onChange={e => this.handlePackagePictureChange(e)}
          />
          <br />
          <TextField
            floatingLabelText="Add Package Type"
            value={this.state.newPackageType}
            onChange={e => this.handlePackageTypeChange(e)}
          />
        </Dialog>
      </div>
    );
  }
}
