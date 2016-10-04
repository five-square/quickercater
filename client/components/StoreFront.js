import React, { Component } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';
import MenuContainer from './MenuContainer';
import OrderAPI from '../models/orderAPI';
import Owner from '../models/ownerAPI';
import Dashboard from './Dashboard';
import PackageContainer from './PackageContainer';
// import StoreDescription from './StoreDescription';

export default class StoreFront extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      openItemBank: false,
      store: this.props.store,
      packages:[],
    };
    this.toggleEditing = e => this.handleToggleEditing(e);
  }

  handleToggleEditing() {
    this.setState({
      editing: !this.state.editing,
      openItemBank: !this.state.openItemBank,
    });
  }
  // <StoreDescription
  //   ownerId={this.props.ownerId}
  //   editing={this.state.editing}
  //   store={this.state.store}
  //   handleEditStore={e => this.handleEditStore(e)}
  // /><br />
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

  handleEditStore(setStore) {
    Owner.updateStore(setStore)
    .then((store) => {
      this.setState({ store });
    });
  }

  updatePackagesByOwner(packages) {
    this.setState({ packages });
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
      dashboard: {
        width: '80%',
        flex: '50%',
        marginTop: '2%',
        marginBottom: '2%',
        marginLeft: 'auto',
        marginRight: 'auto',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      },
      paper: {
        width: '80%',
        flex: '50%',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingBottom: '2%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      },
    };

    return (
      <div className="StoreFront" >
        {this.props.showDashboard
        ? <Dashboard
          style={style.dashboard}
          ownerId={this.props.ownerId}
          storeName={this.props.store.name}
          toggleEditing={this.toggleEditing}
        />
        : null
      }
        <Paper zDepth={2} style={style.paper}>
          <Tabs style={style.tabs}>
            <Tab label="Packages"><br />
              <PackageContainer
                ownerId={this.props.ownerId}
                editing={this.state.editing}
                updatePackagesByOwner={e => this.updatePackagesByOwner(e)}
              /><br />
            </Tab>
            <Tab label="Menu"><br />
              <MenuContainer
                title={this.props.store.name}
                style={style.menuCards}
                ownerId={this.props.ownerId}
                addItemToOrder={this.props.addItemToOrder}
                editing={this.state.editing}
                packages={this.state.packages}
              />
            </Tab>
          </Tabs>
        </Paper>
      </div>
    );
  }
}
