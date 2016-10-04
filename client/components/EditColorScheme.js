import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import ColorPicker from './ColorPicker';

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
export default class EditColorScheme extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openDialog: this.props.open,
      hover: 2,
      name: this.props.name,
      description: this.props.description,
      price: this.props.price,
      picture: this.props.picture,
    };
    this.close = e => this.handleClose(e);
    this.open = e => this.handleOpen(e);
  }

  componentWillReceiveProps(newProps) {
    this.setState({ newProps });
  }

  handleOpen() {
    console.log('hey');
    this.props.closeMenuOpenDialog();
    this.setState({ openDialog: true });
  }

  handleClose() {
    this.setState({ openDialog: false });
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={this.close}
      />,
      <FlatButton
        label="Submit"
        primary
        keyboardFocused
        onTouchTap={this.open}
      />,
    ];

    return (
      <div>
        <MenuItem primaryText="Edit Color Scheme" onTouchTap={this.open} />
        {this.props.open
          ? <Dialog
            title="Dialog With Actions"
            actions={actions}
            modal={false}
            open={this.state.openDialog}
            onRequestClose={this.close}
          >
            <ColorPicker />
          </Dialog>
          : null
        }
      </div>
    );
  }
}
