import React, { Component } from 'react';

import StoreCard from './StoreCard';

import Server from '../models/serverAPI';

export default class Lobby extends Component {
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
      <div className="Lobby" >
        <h1>Welcome!</h1>
        { this.state.owners.map((e) =>
          <StoreCard key={e._id} owners={e.properties} />
        )}
      </div>
  );
  }
}

