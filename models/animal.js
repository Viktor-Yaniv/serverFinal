const mongoose = require('mongoose');

const AnimalSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    }
  ],
});

module.exports = mongoose.model('Animal', AnimalSchema);
