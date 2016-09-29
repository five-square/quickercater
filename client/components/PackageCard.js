import React from 'react';
import { Card, CardMedia, CardTitle } from 'material-ui/Card';

const PackageCard = (props) => (
  <Card style={props.style}>
    <CardMedia
      overlay={<CardTitle title={props.pack.name} />}
    >
      <img role="presentation" src={props.pack.picture} />
    </CardMedia>
  </Card>
);

export default PackageCard;
