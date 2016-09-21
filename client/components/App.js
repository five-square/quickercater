import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Lobby from './Lobby';
import StoreFront from './StoreFront';
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
      this.setState({ owners });
    });
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <Lobby />
            <StoreFront />
          </div>
        </MuiThemeProvider>
      </div>
  );
  }
}

