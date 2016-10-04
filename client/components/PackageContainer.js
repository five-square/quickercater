import React, { Component } from 'react';
import PackageAPI from '../models/packageAPI';
import PackageSlider from './PackageSlider';
import EditPackage from './EditPackage';
import AddPackageCard from './AddPackageCard';

export default class PackageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ownerId: this.props.ownerId,
      packages: [],
    };
  }

  componentWillMount() {
    PackageAPI.getAllPackages(this.props.ownerId)
    .then(packages => {
      console.log('in PackageContainer: packages: ', packages);
      this.props.updatePackagesByOwner(packages);
      this.setState({
        packages,
      });
    });
  }

  showPackages() {
    PackageAPI.getAllPackages(this.props.ownerId)
    .then(packages => {
      this.setState({ packages });
    });
  }

  handleAddPackage(pkg) {
    PackageAPI.create(pkg)
    .then(() => {
      this.showPackages();
    });
  }

  handleDeletePackage(packId) {
    PackageAPI.delete(packId, packId.ownerId)
    .then(() => {
      this.showPackages();
    });
  }

  handleEditPackage(pack) {
    console.log('Pack to update and pack', pack);
    PackageAPI.update(pack, pack.id)
    .then(() => {
      this.showPackages();
    });
  }

  render() {
    const style = {
      card: {
        width: '60%',
        margin: 10,
        marginTop: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center',
        position: 'relative',
        // display: 'block',
      },
      div: {
        paddingLeft: 50,
        paddingRight: 50,
        marginLeft: 20,
        marginRight: 20,
      },
      slider: {
        width: '100%',
        flex: '50%',
        marginLeft: 'auto',
        marginRight: 'auto',
        flexDirection: 'column',
        position: 'relative',
      },
      paper: {
        width: '70%',
        flex: '50%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 20,
        flexDirection: 'column',
        padding: 20,
      },
      floatingRightButton: {
        position: 'absolute',
        bottom: '40%',
        right: 20,
      },
      floatingLeftButton: {
        position: 'absolute',
        bottom: '40%',
        left: 20,
      },
      description: {
        width: '90%',
        height: 175,
        overflowY: 'auto',
        flex: '50%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 20,
        marginBottom: 20,
        flexDirection: 'column',
        position: 'relative',
      },
    };

    return (
      <div>
        {this.state.packages.length
          ? <PackageSlider
            style={style}
            ownerId={this.state.ownerId}
            packages={this.state.packages}
            editing={this.props.editing}
            add={e => this.handleAddPackage(e)}
            edit={e => this.handleEditPackage(e)}
            delete={e => this.handleDeletePackage(e)}
          />
          : null
        }

      </div>

    );
  }
}
