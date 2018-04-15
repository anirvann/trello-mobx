import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';

import Board from './Board';
import SideBar from './SideBar';

const styles = {
  app: { display: 'flex', flexDirection: 'column' },
  main: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    marginTop: '48px',
    height: 'calc(100vh - 48px)'
  }
};

class App extends Component {
  render() {
    return (
      <div className="App" style={styles.app}>
        <AppBar
          title="Trello MobX"
          className="header"
          showMenuIconButton={false}
          style={{ position: 'fixed' }}
        />
        <div className="main" style={styles.main}>
          <Board />
          <SideBar />
        </div>
      </div>
    );
  }
}

export default App;
