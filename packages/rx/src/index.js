import React from "react";
import { render } from "react-dom";
import { Provider } from "mobx-react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DevTools from "mobx-react-devtools";

import App from "./components/App";
import ListsModel from './models/ListsModel';
import Theme from './theme';


const store = new ListsModel();

render(
  <div>
    <DevTools />
    <Provider store={store}>
      <MuiThemeProvider muiTheme={Theme}>
        <App />
      </MuiThemeProvider>
    </Provider>
  </div>,
  document.getElementById('root')
);