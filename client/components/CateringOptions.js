import React from 'react';
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';


export default class CateringOptions extends React.Component {
	constructor(props) {
		super(props);
	}
// Contains description on 3 different service options, text will be inside
// a box. Boxes will be displayed next to each other
  render() {
    const style = {
      height: 500,
      width: 460,
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
            overlay={<CardTitle title="Truck Service" />}
          >
            <img role="presentation" src="https://arlingtonva.s3.amazonaws.com/wp-content/uploads/sites/25/2013/12/foodtruck.jpeg" />
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
            <img role="presentation" src="http://blog.flushingfood.com/wp-content/uploads/2014/06/HomeFoodDeliveryFlushingNYC.jpg" />
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
            <img role="presentation" src="http://blog.gessato.com/wp-content/uploads/2015/04/lukes-local-fresh-food-delivery-6.jpg" />
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