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
      this.setState({ stores });
    });
  }
  render() {
    const style = {
      width: 60 + '%',
      flex: 50 + '%',
      marginLeft: 'auto',
      marginRight: 'auto',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    };
    return (
      <div className="Lobby" >
        <h1>Welcome!</h1>
        { this.state.stores.map((e) =>
          <StoreCard key={e._id} style={style} stores={e.properties} />
        )}
      </div>
  );
  }
}

