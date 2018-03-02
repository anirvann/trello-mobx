import baseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

let overwrites = {
  palette: {
    type: 'dark',
    primary1Color: '#bf360c',
    accent1Color: '#3e2723',
    secondaryTextColor: '#ffffff',
    disabledColor: 'rgba(0, 0, 0, 0.68)',
    primary3Color: 'rgba(255, 255, 255, 0.87)',
    alternateTextColor: 'rgba(255, 255, 255, 0.87)'
  },
  appBar: {
    height: 48
  }
};
const customTheme = getMuiTheme(overwrites);

export default customTheme;