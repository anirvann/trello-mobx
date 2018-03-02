import React, { Component } from 'react';
import { observable, action } from 'mobx';
import { observer, inject } from 'mobx-react';
import { request } from 'graphql-request';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

import Queries from '../queries';

const styles = {
  list: {
    width: '200px',
    flexShrink: 0,
    padding: '10px',
    margin: '10px'
  }
};

@observer
class List extends Component {
  @action
  handleInputUpdate = e => {
    this.props.list.name = e.currentTarget.value;
    console.log(e, e.target.value);
  };

  @action
  log = (e, t) => {
    request('/api', Queries.updateOneTask, {
      list: {
        listId: this.props.list.listId,
        status: this.props.list.status,
        name: this.props.list.name,
        positionId: this.props.list.positionId
      }
    });
  };

  render() {
    return (
      <Paper style={styles.list}>
        <TextField
          name="listTitle"
          value={this.props.list.name}
          underlineStyle={{ border: 'none' }}
          fullWidth={true}
          onChange={this.handleInputUpdate}
          onBlur={this.log.bind(this)}
        />
      </Paper>
    );
  }
}

export default List;
