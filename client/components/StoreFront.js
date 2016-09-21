import React, { Component } from 'react';

import MenuCard from './MenuCard';

import Server from '../models/serverAPI';

export default class StoreFront extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ownerId: 1090,
      menus: [],
    };
  }
  componentWillMount() {
    Server.getMenusByOwner(this.state.ownerId)
    .then(menus => {
      console.log(menus);
      this.setState({ menus });
    });
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
      <div className="StoreFront" >
        <h1>Edit Yo Menu</h1>
        { this.state.menus.map((e, i) =>
          <MenuCard key={i} style={style} menu={e} />
          )
        }
        )}
      </div>
  );
  }
}
