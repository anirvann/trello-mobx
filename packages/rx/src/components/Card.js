import React, { Component } from 'react';
import { observable, action } from 'mobx';
import { observer, inject } from 'mobx-react';
import { request } from 'graphql-request';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import CloseIcon from 'material-ui/svg-icons/navigation/close';

import Queries from '../queries';

const styles = {
  card: {
    display: 'flex',
    width: '180px',
    flexShrink: 0,
    padding: '0 5px',
    margin: '0 0 5px 0',
    alignSelf: 'flex-start'
  }
};

@inject("client")
@observer
class Card extends Component {

  @action
  handleCardUpdate = e => {
    this.props.card.name = e.currentTarget.value;
  };

  @action
  removeCard = e => {
    this.props.client.mutate({ 
      mutation: Queries.updateOneCard, 
      variables: {
        card: {
          "listId": this.props.card.listId,
          "cardId": this.props.card.cardId,
          "name": this.props.card.name,
          "positionId": this.props.card.positionId,
          "status": 'INACTIVE'
        }
      }
    });
  }

  @action
  checkCardUpdate = (e, t) => {
    if(e.hasOwnProperty('keyCode') && e.key !== "Enter")
      return;
    let cardObject = {
      card: {...this.props.card}
    };

    // this.props.client.mutate({ 
    //   mutation: Queries.updateOneList, 
    //   variables: cardObject
    // });

  };

  render() {
    return (
      <Paper style={styles.card}>
        <TextField
          style={{width: '75%'}}
          name="cardName"
          value={this.props.card.name}
          underlineStyle={{ border: 'none' }}
          onChange={this.handleCardUpdate.bind(this)}
        />
        <IconButton><CloseIcon color="#FFF" hoverColor="#000" onClick={this.removeCard.bind(this)} /></IconButton>
      </Paper>
    );
  }
}

export default Card;
