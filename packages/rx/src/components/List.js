import React, { Component } from 'react';
import { observable, action } from 'mobx';
import { observer, inject } from 'mobx-react';
import { request } from 'graphql-request';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import RaisedButton from 'material-ui/RaisedButton';

import Card from './Card';
import Queries from '../queries';

const styles = {
  list: {
    display: 'flex',
    width: '200px',
    flexShrink: 0,
    padding: '10px',
    margin: '10px',
    alignSelf: 'flex-start',
    flexDirection: 'column'
  }
};

@inject("store")
@inject("client")
@observer
class List extends Component {

  @observable cardName = '';

  @action
  handleInputUpdate = e => {
    this.props.list.name = e.currentTarget.value;
  };


  @action
  removeList = e => {
    this.props.client.mutate({ 
      mutation: Queries.updateOneList, 
      variables: {
        list: {
          "listId": this.props.list.listId,
          "name": this.props.list.name,
          "positionId": this.props.list.positionId,
          "status": 'INACTIVE'
        }
      }
    })
    .then(data => console.log(data));
  }

  @action
  log = (e, t) => {
    if(e.hasOwnProperty('keyCode') && e.key !== "Enter")
      return;
    let updatedListObject = {
      list: {
        "listId": this.props.list.listId,
        "name": this.props.list.name,
        "positionId": this.props.list.positionId,
        "status": 'ACTIVE'
      }
    };

    this.props.client.mutate({ 
      mutation: Queries.updateOneList, 
      variables: updatedListObject
    });

  };

  @action
  addCard = e => {
    if(e.hasOwnProperty('keyCode') && e.key !== "Enter")
      return;

    this.props.client.mutate({ 
      mutation: Queries.createOneCard, 
      variables: {
        card: {
          name: this.cardName,
          listId: this.props.list.listId
        }
      }
    });

  };

  @action
  cardNameUpdate = e => {
    this.cardName = e.currentTarget.value;
  };

  render() {
    return (
      <Paper style={styles.list}>
        <div>
          <TextField
            style={{width: '70%'}}
            name="listTitle"
            value={this.props.list.name}
            underlineStyle={{ border: 'none' }}
            onChange={this.handleInputUpdate.bind(this)}
            onBlur={this.log.bind(this)}
            onKeyPress={this.log.bind(this)}
          />
          <IconMenu
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          >
            <MenuItem primaryText="Delete" onClick={this.removeList.bind(this)} />
            <MenuItem primaryText="Reposition" />
          </IconMenu>
          {this.props.list.cards.map(card => 
              <Card card={card} key={card.cardId} />
          )}
        </div>
        <div>
          <TextField
            name="addCard"
            floatingLabelText="Enter new card name"
            value={this.cardName}
            onChange={this.cardNameUpdate.bind(this)}
            onKeyPress={this.addCard.bind(this)}
            fullWidth={true}
          />
          <RaisedButton 
            label="Add Card" 
            fullWidth={true}
            primary={true}
            onClick={this.addCard.bind(this)}
            />          
        </div>
      </Paper>
    );
  }
}

export default List;
