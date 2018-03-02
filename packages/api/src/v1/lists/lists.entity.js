const mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

const LIST_STATUS = ['ACTIVE', 'INACTIVE']

let schema = new mongoose.Schema({
    listId: { type: Number, required: true, unique: true, default: 0 },
    name: { type: String, required: true },
    positionId: { type: Number, required: true },
    status: { type: String, enum: LIST_STATUS, default: 'ACTIVE', required: true }
}, { collection: 'lists'});

autoIncrement.initialize(mongoose.connection);

schema.plugin(autoIncrement.plugin, {
  model: 'lists',
  field: 'listId',
  startAt: 1,
  incrementBy: 1
});

schema.plugin(autoIncrement.plugin, {
  model: 'lists',
  field: 'positionId',
  startAt: 1,
  incrementBy: 1
});

module.exports = mongoose.model('lists', schema);