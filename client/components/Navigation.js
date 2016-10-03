import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';

export default class Navigation extends Component {

 // Owners can login without a current store and we need to figure out what to do with them
 // What should the login button say? where should they be redirected?

  constructor(props) {
    super(props);
    this.state = {
      value: 3,
    };
  }

  handleChange(event, index, value) {
    this.setState({ value });
  }

  handleBackClick() {
    this.props.goBack();
  }

  signInWithGoogle() {
    window.location.href = '/auth/google';
  }

  signOut() {
    window.location.href = '/api/auth/logout';
  }

  handleViewCart() {
    this.props.viewCart();
  }

  render() {
    return (
      <div id="Toolbar">
        <Toolbar>
          <ToolbarGroup>
            <ToolbarTitle text={this.props.title} />
          </ToolbarGroup>
          <ToolbarGroup>
            {this.props.inStore
              ? <RaisedButton
                label="Back to Lobby"
                primary onClick={e => this.handleBackClick(e)}
              />
              : null
            }
            <RaisedButton label="View Cart" primary onClick={e => this.handleViewCart(e)} />
            {this.props.loggedIn
              ? this.props.myStore
                ? <RaisedButton
                  label="MyStore"
                  primary
                  onClick={() => this.props.goToMyStore(
                  Object.assign({}, this.props.myStore.properties, { id: this.props.myStore._id })
                )}
                />
                : <RaisedButton
                  label="MyStore"
                  primary
                  onClick={this.props.openRegisterModal}
                />
              : <RaisedButton
                label="Login"
                primary
                onClick={e => this.signInWithGoogle(e)}
              />
            }
            <RaisedButton label="Logout" primary onClick={e => this.signOut(e)} />
          </ToolbarGroup>
        </Toolbar>
        <br />
      </div>
    );
  }
}
