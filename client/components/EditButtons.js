import React from 'react';
import CardActions from 'material-ui/Card/CardActions';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import KeyUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import KeyDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';

const EditButtons = (props) => {
  const style = {
    floatingUpButton: {
      right: 120,
      bottom: 20,
      position: 'absolute',
    },
    floatingDownButton: {
      right: 70,
      bottom: 20,
      position: 'absolute',
    },
    floatingDeleteButton: {
      right: 20,
      bottom: 20,
      position: 'absolute',
    },
  };

  return (
    <div>
      <FloatingActionButton
        style={style.floatingUpButton}
        mini
        secondary={props.secondary}
        zDepth={props.secondary ? 0 : 2}
        onTouchTap={e => {
          e.preventDefault();
          props.move('UP', props.target.id);
        }}
      >
        <KeyUp />
      </FloatingActionButton>
      <FloatingActionButton
        style={style.floatingDownButton}
        mini
        secondary={props.secondary}
        zDepth={props.secondary ? 0 : 2}
        onTouchTap={e => {
          e.preventDefault();
          props.move('DOWN', props.target.id);
        }}
      >
        <KeyDown />
      </FloatingActionButton>
      <FloatingActionButton
        style={style.floatingDeleteButton}
        mini
        secondary={props.secondary}
        zDepth={props.secondary ? 0 : 2}
        onTouchTap={e => {
          e.preventDefault();
          props.delete(props.target.id);
        }}
      >
        <ContentRemove />
      </FloatingActionButton>
    </div>
  );
};

export default EditButtons;
