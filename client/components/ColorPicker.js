import React from 'react';
import { AlphaPicker, SwatchesPicker } from 'react-color';
import Paper from 'material-ui/Paper';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

export default class ColorPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayColorPicker: false,
      colorToChange: 0,
      colorToDisplay: {
        r: '0',
        g: '0',
        b: '0',
        a: '0',
      },
      color: {
        r: '0',
        g: '0',
        b: '0',
        a: '0',
      },
      backgroundColor: {
        r: '',
        g: '',
        b: '',
        a: '',
      },
    };
    this.propertyKeys = {
      0: 'Primary 1',
      1: 'Accent 1',
      2: 'Accent 2',
      3: 'Accent 3',
      4: 'Borders',
      5: 'Canvas',
      6: 'Shadows',
      7: 'Primary Text',
      8: 'Secondary Text',
      9: 'Background',
    };

    this.click = (e, i, v) => this.handleClick(e, i, v);
    this.change = e => this.handleChange(e);
    console.log('in ColorPicker constructor: ', this.displayColor(1));
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
      case 0:
        newTheme.palette.primary1Color = this.hexify(colorRGBA);
        this.props.changeTheme(newTheme);
        break;
      case 1:
        newTheme.palette.accent1Color = this.hexify(colorRGBA);
        this.props.changeTheme(newTheme);
        break;
      case 2:
        newTheme.palette.accent2Color = this.hexify(colorRGBA);
        this.props.changeTheme(newTheme);
        break;
      case 3:
        newTheme.palette.accent3Color = this.hexify(colorRGBA);
        this.props.changeTheme(newTheme);
        break;
      case 4:
        newTheme.palette.borderColor = this.hexify(colorRGBA);
        this.props.changeTheme(newTheme);
        break;
      case 5:
        newTheme.palette.canvasColor = this.hexify(colorRGBA);
        this.props.changeTheme(newTheme);
        break;
      case 6:
        newTheme.palette.shadowColor = this.hexify(colorRGBA);
        this.props.changeTheme(newTheme);
        break;
      case 7:
        newTheme.palette.textColor = this.hexify(colorRGBA);
        this.props.changeTheme(newTheme);
        break;
      case 8:
        newTheme.palette.alternateTextColor = this.hexify(colorRGBA);
        this.props.changeTheme(newTheme);
        break;
      case 9:
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
    const newTheme = this.props.colorTheme;
    let color = '';
    const r = this.state.backgroundColor.r;
    const g = this.state.backgroundColor.g;
    const b = this.state.backgroundColor.b;
    const a = this.state.backgroundColor.a;

    // A wild switch appears...
    switch (choice) {
      case 0:
        color = this.rgbify(newTheme.palette.primary1Color.toUpperCase(), true);
        break;
      case 1:
        color = this.rgbify(newTheme.palette.accent1Color.toUpperCase(), true);
        break;
      case 2:
        color = this.rgbify(newTheme.palette.accent2Color.toUpperCase(), true);
        break;
      case 3:
        color = this.rgbify(newTheme.palette.accent3Color.toUpperCase(), true);
        break;
      case 4:
        color = this.rgbify(newTheme.palette.borderColor.toUpperCase(), true);
        break;
      case 5:
        color = this.rgbify(newTheme.palette.canvasColor.toUpperCase(), true);
        break;
      case 6:
        color = this.rgbify(newTheme.palette.shadowColor.toUpperCase(), true);
        break;
      case 7:
        color = this.rgbify(newTheme.palette.textColor.toUpperCase(), true);
        break;
      case 8:
        color = this.rgbify(newTheme.palette.alternateTextColor.toUpperCase(), true);
        break;
      case 9:
        color = `rgba(${r}, ${g}, ${b}, ${a})`;
        break;
      default:
        break;
    }
    return color;
  }

  rgbify(hex, alphaYes) {
    const h = '0123456789ABCDEF';
    const r = (h.indexOf(hex[1]) * 16) + h.indexOf(hex[2]);
    const g = (h.indexOf(hex[3]) * 16) + h.indexOf(hex[4]);
    const b = (h.indexOf(hex[5]) * 16) + h.indexOf(hex[6]);
    if (alphaYes) {
      return `rgba(${r}, ${g}, ${b}, 1)`;
    }
    return `rgba(${r}, ${g}, ${b})`;
  }

  rgbObjectify(rgba) {
    const values = rgba
      .replace(/rgba?\(/, '')
      .replace(/\)/, '')
      .replace(/[\s+]/g, '')
      .split(',');
    return {
      r: values[0],
      g: values[1],
      b: values[2],
      a: values[3],
    };
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

  handleClick(e, i, v) {
    this.setState({
      colorToDisplay: this.rgbObjectify(this.displayColor(v)),
      colorToChange: v,
    });
  }

  handleClose() {
    this.setState({ displayColorPicker: false });
  }

  handleChange(color) {
    this.setState({ color: color.rgb, colorToDisplay: color.rgb }, this.setColor);
  }

  render() {
    const style = {
      popover: {
        position: 'absolute',
        right: 20,
        top: 20,
        zIndex: '2',
      },
      cover: {
        position: 'relative',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
        backgroundColor: 'lightgray',
      },
      paper: {
        height: 150,
        width: '45%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 50,
        backgroundColor: this.displayColor(this.state.colorToChange),
      },
    };

    return (
      <div>
        <div style={{ width: '50%', position: 'relative' }}>
          <DropDownMenu
            maxHeight={200}
            value={this.state.colorToChange}
            onChange={this.click}
          >
            <MenuItem key={0} value={0} primaryText="Primary 1" />
            <MenuItem key={1} value={1} primaryText="Accent 1" />
            <MenuItem key={2} value={2} primaryText="Accent 2" />
            <MenuItem key={3} value={3} primaryText="Accent 3" />
            <MenuItem key={4} value={4} primaryText="Borders" />
            <MenuItem key={5} value={5} primaryText="Canvas" />
            <MenuItem key={6} value={6} primaryText="Shadows" />
            <MenuItem key={7} value={7} primaryText="Primary Text" />
            <MenuItem key={8} value={8} primaryText="Secondary Text" />
            <MenuItem key={9} value={9} primaryText="Background" />
          </DropDownMenu>
          <Paper
            zDepth={2}
            style={style.paper}
          />
        </div>
        <div style={style.popover}>
          <div style={style.cover} onTouchTap={this.click} />
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
