import React from 'react';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import ContentRemove from 'material-ui/svg-icons/content/remove';


const EditPackageButtons = (props) => {
  const style = {
    floatingDownButton: {
      right: 110,
      bottom: 20,
      position: 'absolute',
    },
    floatingDeleteButton: {
      right: 50,
      bottom: 20,
      position: 'absolute',
    },
  };

  return (
    <div>
      <FloatingActionButton
        style={style.floatingDownButton}
        mini
        secondary={props.secondary}
        zDepth={props.secondary ? 0 : 2}
        onTouchTap={e => {
          e.preventDefault();
          props.addNewPackage();
        }}
      >
        <ContentAdd />
      </FloatingActionButton>
      <FloatingActionButton
        style={style.floatingDeleteButton}
        mini
        secondary={props.secondary}
        zDepth={props.secondary ? 0 : 2}
        onTouchTap={e => {
          e.preventDefault();
          props.delete(props.target.delete);
        }}
      >
        <ContentRemove />
      </FloatingActionButton>
    </div>
  );
};

export default EditPackageButtons;
