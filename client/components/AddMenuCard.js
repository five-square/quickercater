import React, { Component } from 'react';
import Card from 'material-ui/Card';
import CardTitle from 'material-ui/Card/CardTitle';
import CardActions from 'material-ui/Card/CardActions';
import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

export default class AddMenuCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hover: 2,
      expandable: false,
      style: this.props.style,
      open: false,
      newMenuTitle: '',
      newMenuDescription: '',
    };
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
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

  handleAddMenu() {
    this.setState({
      open: false,
    });
    this.props.addMenu({
      name: this.state.newMenuTitle,
      description: this.state.newMenuDescription,
    });
  }

  handleMenuTitleChange(e) {
    this.setState({
      newMenuTitle: e.currentTarget.value,
    });
  }

  handleMenuDescriptionChange(e) {
    this.setState({
      newMenuDescription: e.currentTarget.value,
    });
  }

  render() {
    const style = {
      floatingActionButton: {
        right: 20,
        bottom: 20,
        position: 'absolute',
      },
      cardActions: {
        position: 'relative',
        height: 30,
      },
    };
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={e => this.handleClose(e)}
      />,
      <FlatButton
        label="Submit"
        primary
        onTouchTap={e => this.handleAddMenu(e)}
      />,
    ];
    return (
      <div style={this.state.style}>
        <Paper zDepth={this.state.hover}>
          <Card
            onMouseEnter={e => this.handleOnMouseEnter(e)}
            onMouseLeave={e => this.handleOnMouseLeave(e)}
            // containerStyle={{ backgroundColor: '#e0e0e0' }}
          >
            <CardTitle
              title={'Add Menu'}
              actAsExpander
              showExpandableButton={false}
            />
            <CardActions style={style.cardActions}>
              <FloatingActionButton
                mini
                style={style.floatingActionButton}
                onTouchTap={e => this.handleOpen(e)}
              >
                <ContentAdd />
              </FloatingActionButton>
            </CardActions>
          </Card>
        </Paper>
        <div>
          <Dialog
            title="Add Menu"
            actions={actions}
            modal
            open={this.state.open}
          >
            <TextField
              id="menuTitle"
              hintText="Title"
              floatingLabelText="Enter Menu Title"
              value={this.state.newMenuTitle}
              onChange={e => this.handleMenuTitleChange(e)}
            /><br />
            <TextField
              id="menuDescription"
              hintText="Description"
              floatingLabelText="Enter Menu Description"
              value={this.state.newMenuDescription}
              onChange={e => this.handleMenuDescriptionChange(e)}
            /><br />
          </Dialog>
        </div>
        <br />
      </div>
    );
  }
}
