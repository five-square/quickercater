import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Tabs, Tab } from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';
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
      editing: false,
      openItemBank: false,
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
              /><br />
            </Tab>
            <Tab label="Menu"><br />
              <MenuContainer
                title={this.props.store.name}
                style={style.menuCards}
                ownerId={this.props.ownerId}
                addItemToOrder={this.props.addItemToOrder}
                editing={this.state.editing}
              />
            </Tab>
          </Tabs>
        </Paper>
      </div>
    );
  }
}
