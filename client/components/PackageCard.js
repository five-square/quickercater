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
<<<<<<< ac61ff4d5092bfe598f9e2e57d154d2d1f081883
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
=======
              ? <div style={style.floatingEditButton}>
                <EditPackage
                  edit={props.handleSubmitEdit}
                /><br />
                <AddPackageCard
                  edit={props.handleAddPackage}
                /><br />
                <FloatingActionButton
                  mini
                  onTouchTap={() => props.delete(props.target.pack.id)}
                >
                  <ContentRemove />
                </FloatingActionButton>
              </div>
              : null
            }
>>>>>>> added files
  </Card>
);

export default PackageCard;
