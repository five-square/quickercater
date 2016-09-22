import React, { Component } from 'react';
// import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Lobby from './Lobby';
import StoreFront from './StoreFront';
import Server from '../models/serverAPI';
import Navigation from './Navigation';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      owners: [],
      currentOwnerId: false,
      currentStoreName: 'Welcome to QuickerCater',
      showStore: false,
    };
  }

  componentWillMount() {
    Server.getAllOwners()
    .then(owners => {
      this.setState({ owners });
    });
  }

  selectStore(storeId, storeName) {
    Server.getOwnerByStoreId(storeId)
    .then(owner => {
      this.setState({
        currentOwnerId: owner.id,
        currentStoreName: `Welcome to ${storeName}`,
        showStore: true,
      });
    });
  }

  handleBackClick() {
    this.setState({
      showStore: false,
      currentStoreName: 'Welcome to QuickerCater',
    });
  }
        // muiTheme={getMuiTheme(darkBaseTheme)}>

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <Navigation title={this.state.currentStoreName} goBack={e => this.handleBackClick(e)} />
            { this.state.showStore
              ? <StoreFront ownerId={this.state.currentOwnerId} />
              : <Lobby selectStore={(id, name) => this.selectStore(id, name)} />
            }
          </div>
        </MuiThemeProvider>
      </div>
  );
  }
}

