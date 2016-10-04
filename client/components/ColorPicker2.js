import React from 'react';
import ColorPicker from 'react-color-picker';
import 'react-color-picker/index.css';

export default class ColorPicker2 extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      color: 'red',
    };
  }

  onDrag(color, c) {
    this.setState({
      color,
    });
  }

  render() {
    return (
      <div>
        <ColorPicker value={this.state.color} onDrag={(color, c) => this.onDrag(color, c)} />
        <div
          style={{
            background: this.state.color,
            width: 100,
            height: 50,
            color: 'white',
          }}
        >
          {this.state.color}
        </div>
      </div>
    );
  }
}
