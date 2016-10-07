import {
  blue500, blue700, blue100,
  teal500, teal700, teal100,
  grey100, grey400, grey900, grey200,
  darkBlack, fullBlack,
} from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';

const ColorAPI = {};

ColorAPI.defaultTheme = {
  fontFamily: 'Arial, sans-serif',
  palette: {
    primary1Color: blue500, // primary buttons and appbars
    primary2Color: blue700,
    primary3Color: blue100,
    accent1Color: teal500, // secondary buttons and slider indicators
    accent2Color: teal700, // toolbars, table highlight color
    accent3Color: teal100, // table header text color
    borderColor: grey400, // dividers
    canvasColor: grey200, // all paper and cards
    shadowColor: fullBlack, // hover shadows
    textColor: grey900, // text color
    disabledColor: fade(darkBlack, 0.3),
    clockCircleColor: fade(darkBlack, 0.07),
    alternateTextColor: grey100, // text color in app/tab bars, buttons, and chips
    pickerHeaderColor: blue500, // text color in app/tab bars, buttons, and chips
  },
};

export default ColorAPI;
