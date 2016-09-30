import React from 'react';
import { Card, CardMedia, CardTitle, CardActions } from 'material-ui/Card';
import EditPackage from './EditPackage';
import EditPackageButtons from './EditPackageButtons';


const style = {
  floatingEditButton: {

    right: 150,
    bottom: 480,
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
          
                />
                <EditPackageButtons
                  secondary
                  targetType={'package'}
                  target={props.package}
                  delete={props.deletePackage}
                  addNewPackage={props.handleAddPackage}
                />
              </div>
              : null
            }
    
  </Card>
);

export default PackageCard;
