const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  adoptionType: {
    type: String,
    enum: ['обычное усыновление', 'усыновление с улицы'],
    required: true,
  },
  animalType: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  details: String,
  title: String,
  status: {
    type: String,
    enum: ['открыто', 'в процессе', 'закрыто'],
    default: 'открыто',
  },
});

module.exports = mongoose.model('Post', PostSchema);
