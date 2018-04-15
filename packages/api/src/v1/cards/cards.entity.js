const mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

const CARD_STATUS = ['ACTIVE', 'INACTIVE']

let schema = new mongoose.Schema({
    cardId: { type: Number, required: true, unique: true, default: 0 },
    listId: { type: Number, required: true },
    name: { type: String, required: true },
    positionId: { type: Number, required: true },
    status: { type: String, enum: CARD_STATUS, default: 'ACTIVE', required: true }
}, { collection: 'cards'});

autoIncrement.initialize(mongoose.connection);

schema.plugin(autoIncrement.plugin, {
  model: 'cards',
  field: 'cardId',
  startAt: 1,
  incrementBy: 1
});

schema.plugin(autoIncrement.plugin, {
  model: 'cards',
  field: 'positionId',
  startAt: 1,
  incrementBy: 1
});

module.exports = mongoose.model('cards', schema);