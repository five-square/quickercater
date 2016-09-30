import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

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
      newStoreSlogan: '',
      newStoreAddress: '',
      newStoreLogo: 'https://ssl.gstatic.com/images/branding/product/1x/avatar_circle_blue_512dp.png',
    };
  }

  handleOpen() {
    this.setState({ dialogOpen: true });
  }

  handleSubmit() {
   var ownerId = this.props.ownerId;
    const newStoreInfo = {
      name: this.state.newStoreName,
      description: this.state.newStoreDescription,
      slogan: this.state.newStoreSlogan,
      address: this.state.newStoreAddress,
      logo: this.state.newStoreLogo,
    };
    this.setState({ dialogOpen: false });
    
    // create store node and link to owner.

    console.log('New Store created', newStoreInfo);
  }

  handleCancel() {
    this.setState({
      dialogOpen: false,
      stepIndex: 0,
      newStoreName: '',
      newStoreSlogan: '',
      newStoreDescription: '',
      newStoreAddress: '',
      newStoreLogo: 'https://ssl.gstatic.com/images/branding/product/1x/avatar_circle_blue_512dp.png',
    });
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
        newStoreAddress: this.state.newStoreAddress,
        newStoreLogo: this.state.newStoreLogo,
      });
    }
  }

  handleClose(){
    console.log('clickaway attempted');
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



  handleStoreLogoChange(e) {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.currentTarget.files[0];
    reader.onload = (a) => {
      this.setState({
        newStoreLogo: a.target.result,
      });
    };
    reader.readAsDataURL(file);
  }

  renderPreview() {
    let divToRender = '';
    const imgPrev = {
      height: '100%',
      width: '100%',
    };
    if (this.state.newItemPicture !== false) {
      divToRender = (
        <img
          role="presentation"
          src={this.state.newStoreLogo}
          style={imgPrev}
        />);
    } else {
      divToRender = (
        <img
          role="presentation"
          src={'https://ssl.gstatic.com/images/branding/product/1x/avatar_circle_blue_512dp.png'}
          style={imgPrev}
        />);
    }
    return divToRender;
  }

  renderSteps() {
    const styleInput = {
      cursor: 'pointer',
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      width: '100%',
      opacity: 0,
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
          <div>
            <div style={{ float: 'left', marginLeft: '2%', marginTop: '3%', marginRight: '10%' }}>
              <p>
                Please enter your store name.
              </p>
              <TextField
                value={this.state.newStoreName}
                style={{ marginTop: 0 }}
                floatingLabelText="Enter Store Name"
                onChange={e => this.handleStoreNameChange(e)}
              />
            </div>
            <div style={{ float: 'right', marginBottom: '3%', marginTop: '3%' }}>
              <p>
                Please enter your store Slogan.
              </p>
              <TextField
                value={this.state.newStoreSlogan}
                style={{ marginTop: 0 }}
                floatingLabelText="Enter Store Slogan"
                onChange={e => this.handleStoreSloganChange(e)}
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <div style={{ float: 'left', marginRight: '10%' }}>
              <p>
                Tell us about your store.
              </p>
              <TextField
                value={this.state.newStoreDescription}
                multiLine
                style={{ marginTop: 0 }}
                rows={2}
                rowsMax={4}
                floatingLabelText="Enter Store Description"
                onChange={e => this.handleStoreDescriptionChange(e)}
              />
            </div>
            <div style={{ float: 'right' }}>
              <p>
                Please enter your stores Address.
              </p>
              <TextField
                value={this.state.newStoreAddress}
                multiLine
                style={{ marginTop: 0 }}
                rows={2}
                rowsMax={2}
                floatingLabelText="Enter Store Address"
                onChange={e => this.handleStoreAddressChange(e)}
              />
            </div>
            <FlatButton
              style={{ float: 'right' }}
              label="Choose an Image"
              labelPosition="before"
            >
              <input
                type="file"
                style={styleInput}
                onChange={e => this.handleStoreLogoChange(e)}
              />
            </FlatButton>
          </div>
        );
      case 3:
        return (
          <div style={{ width: '100%', height: '100%' }}>
            <Table selectable={false} bodyStyle={{ width: '100%' }}>
              <TableHeader displaySelectAll={false}>
                <TableRow>
                  <TableHeaderColumn
                    colSpan="3"
                    style={{ textAlign: 'center' }}
                  >
                  Lets Review your Info
                  </TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn>Store Name</TableHeaderColumn>
                  <TableHeaderColumn>Store Description</TableHeaderColumn>
                  <TableHeaderColumn>Store Slogan</TableHeaderColumn>
                  <TableHeaderColumn>Store Address</TableHeaderColumn>
                  <TableHeaderColumn>Store Logo</TableHeaderColumn>
                </TableRow>
                <TableRow style={{ wordWrap: 'break-word', paddingLeft: 0, paddingRight: 0 }}>
                  <TableRowColumn style={{ whiteSpace: 'normal' }}>
                    {this.state.newStoreName}
                  </TableRowColumn>
                  <TableRowColumn style={{ whiteSpace: 'normal' }}>
                    {this.state.newStoreDescription}
                  </TableRowColumn>
                  <TableRowColumn style={{ whiteSpace: 'normal' }}>
                    {this.state.newStoreSlogan}
                  </TableRowColumn>
                  <TableRowColumn style={{ whiteSpace: 'normal' }}>
                    {this.state.newStoreAddress}
                  </TableRowColumn>
                  <TableRowColumn style={{ whiteSpace: 'normal' }}>
                    {this.renderPreview()}
                  </TableRowColumn>
                </TableRow>
              </TableBody>
            </Table>
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

  renderContent() {
    const { stepIndex } = this.state;
    const contentStyle = { margin: '0 16px', overflow: 'hidden' };

    return (
      <div style={contentStyle}>
        <div>{this.renderSteps(stepIndex)}</div>
        <br />
        <div style={{ marginTop: 24, marginBottom: 12 }}>
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
            <StepLabel>Review</StepLabel>
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
    // action buttons for Modal
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        keyboardFocused
        onTouchTap={e => this.handleCancel(e)}
      />,
    ];
    // This is the actual modal
    return (
      <div>
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
          </Dialog>
        </div>
      </div>
    );
  }
}

