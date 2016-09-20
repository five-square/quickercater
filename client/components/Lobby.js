import React, { Component } from 'react';

import StoreCard from './StoreCard';

import Server from '../models/serverAPI';

export default class Lobby extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stores: [],
    };
  }
  componentWillMount() {
    Server.getAllStores()
    .then(stores => {
      console.log('Stores in CWM: ', stores);
      this.setState({ stores });
    });
  }
  render() {
    return (
      <div className="Lobby" >
        <h1>Welcome!</h1>
        { this.state.stores.map((e) =>
          <StoreCard key={e._id} stores={e.properties} />
        )}
      </div>
  );
  }
}

