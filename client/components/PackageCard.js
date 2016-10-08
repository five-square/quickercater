import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import { Card, CardMedia, CardTitle, CardText } from 'material-ui/Card';

import EditPackage from './EditPackage';
import AddPackageCard from './AddPackageCard';

const style = {
  floatingEditButton: {
    right: 5,
    bottom: 0,
    position: 'absolute',
  },
  cardMedia: {
    height: 280,
  },
  cardText: {
    height: 40,
    overflowY: 'auto',
  },
};

const PackageCard = (props) => (
  <Card style={props.style}>
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
      ? <div style={style.floatingEditButton}>
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
