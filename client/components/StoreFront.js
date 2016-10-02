import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import MenuContainer from './MenuContainer';
import OrderAPI from '../models/orderAPI';
import Dashboard from './Dashboard';
import PackageContainer from './PackageContainer';
// import Owner from '../models/ownerAPI';
// import StoreDescription from './StoreDescription';

export default class StoreFront extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // ownerId: this.props.ownerId,
      // store: this.props.store,
      editing: false,
      openItemBank: false,
    };
  }

  fetchPendingOrders(ownerId) {
    OrderAPI.fetchPendingOrders(ownerId).then(resp => {
      this.setState({ pendingOrders: resp });
    });
  }

  fetchAcceptedOrders(ownerId) {
    OrderAPI.fetchAcceptedOrders(ownerId).then(resp => {
      this.setState({ acceptedOrders: resp });
    });
  }

        // <StoreDescription
        //   ownerId={this.state.ownerId}
        //   store={this.state.store}
        // />

  render() {
    const style = {
      menuCards: {
        width: '95%',
        flex: '50%',
        marginTop: '2%',
        marginBottom: '2%',
        marginLeft: 'auto',
        marginRight: 'auto',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      },
    };

    return (
      <div className="StoreFront" >
        <RaisedButton
          label={`Editing ${this.state.editing ? 'On' : 'Off'}`}
          primary onClick={() => this.setState({
            editing: !this.state.editing,
            openItemBank: !this.state.openItemBank,
          })}
        />
        <Dashboard
          style={style}
          ownerId={this.props.ownerId}
          storeName={this.props.store.name}
        />
        <PackageContainer
          ownerId={this.props.ownerId}
          editing={this.state.editing}
        /><br />
        <MenuContainer
          title={this.props.store.name}
          style={style.menuCards}
          ownerId={this.props.ownerId}
          addItemToOrder={this.props.addItemToOrder}
          editing={this.state.editing}
        />
      </div>
    );
  }
}
