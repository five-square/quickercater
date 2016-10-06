import React, { Component } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MenuContainer from './MenuContainer';
import OrderAPI from '../models/orderAPI';
import Owner from '../models/ownerAPI';
import Dashboard from './Dashboard';
import PackageContainer from './PackageContainer';
import StoreDescription from './StoreDescription';

export default class StoreFront extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      openItemBank: false,
      store: this.props.store,
      packages: [],
      muiTheme: null,
      colorTheme: this.props.colorTheme,
      // {
      //   palette: {
      //     primary1Color: '#af521c', // primary buttons and appbars
      //     primary2Color: '#622806',
      //     accent1Color: '#5cffff', // secondary buttons and slider indicators
      //     accent2Color: '#006262', // toolbars, table highlight color
      //     accent3Color: '#fb8641', // table header text color
      //     borderColor: '#622806', // dividers
      //     canvasColor: '#006262', // all paper and cards
      //     shadowColor: '#000000', // hover shadows
      //     textColor: '#000000', // text color
      //     alternateTextColor: '#006262', // text color in app/tab bars, buttons, and chips
      //   },
      // },
    };
    // this.muiTheme = null;
    this.toggleEditing = e => this.handleToggleEditing(e);
    this.changeTheme = e => this.handleChangeTheme(e);
  }

  componentWillMount() {
    // this.muiTheme = getMuiTheme(this.state.colorTheme);
    this.setState({
      muiTheme: getMuiTheme(this.state.colorTheme),
    });
  }

  handleToggleEditing() {
    this.setState({
      editing: !this.state.editing,
      openItemBank: !this.state.openItemBank,
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

  handleEditStore(setStore) {
    console.log('in StoreFront handleEditStore before db call: ', setStore);
    Owner.updateStore(setStore, this.props.ownerIdOfCurrentStore)
    .then((store) => {
      console.log('in StoreFront handleEditStore after db call: ', store);
      this.setState({ store });
    });
  }

  updatePackagesByOwner(packages) {
    this.setState({ packages });
  }

  handleChangeTheme(newTheme) {
    console.log('in StoreFront handleChangeTheme: ', newTheme);
    // this.muiTheme = getMuiTheme(newTheme);
    this.setState({
      muiTheme: getMuiTheme(newTheme),
      colorTheme: newTheme,
    });
  }

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
      <MuiThemeProvider muiTheme={this.state.muiTheme}>
        <div className="StoreFront" >
          {this.props.showDashboard
          ? <Dashboard
            style={style.dashboard}
            ownerId={this.props.ownerIdOfCurrentStore}
            storeName={this.props.store.name}
            toggleEditing={this.toggleEditing}
            colorTheme={this.state.colorTheme}
            changeTheme={this.changeTheme}
          />
          : null
        }
          <StoreDescription
            ownerId={this.props.ownerId}
            editing={this.state.editing}
            store={this.state.store}
            handleEditStore={e => this.handleEditStore(e)}
          /><br />
          <Paper zDepth={2} style={style.paper}>
            <Tabs style={style.tabs}>
              <Tab label="Menu"><br />
                <MenuContainer
                  title={this.props.store.name}
                  style={style.menuCards}
                  ownerId={this.props.ownerIdOfCurrentStore}
                  addItemToOrder={this.props.addItemToOrder}
                  editing={this.state.editing}
                  packages={this.state.packages}
                />
              </Tab>
              <Tab label="Packages"><br />
                <PackageContainer
                  ownerId={this.props.ownerIdOfCurrentStore}
                  editing={this.state.editing}
                  updatePackagesByOwner={e => this.updatePackagesByOwner(e)}
                /><br />
              </Tab>
            </Tabs>
          </Paper>
        </div>
      </MuiThemeProvider>
    );
  }
}
