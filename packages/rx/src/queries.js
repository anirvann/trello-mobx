export default {
  fetchAllTasks: `{
        lists{
            listId
            name
            positionId
            status
        }
    }`,
  fetchOneTask: `{
        list(listId: $listId){
            listId
            name
        }
    }`,
  updateOneTask: `mutation AnyName($list:ListUpdate!){
        updateList(list: $list){
            listId
            positionId
            status
            name
        }
    }`,
  createOneTask: `mutation Naming($list: ListInput!) {
        addNewList(list: $list) {
            listId
            name
            positionId
            status
        }
    }`
};
