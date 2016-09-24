import React from 'react';
import { Card, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import PackageAPI from '../models/packageAPI';


export default class CateringOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ownerId: this.props.ownerId,
      packages: [],
      name: this.props.pack.pack.properties.name,
      picture: this.props.pack.pack.properties.picture,
      description: this.props.pack.pack.properties.description,
    };
  }

  componentWillMount() {
    PackageAPI.getAllPackages(this.props.ownerId)
    .then(packages => {
      this.setState({ packages });
      console.log('State packages', this.state.packages);
    });
  }

  render() {
    const style = {
      height: 550,
      width: 430,
      margin: 20,
      textAlign: 'center',
      display: 'inline-block',
    };

    const styleDiv = {
      paddingLeft: 50,
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
