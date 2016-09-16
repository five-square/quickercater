import React, { Component } from 'react';
import UserList from '../containers/user-list';
import UserDetail from '../containers/user-detail';
import NewUserDisplay from '../containers/newUser-display';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div>
        <h2>User List:</h2>
        <UserList />
        <hr />
        <h2>User Details:</h2>
        <UserDetail />
        <h2>New user:</h2>
        <NewUserDisplay />
      </div>
  );
  }
}

