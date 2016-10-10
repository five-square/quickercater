import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import { Card, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Chip from 'material-ui/Chip';

import EditPackage from './EditPackage';
import AddPackageCard from './AddPackageCard';

const style = {
  floatingButtons: {
    right: 5,
    bottom: 0,
    position: 'absolute',
  },
  floatingDeleteButton: {
    right: 10,
    bottom: 90,
    position: 'absolute',
  },
  cardMedia: {
    height: 280,
  },
  cardText: {
    height: 40,
    overflowY: 'auto',
  },
  priceChip: {
    margin: 5,
    padding: 2,
    position: 'absolute',
    right: '2%',
    top: '2%',
    zIndex: 190,
  },
  priceText: {
    fontSize: '1.1em',
  },
};

const PackageCard = (props) => (
  <Card style={props.style}>
    <Chip style={style.priceChip}>
      <span style={style.priceText}>{`$${(+props.pack.cost).toFixed(2)}`}</span>
    </Chip>
    <CardMedia
      overlay={
        <CardTitle title={props.pack.name} />
      }
    >
      <img role="presentation" src={props.pack.picture} />
    </CardMedia>
    <CardText style={style.cardText}>
      {props.pack.description}
    </CardText>
    {props.editing
      ? <div style={style.floatingButtons}>
        <EditPackage
          ownerId={props.ownerId}
          package={props.pack}
          editPackage={e => props.edit(e)}
        /><br />
        <AddPackageCard
          count={props.count}
          ownerId={props.ownerId}
          addPackage={props.add}
        /><br />
        <FloatingActionButton
          style={style.floatingDeleteButton}
          mini
          secondary={props.secondary}
          zDepth={props.secondary ? 0 : 2}
          onTouchTap={e => {
            e.preventDefault();
            // console.log('props in onTouchTap del pack', props);
            props.delete(props.pack.id, props.pack.ownerId);
          }}
        >
          <ContentRemove />
        </FloatingActionButton>
      </div>
      : null
    }
  </Card>
);

export default PackageCard;
