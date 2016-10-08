import React from 'react';
import { AlphaPicker, SwatchesPicker } from 'react-color';
import Paper from 'material-ui/Paper';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { Tabs, Tab } from 'material-ui/Tabs';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import Card from 'material-ui/Card';
import CardTitle from 'material-ui/Card/CardTitle';
import Colors from '../models/colorAPI';

export default class ColorPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayColorPicker: false,
      colorToChange: 0,
      predefinedTheme: 'QuickerCater',
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
      // oldColorTheme: Object.assign({}, this.props.colorTheme),
      newColorTheme: this.props.colorTheme,
    };
    this.propertyKeys = {
      0: 'Primary 1',
      1: 'Accent 1',
      2: 'Canvas',
      3: 'Shadows',
      4: 'Primary Text',
      5: 'Secondary Text',
      6: 'Background',
    };

    this.customClick = (e, i, v) => this.handleCustomClick(e, i, v);
    this.predefinedClick = (e, i, v) => this.handlePredefinedClick(e, i, v);
    this.change = e => this.handleChange(e);
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
      newColorTheme: this.props.colorTheme,
    });
  }

  componentWillReceiveProps(props) {
    this.setState({
      newColorTheme: props.colorTheme,
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
        newTheme.palette.canvasColor = this.hexify(colorRGBA);
        this.props.changeTheme(newTheme);
        break;
      case 3:
        newTheme.palette.shadowColor = this.hexify(colorRGBA);
        this.props.changeTheme(newTheme);
        break;
      case 4:
        newTheme.palette.textColor = this.hexify(colorRGBA);
        this.props.changeTheme(newTheme);
        break;
      case 5:
        newTheme.palette.alternateTextColor = this.hexify(colorRGBA);
        this.props.changeTheme(newTheme);
        break;
      case 6:
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
      case 'QuickerCater':
        newTheme.palette = Colors.defaultTheme.palette;
        this.props.changeTheme(newTheme);
        break;
      case 'Light':
        newTheme.palette = lightBaseTheme.palette;
        this.props.changeTheme(newTheme);
        break;
      case 'Dark':
        newTheme.palette = darkBaseTheme.palette;
        this.props.changeTheme(newTheme);
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
        color = this.rgbify(newTheme.palette.canvasColor.toUpperCase(), true);
        break;
      case 3:
        color = this.rgbify(newTheme.palette.shadowColor.toUpperCase(), true);
        break;
      case 4:
        color = this.rgbify(newTheme.palette.textColor.toUpperCase(), true);
        break;
      case 5:
        color = this.rgbify(newTheme.palette.alternateTextColor.toUpperCase(), true);
        break;
      case 6:
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

  handleCustomClick(e, i, v) {
    this.setState({
      colorToDisplay: this.rgbObjectify(this.displayColor(v)),
      colorToChange: v,
    });
  }

  handlePredefinedClick(e, i, v) {
    this.setState({
      predefinedTheme: v,
      colorToChange: v,
    }, this.setColor);
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
        height: 70,
        width: 100,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 20,
        backgroundColor: this.displayColor(this.state.colorToChange),
      },
      dropDown: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 40,
        display: 'inline',
      },
    };

    return (
      <div>
        <Tabs style={{ width: '100%' }}>
          <Tab label="Choose a Theme">
            <div style={{ position: 'relative', height: 110 }}>
              <div
                style={{
                  width: '50%',
                  position: 'absolute',
                  display: 'inline-block',
                  left: 0,
                  top: 20,
                }}
              >
                <DropDownMenu
                  maxHeight={200}
                  value={this.state.predefinedTheme}
                  onChange={this.predefinedClick}
                  style={style.dropDown}
                >
                  <MenuItem key={7} value={'QuickerCater'} primaryText="QuickerCater" />
                  <MenuItem key={8} value={'Light'} primaryText="Light" />
                  <MenuItem key={9} value={'Dark'} primaryText="Dark" />
                </DropDownMenu>
              </div>
              <div
                style={{
                  width: '50%',
                  position: 'absolute',
                  display: 'inline-block',
                  top: 30,
                  right: 0,
                }}
              >
                <MuiThemeProvider muiTheme={getMuiTheme(this.props.colorTheme)}>
                  <div>
                    <Paper
                      style={{
                        margin: 20,
                        position: 'relative',
                        textAlign: 'center',
                        marginTop: 0,
                        paddingBottom: 5,
                      }}
                    >
                      <AppBar
                        title="Style Preview"
                        titleStyle={{ fontSize: 20, height: 50, marginTop: -13 }}
                        style={{ height: 40 }}
                        iconStyleLeft={{ display: 'none' }}
                      />
                      <Card zDepth={2} style={{ margin: 10 }}>
                        <CardTitle title="Primary Text" />
                        <RaisedButton
                          primary label="Primary"
                          style={{
                            display: 'inline-block',
                            margin: 15,
                            width: '40%',
                            marginTop: 0,
                          }}
                        />
                        <RaisedButton
                          secondary
                          label="Secondary"
                          style={{
                            display: 'inline-block',
                            margin: 10,
                            width: '40%',
                            marginTop: 0,
                          }}
                        />
                      </Card>
                    </Paper>
                  </div>
                </MuiThemeProvider>
              </div>
            </div>
          </Tab>
          <Tab label="Customize">
            <div style={{ width: '50%', position: 'relative' }}>
              <div style={{ position: 'relative', height: 110 }}>
                <div style={{ width: '60%', position: 'absolute', display: 'inline-block' }}>
                  <DropDownMenu
                    maxHeight={200}
                    value={this.state.colorToChange}
                    onChange={this.customClick}
                    style={style.dropDown}
                  >
                    <MenuItem key={0} value={0} primaryText="Buttons and Menus" />
                    <MenuItem key={1} value={1} primaryText="Secondary Buttons" />
                    <MenuItem key={2} value={2} primaryText="Canvas" />
                    <MenuItem key={3} value={3} primaryText="Shadows" />
                    <MenuItem key={4} value={4} primaryText="Primary Text" />
                    <MenuItem key={5} value={5} primaryText="Secondary Text" />
                    <MenuItem key={6} value={6} primaryText="Background" />
                  </DropDownMenu>
                </div>
                <div
                  style={{
                    width: '40%',
                    position: 'absolute',
                    right: 0,
                    display: 'inline-block',
                  }}
                >
                  <Paper
                    zDepth={2}
                    style={style.paper}
                  />
                </div>
              </div>
              <MuiThemeProvider muiTheme={getMuiTheme(this.props.colorTheme)}>
                <div>
                  <Paper
                    style={{
                      margin: 20,
                      position: 'relative',
                      textAlign: 'center',
                      marginTop: 0,
                      paddingBottom: 5,
                    }}
                  >
                    <AppBar
                      title="Style Preview"
                      titleStyle={{ fontSize: 20, height: 50, marginTop: -13 }}
                      style={{ height: 40 }}
                      iconStyleLeft={{ display: 'none' }}
                    />
                    <Card zDepth={2} style={{ margin: 10 }}>
                      <CardTitle title="Primary Text" />
                      <RaisedButton
                        primary label="Primary"
                        style={{ display: 'inline-block', margin: 15, width: '40%', marginTop: 0 }}
                      />
                      <RaisedButton
                        secondary
                        label="Secondary"
                        style={{ display: 'inline-block', margin: 10, width: '40%', marginTop: 0 }}
                      />
                    </Card>
                  </Paper>
                </div>
              </MuiThemeProvider>
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
          </Tab>
        </Tabs>
      </div>
    );
  }
}
