import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import StoreCard from './StoreCard';

export default class Lobby extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      searchBy: 'name',
      searchHint: 'Caterer',
    };
    this.changeSearchValue = e => this.handleChangeSearchValue(e);
    this.selectType = (e, i, v) => this.handleSearchType(e, i, v);
  }

  handleChangeSearchValue(e) {
    this.setState({
      searchValue: e.currentTarget.value,
    });
  }

  handleSearchType(e, i, v) {
    let hint = 'Caterer';
    if (v === 'type') {
      hint = 'Category';
    }
    this.setState({
      searchBy: v,
      searchHint: hint,
    });
    console.log('This state name test: ', this.state.searchBy);
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
        height: 'inherit',
        width: '60%',
        flex: '50%',
        marginLeft: 'auto',
        marginRight: 'auto',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
      },
      searchDrop: {
        height: 4,
        align: 'right',
      },
      searchText: {
        width: '50%',
      },
    };
    return (
      <div className="Lobby">
        <div style={style.searchBar}>
          <TextField
            style={{ width: '50%' }}
            inputStyle={style.searchText}
            hintText={`Search by ${this.state.searchHint}`}
            value={this.state.searchValue}
            onChange={this.changeSearchValue}
          />
          <DropDownMenu
            autoWidth
            value={this.state.searchBy}
            onChange={this.selectType}
            underlineStyle={style.searchDrop}
          >
            <MenuItem key={1} value={'name'} primaryText="Search By Name" />
            <MenuItem key={2} value={'type'} primaryText="Search By Category" />
          </DropDownMenu>
        </div>
        { this.props.stores
          .filter(store =>
            store[this.state.searchBy].toLowerCase()
              .includes(this.state.searchValue.toLowerCase()))
          .sort((a, b) =>
            (a[this.state.searchBy] > b[this.state.searchBy] ? 1 : -1))
          .map((e, i) =>
            <StoreCard
              key={i}
              id={e.id}
              style={style.storeCards}
              store={e}
              selectStore={this.props.selectStore}
            />
          )
        }
      </div>
    );
  }
}

