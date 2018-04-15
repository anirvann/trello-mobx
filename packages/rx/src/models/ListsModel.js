import { observable, action } from 'mobx';
import { request } from 'graphql-request';

import Queries from '../queries';
import ListModel from './ListModel';

export default class ListsModel{
  @observable lists = [];

  constructor(client){
    this.client = client;
    this.fetchLists();
  }

  @action
  fetchLists(){
    this.client.query({ query: Queries.fetchAllLists })
    .then(result => (
        result.data.lists.map(list => ({...list,...{ cards: result.data.cards.filter(card => card.status === 'ACTIVE' && card.listId === list.listId)}}))
    ))
    .then(lists => lists.filter(list => list.status === 'ACTIVE'))
    .then(lists => lists.map( list => 
      this.lists.push(new ListModel(list)
    )))
  }

  @action
  addList(list){
    this.lists.push(list);
  }
}
