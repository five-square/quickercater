import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import StoreCard from './StoreCard';
// import Server from '../models/serverAPI';

export default class Lobby extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
    };
    this.changeSearchValue = e => this.handleChangeSearchValue(e);
  }

  handleChangeSearchValue(e) {
    this.setState({
      searchValue: e.currentTarget.value,
    });
  }

  render() {
    const style = {
      searchBar: {
        width: '40%',
        flex: '50%',
        marginLeft: 'auto',
        marginRight: 'auto',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px solid black',
        borderRadius: 4,
        marginBottom: 10,
        backgroundColor: 'white',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 0,
        paddingBottom: 2,
      },
      storeCards: {
        width: '60%',
        flex: '50%',
        marginLeft: 'auto',
        marginRight: 'auto',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      },
    };
    return (
      <div className="Lobby">
        <div style={style.searchBar}>
          <TextField
            fullWidth
            hintText="Search by Caterer"
            value={this.state.searchValue}
            onChange={this.changeSearchValue}
          /><br />
        </div>
        { this.props.stores
            .filter(store =>
              store.properties.name.toLowerCase()
                .includes(this.state.searchValue.toLowerCase()))
            .map((e, i) =>
              <StoreCard
                key={i}
                id={e._id}
                style={style.storeCards}
                store={e.properties}
                selectStore={this.props.selectStore}
              />
        )}
      </div>
    );
  }
}

