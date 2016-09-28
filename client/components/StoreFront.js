import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import MenuContainer from './MenuContainer';
import PackageCard from './PackageCard';
import OrderAPI from '../models/orderAPI';
import Dashboard from './Dashboard';
import StoreDescription from './StoreDescription';
import PackageAPI from '../models/packageAPI';
import Owner from '../models/ownerAPI';
import AddPackageCard from './AddPackageCard';

export default class StoreFront extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ownerId: this.props.ownerId,
      store: this.props.store,
      menus: [],
      packages: [],
      editing: false,
      openItemBank: false,
    };
  }

  componentWillMount() {
    PackageAPI.getAllPackages(this.state.ownerId)
    .then(packages => {
      this.setState({
        packages,
      });
    });
    this.fetchPendingOrders(this.state.ownerId);
    this.fetchAcceptedOrders(this.state.ownerId);
  }

  showMenus() {
    Owner.getMenus(this.state.ownerId)
    .then(menus => {
      this.setState({ menus });
    });
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

  showPackages() {
    PackageAPI.getAllPackages(this.state.ownerId)
    .then(packages => {
      this.setState({ packages });
    });
  }

  handleAddPackage(pkg) {
    const newPackage = Object.assign({}, pkg, {
      order: this.state.packages.length,
      ownerId: this.state.ownerId,
    });
    PackageAPI.create(newPackage)
    .then(() => {
      this.showPackages();
    });
  }

        // <div className="CateringOptions">
        //   {this.state.packages.map((pack, index) =>
        //     <PackageCard
        //       style={style}
        //       key={index}
        //       ownerId={this.state.ownerId}
        //       pack={pack}
        //     />
        //   )}
        //   {this.state.editing
        //     ? <AddPackageCard key={this.state.packages.length} />
        //     : null
        //   }
        // </div>
        // <StoreDescription
        //   ownerId={this.state.ownerId}
        //   store={this.state.store}
        // />

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

        <RaisedButton
          label={`Editing ${this.state.editing ? 'On' : 'Off'}`}
          primary onClick={() => this.setState({
            editing: !this.state.editing,
            openItemBank: !this.state.openItemBank,
          })}
        />
        <Dashboard
          style={style}
          ownerId={this.state.ownerId}
          pendingOrders={this.state.pendingOrders}
          acceptedOrders={this.state.acceptedOrders}
          fetchPendingOrders={e => this.fetchPendingOrders(e)}
          fetchAcceptedOrders={e => this.fetchAcceptedOrders(e)}
        />
        <div className="CateringOptions">
          {this.state.packages.map((pack, index) =>
            <PackageCard
              style={style}
              key={index}
              ownerId={this.state.ownerId}
              pack={pack}
            />
          )}
          {this.state.editing
            ? <AddPackageCard
              key={this.state.packages.length + 1}
              addPackage={e => this.handleAddPackage(e)}
            />
            : null
          }
        </div>
        <h1>Edit Yo Menu</h1>
        <MenuContainer
          style={style}
          ownerId={this.state.ownerId}
          menus={this.state.menus}
          addItemToOrder={this.props.addItemToOrder}
          editing={this.state.editing}
        />
      </div>
    );
  }
}
