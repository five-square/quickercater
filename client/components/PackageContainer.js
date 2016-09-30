import React, { Component } from 'react';
import Package from '../models/packageAPI';
import PackageSlider from './PackageSlider';
import EditPackage from './EditPackage';
import AddPackageCard from './AddPackageCard'

export default class PackageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      packages: [], 
    };
  }

  componentWillMount() {
    Package.getAllPackages(this.props.ownerId)
    .then(packages => {
      console.log('in PackageContainer: packages: ', packages);
      this.setState({
        packages,
      });
    });
  }

  showPackages() {
    Package.getAllPackages(this.state.ownerId)
    .then(packages => {
      this.setState({ packages });
    });
  }

  handleAddPackage(pkg) {
    const newPackage = Object.assign({}, pkg, {
      order: this.state.packages.length,
      ownerId: this.state.ownerId,
    });
    Package.create(newPackage)
    .then(() => {
      this.showPackages();
    });
  }

  handleDeletePackage(packId) {
    Package.delete(packId, this.state.ownerId)
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
        width: '60%',
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
            packages={this.state.packages}
            editing={this.props.editing}
            deletePackage={e => this.handleDeletePackage(e)}
          />

          : null
        }

      </div>

    );
  }
}
