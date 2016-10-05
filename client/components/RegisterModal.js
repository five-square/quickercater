import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import ExpandTransition from 'material-ui/internal/ExpandTransition';

import OwnerAPI from '../models/ownerAPI';

export default class RegisterModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      dialogOpen: true,
      finished: false,
      stepIndex: 0,
      newStoreName: '',
      newStoreDescription: '',
      newStoreType: '',
      newStoreSlogan: '',
      newStoreAddress: '',
      newStoreLogo: 'http://i.imgur.com/GhWoMa1.png',
      newStoreBanner: 'http://i.imgur.com/GhWoMa1.png',
    };
  }

  handleOpen() {
    this.setState({ dialogOpen: true });
  }

  handleSubmit() {
    const newStoreInfo = {
      name: this.state.newStoreName,
      picture: this.state.newStoreLogo,
      address: this.state.newStoreAddress,
      slogan: this.state.newStoreSlogan,
      description: this.state.newStoreDescription,
      type: this.state.newStoreType,
      banner: this.state.newStoreBanner,
    };
    this.setState({ dialogOpen: false });
    OwnerAPI.createStore(newStoreInfo, this.props.ownerId).then(x => x);
    console.log('New Store created', newStoreInfo);
  }

  handleClose() {
    this.handleCancel();
  }

  handleCancel() {
    this.props.handleUnmountRegisterModal();
  }

  handleNext() {
    const loading = this.state.loading;
    const stepIndex = this.state.stepIndex;
    if (!loading) {
      this.setState({
        loading: false,
        stepIndex: stepIndex + 1,
        finished: stepIndex >= 4,
      });
    }
  }

  handlePrev() {
    const loading = this.state.loading;
    const stepIndex = this.state.stepIndex;
    if (!loading) {
      this.setState({
        loading: false,
        stepIndex: stepIndex - 1,
        newStoreName: this.state.newStoreName,
        newStoreSlogan: this.state.newStoreSlogan,
        newStoreDescription: this.state.newStoreDescription,
        newStoreType: this.state.newStoreType,
        newStoreAddress: this.state.newStoreAddress,
        newStoreLogo: this.state.newStoreLogo,
        newStoreBanner: this.state.newStoreBanner,
      });
    }
  }

  handleStoreNameChange(e) {
    this.setState({
      newStoreName: e.currentTarget.value,
    });
  }

  handleStoreDescriptionChange(e) {
    this.setState({
      newStoreDescription: e.currentTarget.value,
    });
  }

  handleStoreSloganChange(e) {
    this.setState({
      newStoreSlogan: e.currentTarget.value,
    });
  }

  handleStoreAddressChange(e) {
    this.setState({
      newStoreAddress: e.currentTarget.value,
    });
  }

  handleStoreTypeChange(e) {
    this.setState({
      newStoreType: e.currentTarget.value,
    });
  }

  handleStoreLogoChange(e) {
    const reader = new FileReader();
    const file = e.currentTarget.files[0];
    reader.onload = (a) => {
      this.setState({
        newStoreLogo: a.target.result,
      });
    };
    reader.readAsDataURL(file);
  }

  handleStoreBannerChange(e) {
    const reader = new FileReader();
    const file = e.currentTarget.files[0];
    reader.onload = (a) => {
      this.setState({
        newStoreBanner: a.target.result,
      });
    };
    reader.readAsDataURL(file);
  }

  renderLogoPreview() {
    let divToRender = '';
    const style = {
      imgPrev: {
        position: 'relative',
        top: '16%',
        left: '5%',
        width: '43%',
      },
      imageInput: {
        cursor: 'pointer',
        position: 'absolute',
        top: '-23%',
        left: '-127%',
        height: '150%',
        width: '200%',
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
    if (this.state.newStoreLogo !== false) {
      divToRender = (
        <div>
          <img
            role="presentation"
            src={this.state.newStoreLogo}
            style={style.imgPrev}
          />
          <input
            title="Drag and drop on the Square only or Click to Add"
            type="file"
            style={style.imageInput}
            onChange={e => this.handleStoreLogoChange(e)}
          />
        </div>);
    } else {
      divToRender = (
        <div>
          <input
            type="file"
            style={style.imageInput}
            onChange={e => this.handleStoreLogoChange(e)}
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

  renderBannerPreview() {
    let divToRender = '';
    const style = {
      imgPrev: {
        position: 'relative',
        top: '16%',
        left: '5%',
        width: '43%',
      },
      imageInput: {
        cursor: 'pointer',
        position: 'absolute',
        top: '-23%',
        left: '-4%',
        height: '161%',
        width: '200%',
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
    if (this.state.newStoreBanner !== false) {
      divToRender = (
        <div>
          <img
            role="presentation"
            src={this.state.newStoreBanner}
            style={style.imgPrev}
          />
          <input
            title="Drag and drop on the Square only or Click to Add"
            type="file"
            style={style.imageInput}
            onChange={e => this.handleStoreBannerChange(e)}
          />
        </div>);
    } else {
      divToRender = (
        <div>
          <input
            type="file"
            style={style.imageInput}
            onChange={e => this.handleStoreBannerChange(e)}
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

  renderSteps() {
    const style = {
      div: {
        position: 'relative',
        left: '2%',
      },
      p: {
        margin: 0,
      },
      textField: {
        marginTop: 0,
      },
      logo: {
        position: 'absolute',
        left: '18%',
        width: '45%',
      },
      banner: {
        position: 'relative',
        left: '52%',
        width: '45%',
      },
      cursor: 'pointer',
    };
    switch (this.state.stepIndex) {
      case 0:
        return (
          <p>
            Welcome to QuickerCater, Let's start making your profile.
          </p>
        );
      case 1:
        return (
          <div className="newStoreName">
            <div style={style.div}>
              <p style={style.p}>
                Please enter your store Name.
              </p>
              <TextField
                style={style.textField}
                floatingLabelText="Enter Store Name"
                onChange={e => this.handleStoreNameChange(e)}
              />
            </div>
            <div className="newStoreAddress" style={style.div}>
              <p style={style.p}>
                Please enter your stores Address.
              </p>
              <TextField
                multiLine
                style={style.textField}
                rows={2}
                rowsMax={2}
                floatingLabelText="Enter Store Address"
                onChange={e => this.handleStoreAddressChange(e)}
              />
            </div>
            <div className="newStoreType" style={style.div}>
              <p style={style.p}>
                Please enter a category for your Store.
              </p>
              <TextField
                multiLine
                style={style.textField}
                floatingLabelText="Enter Category"
                onChange={e => this.handleStoreTypeChange(e)}
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="newStoreDescription">
            <div style={style.div}>
              <p style={style.p}>
                Tell us about your store.
              </p>
              <TextField
                multiLine
                style={style.textField}
                rows={2}
                rowsMax={4}
                floatingLabelText="Enter Store Description"
                onChange={e => this.handleStoreDescriptionChange(e)}
              />
            </div>
            <div style={style.div}>
              <p style={style.p}>
                Please enter your store Slogan.
              </p>
              <TextField
                style={style.textField}
                floatingLabelText="Enter Store Slogan"
                onChange={e => this.handleStoreSloganChange(e)}
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="ImagePreviews">
            <div className="newStoreLogo" style={style.logo}>
              <p style={style.p}>
                Upload your Store Logo
              </p>
              <span>
                {this.renderLogoPreview()}
              </span>
            </div>
            <div className="newStoreBanner" style={style.banner}>
              <p style={style.p}>
                Upload a Store Banner
              </p>
              <span>
                {this.renderBannerPreview()}
              </span>
            </div>
          </div>
        );
      case 4:
        return (
          <div>
            <p>
              Great! Your store is being created lets work on your menus.
            </p>
          </div>
        );
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }

  renderButtons() {
    const { stepIndex } = this.state;
    const style = {
      position: 'absolute',
      top: '85%',
    };
    return (
      <div style={style}>
        <FlatButton
          label="Back"
          disabled={stepIndex === 0}
          onTouchTap={e => this.handlePrev(e)}
          style={{ marginRight: 12 }}
        />
        {this.state.stepIndex === 4
          ?
          <RaisedButton
            secondary
            label={'Finish'}
            onTouchTap={e => this.handleSubmit(e)}
          />
          :
          <RaisedButton
            primary
            label={'Next'}
            onTouchTap={e => this.handleNext(e)}
          />
        }
      </div>
    );
  }

  renderContent() {
    const { stepIndex } = this.state;
    return (
      <div>
        <div>{this.renderSteps(stepIndex)}</div>
        <br />
      </div>
    );
  }

  renderStepper() {
    return (
      <div style={{ width: '100%', maxWidth: 700, margin: 'auto' }}>
        <Stepper activeStep={this.state.stepIndex}>
          <Step>
            <StepLabel>Welcome</StepLabel>
          </Step>
          <Step>
            <StepLabel>Enter Store Info</StepLabel>
          </Step>
          <Step>
            <StepLabel>More Store Info</StepLabel>
          </Step>
          <Step>
            <StepLabel>Images</StepLabel>
          </Step>
          <Step>
            <StepLabel>Submit</StepLabel>
          </Step>
        </Stepper>
        <ExpandTransition loading={this.state.loading} open>
          {this.renderContent()}
        </ExpandTransition>
      </div>
    );
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        keyboardFocused
        onTouchTap={e => this.handleCancel(e)}
      />,
    ];
    const style = {
      position: 'absolute',
    };

    return (
      <div style={style}>
        <div>
          <RaisedButton primary label="Register" onTouchTap={e => this.handleOpen(e)} />
          <Dialog
            title="Register"
            actions={actions}
            modal={false}
            open={this.state.dialogOpen}
            onRequestClose={(e) => this.handleClose(e)}
          >
            {this.renderStepper()}
            {this.renderButtons()}
          </Dialog>
        </div>
      </div>
    );
  }
}

