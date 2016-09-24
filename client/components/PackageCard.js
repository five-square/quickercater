import React from 'react';
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import PackageAPI from '../models/packageAPI';


export default class CateringOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ownerId: this.props.ownerId,
      // name: this.props.packages.pack.name,
      // packages:[],
    };
  }

  componentWillMount() {
    PackageAPI.getAllPackages(this.props.ownerId)
    .then(packages => {
      console.log('packages', packages);
      this.setState({ packages });
    });
  }
// Contains description on 3 different service options, text will be inside
// a box. Boxes will be displayed next to each other
  render() {
    const style = {
      height: 550,
      width: 430,
      margin: 20,
      textAlign: 'center',
      display: 'inline-block',
      expandable: false,
    };

    const styleDiv = {
      paddingLeft: 50,
    };


    return (
      <div style={styleDiv}>
        <Card style={style}>
          <CardMedia
            overlay={<CardTitle title="truck" />}
          >
            <img role="presentation" src="https://scontent-dft4-2.cdninstagram.com/t51.2885-15/e35/13721040_194815244266288_87997643_n.jpg" />
          </CardMedia>
          <CardText style={{ wordWarp: 'break-word' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
          </CardText>
        </Card>

        <Card style={style}>
          <CardMedia
            overlay={<CardTitle title="On-Site Service" />}
          >
            <img role="presentation" src="https://scontent-dft4-2.cdninstagram.com/t51.2885-15/e35/13597549_899896270133307_1054019507_n.jpg" />
          </CardMedia>
          <CardText style={{ wordWarp: 'break-word' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
          </CardText>
        </Card>

        <Card style={style}>
          <CardMedia
            overlay={<CardTitle title="Delivery" />}
          >
            <img role="presentation" src="http://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c131.0.817.817/14350609_1070096696419135_1950347763_n.jpg" />
          </CardMedia>
          <CardText style={{ wordWarp: 'break-word' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
          </CardText>
        </Card>
      </div>
    );
  }
}