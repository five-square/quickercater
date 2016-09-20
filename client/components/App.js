import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import UserList from '../containers/user-list';
import UserDetail from '../containers/user-detail';
import NewUserDisplay from '../containers/newUser-display';
import Lobby from './Lobby';
import Server from '../models/serverAPI';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      owners: [],
    };
  }

  componentWillMount() {
    Server.getAllOwners()
    .then(owners => {
      console.log('heyyyy');
      this.setState({ owners });
    });
  }

  handleClick(e) {
    console.log(e.currentTarget.key);
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <Lobby />
        </MuiThemeProvider>
        <h2>User List:</h2>
        <ul>
          {
            this.state.owners.map((e) => {
              const id = e._id;
              return <li key={id} onClick={e => this.handleClick(e)}>{`${e.properties.name} has an ID of ${e._id}`}</li>
            }
            )
          }
        </ul>
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

