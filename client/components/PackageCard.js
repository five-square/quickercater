import React from 'react';
import { Card, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import PackageAPI from '../models/packageAPI';

export default class PackageCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ownerId: this.props.ownerId,
      packages: [],
      id: this.props.pack.id,
      name: this.props.pack.name,
      picture: this.props.pack.picture,
      description: this.props.pack.description,
      cost: this.props.pack.cost,
      type: this.props.pack.type,
    };
  }

  componentWillMount() {
    // PackageAPI.getAllPackages(this.props.ownerId)
    // .then(packages => {
    //   this.setState({ packages });
    //   console.log('State packages', this.state.packages);
    // });
  }

  render() {
    const style = {
      height: 550,
      width: 430,
      margin: 10,
      textAlign: 'center',
      display: 'block',
    };

    const styleDiv = {
      paddingLeft: 50,
      display: 'inline-block',
    };

    return (
      <div style={styleDiv}>
        <Card style={style}>
          <CardMedia
            overlay={<CardTitle title={this.state.name} />}
          >
            <img role="presentation" src={this.state.picture} />
          </CardMedia>
          <CardText style={{ wordWarp: 'break-word' }}>
            {this.state.description}
          </CardText>
        </Card>
      </div>
    );
  }
}
