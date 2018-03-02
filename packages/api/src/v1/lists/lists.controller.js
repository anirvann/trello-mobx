const listService = require('./lists.service');

const addList = function(newList, done){
    listService.addList(newList, done);
};


const updateListById = function(listObj, done) {
    listService.updateListById(listObj, done);
};


const getLists = function(done){
    listService.getLists(done);
};


const getListById = function(listId, done) {
    listService.getListById(listId, done);
};

module.exports = {
    addList,
    getLists,
    updateListById,
    getListById
};