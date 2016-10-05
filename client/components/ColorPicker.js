import React from 'react';
import { AlphaPicker, SwatchesPicker } from 'react-color';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

export default class ColorPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayColorPicker: false,
      colorToChange: null,
      colorToDisplay: { r: 241, g: 112, b: 19, a: 1 },
      color: {
        r: '241',
        g: '112',
        b: '19',
        a: '1',
      },
      backgroundColor: {
        r: '',
        g: '',
        b: '',
        a: '',
      },
    };
    this.click = e => this.handleClick(e);
    this.change = e => this.handleChange(e);
    console.log('in ColorPicker constructor: ', this.props.colorTheme);
  }

  componentWillMount() {
    let background = document.getElementById('mainContainer').style.backgroundColor;
    background = background.split('')
      .slice(background.indexOf('(') + 1, background.indexOf(')'))
      .join('')
      .split(', ');
    this.setState({
      backgroundColor: {
        r: background[0],
        g: background[1],
        b: background[2],
        a: background[3] || 1,
      },
    });
  }

  setColor() {
    const color = this.state.color;
    const colorRGBA = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
    const newTheme = this.props.colorTheme;

    // A wild switch appears...
    switch (this.state.colorToChange) {
      case '0':
        newTheme.palette.primary1Color = this.hexify(colorRGBA);
        this.props.changeTheme(newTheme);
        break;
      case '1':
        newTheme.palette.accent1Color = this.hexify(colorRGBA);
        this.props.changeTheme(newTheme);
        break;
      case '2':
        newTheme.palette.accent2Color = this.hexify(colorRGBA);
        this.props.changeTheme(newTheme);
        break;
      case '3':
        newTheme.palette.accent3Color = this.hexify(colorRGBA);
        this.props.changeTheme(newTheme);
        break;
      case '4':
        newTheme.palette.borderColor = this.hexify(colorRGBA);
        this.props.changeTheme(newTheme);
        break;
      case '5':
        newTheme.palette.canvasColor = this.hexify(colorRGBA);
        this.props.changeTheme(newTheme);
        break;
      case '6':
        newTheme.palette.shadowColor = this.hexify(colorRGBA);
        this.props.changeTheme(newTheme);
        break;
      case '7':
        newTheme.palette.textColor = this.hexify(colorRGBA);
        this.props.changeTheme(newTheme);
        break;
      case '8':
        newTheme.palette.alternateTextColor = this.hexify(colorRGBA);
        this.props.changeTheme(newTheme);
        break;
      case '9':
        document.getElementById('mainContainer').style.backgroundColor =
          `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
        this.setState({
          backgroundColor: {
            r: color.r,
            g: color.g,
            b: color.b,
            a: color.a || 1,
          },
        });
        break;
      default:
        return;
    }
  }

  displayColor(choice) {
    // console.log('in setColor: color: ', this.state.color, 'colorToChange: ', this.state.colorToChange, this.props.colorTheme);
    // const color = this.state.color;
    // const colorRGBA = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
    const newTheme = this.props.colorTheme;

    // A wild switch appears...
    switch (choice) {
      case '0':
        this.setState({ colorToDisplay: this.rgbify(newTheme.palette.primary1Color, true) });
        break;
      case '1':
        this.setState({ colorToDisplay: this.rgbify(newTheme.palette.accent1Color, true) });
        break;
      case '2':
        this.setState({ colorToDisplay: this.rgbify(newTheme.palette.accent2Color, true) });
        break;
      case '3':
        this.setState({ colorToDisplay: this.rgbify(newTheme.palette.accent3Color, true) });
        break;
      case '4':
        this.setState({ colorToDisplay: this.rgbify(newTheme.palette.borderColor, true) });
        break;
      case '5':
        this.setState({ colorToDisplay: this.rgbify(newTheme.palette.canvasColor, true) });
        break;
      case '6':
        this.setState({ colorToDisplay: this.rgbify(newTheme.palette.shadowColor, true) });
        break;
      case '7':
        this.setState({ colorToDisplay: this.rgbify(newTheme.palette.textColor, true) });
        break;
      case '8':
        this.setState({ colorToDisplay: this.rgbify(newTheme.palette.alternateTextColor, true) });
        break;
      case '9':
        this.setState({ colorToDisplay: this.state.backgroundColor });
        break;
      default:
        return;
    }
  }

  rgbify(hex, alphaYes) {
    console.log('in ColorPicker rgbify: ', hex);
    const h = '0123456789ABCDEF';
    const r = (h.indexOf(hex[1]) * 16) + h.indexOf(hex[2]);
    const g = (h.indexOf(hex[3]) * 16) + h.indexOf(hex[4]);
    const b = (h.indexOf(hex[5]) * 16) + h.indexOf(hex[6]);
    if (alphaYes) {
      // return `rgba(${r}, ${g}, ${b}, 1)`;
      return { r, g, b, a: 1 };
    }
    return { r, g, b };
  }

  // Function to convert hex format to a rgb color
  hexify(color) {
    const values = color
      .replace(/rgba?\(/, '')
      .replace(/\)/, '')
      .replace(/[\s+]/g, '')
      .split(',');
    const a = parseFloat(values[3] || 1);
    const r = Math.floor((a * parseInt(values[0], 10)) + ((1 - a) * 255));
    const g = Math.floor((a * parseInt(values[1], 10)) + ((1 - a) * 255));
    const b = Math.floor((a * parseInt(values[2], 10)) + ((1 - a) * 255));
    const hex1 = `${`0${r.toString(16)}`.slice(-2)}`;
    const hex2 = `${`0${g.toString(16)}`.slice(-2)}`;
    const hex3 = `${`0${b.toString(16)}`.slice(-2)}`;
    const hex = `#${hex1}${hex2}${hex3}`;
    return hex;
  }

  handleClick(e) {
    console.log('in ColorPicker handleClick: ', e.currentTarget.value, this.state.colorToChange);
    this.setState({
      colorToDisplay: this.displayColor(e.currentTarget.value),
      colorToChange: e.currentTarget.value,
    });
  }

  handleClose() {
    this.setState({ displayColorPicker: false });
  }

  handleChange(color) {
    this.setState({ color: color.rgb, colorToDisplay: color.rgb }, this.setColor);
  }

  render() {
    const popover = {
      position: 'absolute',
      right: 20,
      top: 20,
      zIndex: '2',
    };
    const cover = {
      position: 'relative',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
      backgroundColor: 'lightgray',
    };

    return (
      <div>
        <Paper
          zDepth={2}
          style={{
            height: 40,
            width: 40,
            backgroundColor: this.state.colorToDisplay,
          }}
        />
        <RaisedButton primary value={0} label="Primary 1" onTouchTap={this.click} /><br />
        <RaisedButton primary value={1} label="Accent 1" onTouchTap={this.click} /><br />
        <RaisedButton primary value={2} label="Accent 2" onTouchTap={this.click} /><br />
        <RaisedButton primary value={3} label="Accent 3" onTouchTap={this.click} /><br />
        <RaisedButton primary value={4} label="Borders" onTouchTap={this.click} /><br />
        <RaisedButton primary value={5} label="Canvas" onTouchTap={this.click} /><br />
        <RaisedButton primary value={6} label="Shadows" onTouchTap={this.click} /><br />
        <RaisedButton primary value={7} label="Primary Text" onTouchTap={this.click} /><br />
        <RaisedButton primary value={8} label="Secondary Text" onTouchTap={this.click} /><br />
        <RaisedButton primary value={9} label="Background" onTouchTap={this.click} /><br />
        <div style={popover}>
          <div style={cover} onTouchTap={this.click} />
          <div style={{ backgroundColor: 'white' }}>
            <AlphaPicker
              color={this.state.colorToDisplay}
              onChangeComplete={this.change}
            />
          </div><br />
          <SwatchesPicker
            color={this.state.colorToDisplay}
            onChangeComplete={this.change}
          />
        </div>
      </div>
    );
  }
}
