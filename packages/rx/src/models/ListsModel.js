import { observable, action } from 'mobx';
import { request } from 'graphql-request';

import Queries from '../queries';
import ListModel from './ListModel';

export default class ListsModel {
  @observable lists = [];

  constructor() {
    this.fetchLists();
  }

  @action
  fetchLists() {

    /* let data = [
      {
        "listId": 4,
        "name": "BACKLOG",
        "positionId": 4,
        "status": "ACTIVE"
      },
      {
        "listId": 5,
        "name": "FUTURE",
        "positionId": 5,
        "status": "INACTIVE"
      },
      {
        "listId": 7,
        "name": "AGILE",
        "positionId": 7,
        "status": "ACTIVE"
      }
    ]; */
    request('/api', Queries.fetchAllTasks)
    .then(data => (
        data.lists.filter(list => list.status === 'ACTIVE')
    ))
    .then( lists => lists.map( list => 
      this.lists.push(new ListModel(list)
    )))
  }

  @action
  addList(list) {
    this.lists.push(list);
  }
}
