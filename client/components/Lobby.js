import React, { Component } from 'react';
import StoreCard from './StoreCard';
import Server from '../models/serverAPI';

export default class Lobby extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stores: this.props.stores || [],
    };
  }

  render() {
    const style = {
      width: '60%',
      flex: '50%',
      marginLeft: 'auto',
      marginRight: 'auto',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    };
    return (
      <div className="Lobby" >
        { this.props.stores.map((e, i) =>
          <StoreCard
            key={i}
            id={e._id}
            style={style}
            stores={e.properties}
            selectStore={this.props.selectStore}
          />
        )}
      </div>
    );
  }
}

