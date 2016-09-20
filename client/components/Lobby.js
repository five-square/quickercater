import React, { Component } from 'react';

import StoreCard from './StoreCard';

export default class Lobby extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div className="Lobby" >
        <h1>Welcome!</h1>
        <StoreCard />
      </div>
  );
  }
}

