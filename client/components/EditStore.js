import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import TextField from 'material-ui/TextField';
import Cropper from 'react-cropper';
import Avatar from 'material-ui/Avatar';
import CircularProgress from 'material-ui/CircularProgress';

export default class EditStoreInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      cropOpen: false,
      loading: false,
      cropped: false,
      hover: 2,
      name: this.props.store.name,
      description: this.props.store.description,
      slogan: this.props.store.slogan,
      picture: this.props.store.picture,
      address: this.props.store.address,
      banner: this.props.store.banner,
    };
    this.crop = e => this.handleCrop(e);
  }

  componentWillReceiveProps(newProps) {
    this.setState({ newProps });
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleCropOpen() {
    this.setState({ cropOpen: true });
  }

  handleSubmitEdit() {
    this.props.editStore({
      id: this.props.store.id,
      name: this.state.name,
      description: this.state.description,
      slogan: this.state.slogan,
      picture: this.state.picture,
      address: this.state.address,
      banner: this.state.banner,
    });
    this.setState({
      open: false,
    });
  }

  handleStoreNameChange(e) {
    this.setState({
      name: e.currentTarget.value,
    });
  }

  handleMaxLength(e) {
    let disabled = false;
    if (e.currentTarget.value.length > 200) {
      disabled = true;
    }
    return disabled;
  }

  handleStoreDescriptionChange(e) {
    this.setState({
      description: e.currentTarget.value,
      disabled: this.handleMaxLength(e),
      available: (200 - e.currentTarget.value.length),
    });
  }

  handleStoreSloganChange(e) {
    this.setState({
      slogan: e.currentTarget.value,
    });
  }

  handleStoreAddressChange(e) {
    this.setState({
      address: e.currentTarget.value,
    });
  }

  handleStorePictureChange(e) {
    const reader = new FileReader();
    const file = e.currentTarget.files[0];
    reader.onload = (a) => {
      this.setState({
        picture: a.target.result,
      });
    };
    reader.readAsDataURL(file);
  }

  handleStoreBannerChange(e) {
    const reader = new FileReader();
    const file = e.currentTarget.files[0];
    reader.onload = (a) => {
      this.setState({
        banner: a.target.result,
      });
    };
    reader.readAsDataURL(file);
  }

  handleCancelEdit() {
    this.setState({ open: false });
  }

  handleCancelCrop() {
    this.setState({ cropOpen: false });
  }

  handleCrop() {
    return new Promise(resolve => {
      this.setState({ loading: true });
      resolve(this.refs.cropper.getCroppedCanvas().toDataURL());
    }).then(data => {
      this.setState({ banner: data, cropOpen: false, loading: false });
    });
  }

  renderCrop() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={e => this.handleCancelCrop(e)}
      />,
      <FlatButton
        label="Submit"
        primary
        keyboardFocused
        onTouchTap={this.crop}
      />,
    ];
    const btnStyle = {
      position: 'absolute',
      left: '73%',
      bottom: '27%',
      width: '20%',
    };
    return (
      <div>
        <FlatButton
          secondary
          label="Edit Banner"
          style={btnStyle}
          onTouchTap={e => this.handleCropOpen(e)}
        />
        <Dialog
          modal
          open={this.state.cropOpen}
          title="Image Crop"
          actions={actions}
          onRequestClose={(e) => this.handleCancelCrop(e)}
        >
          { this.state.loading ?
            <CircularProgress />
          : <Cropper
            ref={'cropper'}
            src={this.state.banner}
            style={{ height: 400, width: '100%' }}
            aspectRatio={16 / 9}
            rotatable={false}
            zoomOnWheel={false}
          />
        }
        </Dialog>
      </div>
    );
  }

  renderPreview() {
    let divToRender = '';
    const picture = this.state.picture;
    const style = {
      imgPrev: {
        position: 'absolute',
        height: '30%',
        width: '22%',
        left: '40%',
        top: '35%',
      },
      imageInput: {
        top: '0%',
        opacity: 0,
        left: '38%',
        width: '25%',
        height: '100%',
        cursor: 'pointer',
        position: 'absolute',
      },
    };
    if (picture !== false && picture !== '') {
      divToRender = (
        <div>
          <img
            role="presentation"
            src={this.state.picture}
            style={style.imgPrev}
          />
          <input
            title="Drag and drop or Click to replace Logo"
            type="file"
            style={style.imageInput}
            onChange={e => this.handleStorePictureChange(e)}
          />
        </div>);
    } else {
      divToRender = (
        <div>
          <input
            type="file"
            style={style.imageInput}
            onChange={e => this.handleStorePictureChange(e)}
          />
          <Avatar
            style={{ position: 'absolute', left: '50%', top: '46%', height: 60, width: 60, fontSize: 30 }}
            children={this.props.store.name.charAt(0)}
          />
        </div>);
    }
    return divToRender;
  }

  renderBannerPreview() {
    let divToRender = '';
    const banner = this.props.store.banner;
    const style = {
      imgPrev: {
        position: 'absolute', // ****
        height: '25%',
        width: '25%',
        left: '70%',
        top: '38%',
      },             //  || || || |/|\| | |/||\| ||  /|\  ||  /|| |||| ||
      imageInput: { // || //// || //|\\ | \\||// || //|\\ || //|| //// ||
        top: '5%', //  || \\\\ || \\|// | //||\\ ||// | \\||// || \\\\ ||
        opacity: 0,
        left: '70%',
        width: '25%',
        height: '81%',
        cursor: 'pointer',
        position: 'absolute', // ****
      },
    };
    if (banner !== false && banner !== '') {
      divToRender = (
        <div>
          <img
            role="presentation"
            src={this.state.banner}
            style={style.imgPrev}
          />
          <input
            title="Drag and drop or Click to replace Banner"
            type="file"
            style={style.imageInput}
            onChange={e => this.handleStoreBannerChange(e)}
          />
        </div>);
    } else { // has a banner?
      divToRender = (
        <div>
          <input
            type="file"
            style={style.imageInput}
            onChange={e => this.handleStoreBannerChange(e)}
          />
          <img
            role="presentation"
            src={this.props.store.banner}
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
      editBtn: {
        position: 'absolute',
        left: '84%',
        top: '64%',
      },
      editImgBtn: {
        position: 'absolute',
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
        disabled={this.state.disabled}
        onTouchTap={e => this.handleSubmitEdit(e)}
      />,
    ];
    // handle character count
    const count = (200 - this.props.store.description.length);
    // This is the actual modal
    return (
      <div style={style.editBtn}>
        <FloatingActionButton
          zDepth={0}
          secondary
          mini
          onTouchTap={() => this.setState({ open: true })}
        >
          <ModeEdit />
        </FloatingActionButton>
        <Dialog
          title="Edit Store Information"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={(e) => this.handleClose(e)}
        >
          <div>
            { this.renderPreview() }
            { this.renderBannerPreview() }
            { this.renderCrop() }
            <TextField
              hintText="Name"
              floatingLabelText="Enter store Name"
              value={this.state.name}
              onChange={e => this.handleStoreNameChange(e)}
            /><br />
            <TextField
              hintText="Description"
              multiLine
              rows={2}
              floatingLabelText={`Characters left: ${(this.state.available || count)}`}
              errorText={'' || this.state.available <= -1 ? 'Exceeds Maximum Character Count' : ''}
              value={this.state.description}
              onChange={e => this.handleStoreDescriptionChange(e)}
            /><br />
            <TextField
              hintText="Slogan"
              floatingLabelText="Enter Store Slogan"
              value={this.state.slogan}
              onChange={e => this.handleStoreSloganChange(e)}
            /><br />
            <TextField
              hintText="Address"
              floatingLabelText="Enter Store Address"
              value={this.state.address}
              onChange={e => this.handleStoreAddressChange(e)}
            /><br />
          </div>
        </Dialog>
      </div>
    );
  }
}

