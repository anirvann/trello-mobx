const cardService = require('./cards.service');

const addCard = function(newCard, done){
    cardService.addCard(newCard, done);
};


const updateCardById = function(cardObj, done) {
    cardService.updateCardById(cardObj, done);
};


const getCards = function(done){
    cardService.getCards(done);
};


const getCardById = function(cardId, done) {
    cardService.getCardById(cardId, done);
};

module.exports = {
    addCard,
    getCards,
    updateCardById,
    getCardById
};