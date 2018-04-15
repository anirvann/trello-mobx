import React from "react";
import { render } from "react-dom";
import { Provider } from "mobx-react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DevTools from "mobx-react-devtools";

import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
// import ws from 'socket.io';

import App from "./components/App";
import ListsModel from './models/ListsModel';
import Theme from './theme';

const client = new ApolloClient({
  link: new HttpLink({ uri: '/api' }),
  cache: new InMemoryCache()
});

// const io = ws(client);

const store = new ListsModel(client);

// io.on('connection', function(socket) {
//   console.log(socket);
// });

render(
  <div>
    <DevTools />
    <Provider store={store} client={client}>
      <MuiThemeProvider muiTheme={Theme}>
        <App />
      </MuiThemeProvider>
    </Provider>
  </div>,
  document.getElementById('root')
);