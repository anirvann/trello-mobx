const ListModel = require('./lists.entity');

const addList = function(newList, done) {
  let list = new ListModel();
  list.name = newList.name;
  list.status = 'ACTIVE';

  list.save(function(err, result) {
    if (err) {
      console.error('Error persisting new List :: ', err);
      done(err);
      return;
    }
    done(null, result);
    return;
  });
};

const updateListById = function(listObj, done) {
  let query = { "listId": +listObj.listId };
  let modification = {
    $set: {
      positionId: listObj.positionId,
      status: listObj.status,
      name: listObj.name
    }
  };
  let options = {
    new: true, //return the updated document
    upsert: false //don't insert if not found
  };

  ListModel.findOneAndUpdate(query, modification, options, function(err, result) {
    if (err) {
      console.error('Error persisting new List :: ', err);
      done(err);
      return;
    }
    done(null, result);
    return;
  });
};

const getLists = function(done) {
  let query = {};
  let options = null;

  ListModel.find(query)
    .select(options)
    .exec((err, colln) => {
      if (err) {
        console.error('Error fetching all lists :: ', err);
        done(err);
        return;
      }
      done(null, colln);
    });
};

const getListById = function(listId, done) {
  let query = { listId: listId };

  ListModel
    .findOne(query)
    .select()
    .exec((err, result) => {
      if (err) {
        console.error('Error getting List by ID :: ', err);
        done(err);
        return;
      }
      done(null, result);
    });
};

module.exports = {
  addList,
  updateListById,
  getLists,
  getListById
};
