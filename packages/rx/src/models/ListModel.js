import { observable, action } from 'mobx';


export default class ListModel {
  @observable listId;
  @observable name;
  @observable positionId;
  @observable status;

  constructor(list) {
    this.listId = list.listId;
    this.name = list.name;
    this.positionId = list.positionId;
    this.status = list.status;
    this.cards = list.cards;
  }
