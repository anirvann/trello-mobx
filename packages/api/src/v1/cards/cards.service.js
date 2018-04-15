const CardModel = require('./cards.entity');

const addCard = function(newCard, done) {
  let card = new CardModel();
  card.name = newCard.name;
  card.listId = newCard.listId;
  card.status = 'ACTIVE';

  card.save(function(err, result) {
    if (err) {
      console.error('Error persisting new card :: ', err);
      done(err);
      return;
    }
    done(null, result);
    return;
  });
};

const updateCardById = function(cardObj, done) {
  let query = { "cardId": + cardObj.cardId };
  let modification = {
    $set: {
      listId: cardObj.listId,
      positionId: cardObj.positionId,
      status: cardObj.status,
      name: cardObj.name
    }
  };
  let options = {
    new: true, //return the updated document
    upsert: false //don't insert if not found
  };

  CardModel.findOneAndUpdate(query, modification, options, function(err, result) {
    if (err) {
      console.error('Error persisting new card :: ', err);
      done(err);
      return;
    }
    done(null, result);
    return;
  });
};

const getCards = function(done) {
  let query = {};
  let options = null;

  CardModel.find(query)
    .select(options)
    .exec((err, colln) => {
      if (err) {
        console.error('Error fetching all cards :: ', err);
        done(err);
        return;
      }
      done(null, colln);
    });
};

const getCardById = function(cardId, done) {
  let query = { cardId: cardId };

  CardModel
    .findOne(query)
    .select()
    .exec((err, result) => {
      if (err) {
        console.error('Error getting card by ID :: ', err);
        done(err);
        return;
      }
      done(null, result);
    });
};

const getCardsByListId = function(listsId, done) {
  let query = { "listId": + listId, status: 'ACTIVE' };

  CardModel
    .find(query)
    .select()
    .exec((err, result) => {
      if (err) {
        console.error('Error getting cards by listId :: ', err);
        done(err);
        return;
      }
      done(null, result);
    });
};

module.exports = {
  addCard,
  updateCardById,
  getCards,
  getCardById,
  getCardsByListId
};
