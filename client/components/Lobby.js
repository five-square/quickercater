import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
// import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
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
    this.openMenu = (e) => this.handleOpenMenu(e);
    this.closeMenu = () => this.handleCloseMenu();
    this.selectSearchOption = (e) => this.handleSelectSearchOption(e);
  }

  handleOpenMenu(event) {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  }

  handleCloseMenu() {
    this.setState({
      open: false,
    });
  }

  handleChangeSearchValue(e) {
    this.setState({
      searchValue: e.currentTarget.value,
    });
  }

  handleSelectSearchOption(choice) {
    let hint = 'Caterer';
    if (choice === 'type') {
      hint = 'Category';
    }
    this.setState({
      searchBy: choice,
      searchHint: hint,
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
        width: '100%',
      },
    };

    return (
      <div className="Lobby">
        <div style={style.searchBar}>
          <TextField
            style={{ width: '78%', marginRight: '2%' }}
            inputStyle={style.searchText}
            hintText={`Search by ${this.state.searchHint}`}
            value={this.state.searchValue}
            onChange={this.changeSearchValue}
          />
          <RaisedButton
            style={{ width: '20%', textAlign: 'center' }}
            primary
            onTouchTap={this.openMenu}
            label="Options"
          />
          <Popover
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            targetOrigin={{ horizontal: 'left', vertical: 'top' }}
            onRequestClose={this.closeMenu}
          >
            <MenuItem
              key={1}
              value={'name'}
              primaryText="Search by Name"
              onTouchTap={() => this.selectSearchOption('name')}
            />
            <MenuItem
              key={2}
              value={'type'}
              primaryText="Search by Category"
              onTouchTap={() => this.selectSearchOption('type')}
            />
          </Popover>
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

