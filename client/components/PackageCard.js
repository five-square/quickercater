import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import { Card, CardMedia, CardTitle } from 'material-ui/Card';
import EditPackage from './EditPackage';


import AddPackageCard from './AddPackageCard';

const style = {
  floatingEditButton: {

    right: 5,
    bottom: 380,
    position: 'absolute',
  },
  // cardActions: {
  //   marginTop: 30,
  //   position: 'relative',
  //   height: 30,
  // },
};


const PackageCard = (props) => (
  <Card style={props.style}>
    <CardMedia
      overlay={<CardTitle title={props.pack.name} />}
    >
      <img role="presentation" src={props.pack.picture} />
    </CardMedia>
    {props.editing
              ? <div style={style.floatingEditButton}>
                <EditPackage
                  edit={props.handleSubmitEdit}
                /><br />
                <AddPackageCard
                  edit={props.handleAddPackage}
                /><br />
                <FloatingActionButton
                  mini
                  delete={props.delete}
                >
                  <ContentRemove />
                </FloatingActionButton>
              </div>
              : null
            }
  </Card>
);

export default PackageCard;
