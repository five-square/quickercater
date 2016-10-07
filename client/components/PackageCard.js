import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import { Card, CardMedia, CardTitle } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
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
    fontSize: 18,
  },
};


const PackageCard = (props) => (
  <Card style={props.style}>
    <CardMedia
      overlay={
        <CardTitle title={props.pack.description} titleStyle={style.cardMedia} />
      }
    >
      <img role="presentation" src={props.pack.picture} />
    </CardMedia>
    <Paper zDepth={2} style={props.style.paper}>
      <h1>{props.pack.name}</h1>
    </Paper>
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
