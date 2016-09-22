import React, { Component } from 'react';
// import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
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
        // muiTheme={getMuiTheme(darkBaseTheme)}>

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

