import React, { Component } from 'react';
import Package from '../models/packageAPI';
import PackageSlider from './PackageSlider';

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

  handleAddPackage() {
    alert('Clicked Add New!');
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
        bottom: 20,
        right: 20,
      },
      floatingLeftButton: {
        position: 'absolute',
        bottom: 20,
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
            addNewPackage={e => this.handleAddPackage(e)}
          />
          : null
        }
      </div>
    );
  }
}
