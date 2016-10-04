import React from 'react';
// import reactCSS from 'reactcss';
import { ChromePicker } from 'react-color';
import RaisedButton from 'material-ui/RaisedButton';

export default class ColorPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayColorPicker: false,
      color: {
        r: '241',
        g: '112',
        b: '19',
        a: '1',
      },
    };
    this.click = e => this.handleClick(e);
    this.open = e => this.open(e);
  }

  handleClick() {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  }

  handleClose() {
    this.setState({ displayColorPicker: false });
  }

  // handleChange(color) {
  //   this.setState({ color: color.rgb });
  // }

  render() {
    const popover = {
      position: 'absolute',
      zIndex: '2',
    };
    const cover = {
      position: 'fixed',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
    };

    return (
      <div>
        <RaisedButton label="Pick Color" onTouchTap={this.click} />
        { this.state.displayColorPicker
          ? <div style={popover}>
            <div style={cover} onTouchTap={this.click} />
            <ChromePicker />
            <RaisedButton label="Close" onTouchTap={this.click} />
          </div>
          : null
        }
      </div>
    );
  }
}
