import gql from 'graphql-tag';

const fetchAllLists = gql`
  {
    lists {
      listId
      name
      positionId
      status
    }
     cards {
      listId
      cardId
      name
      positionId
      status
    }
  }
`;

const fetchOneList = gql`
  {
    list(listId: $listId) {
      listId
      name
    }
  }
`;

const updateOneList = gql`
  mutation AnyName($list: ListUpdate!) {
    updateList(list: $list) {
      listId
      positionId
      status
      name
    }
  }
`;
const updateOneCard = gql`
  mutation updateCard($card: CardUpdate!) {
    updateCard(card: $card) {
      listId
      cardId
      positionId
      status
      name
    }
  }
`;
const createOneList = gql`
  mutation createList($list: ListInput!) {
    addNewList(list: $list) {
      name
    }
  }
`;
const createOneCard = gql`
  mutation createCard($card: CardInput!) {
    addNewCard(card: $card) {
      name,
      listId
    }
  }
`;

export default {
    fetchAllLists,
    fetchOneList,
    updateOneList,
    updateOneCard,
    createOneList,
    createOneCard
}
