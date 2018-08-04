const mongoose = require('mongoose');

const { Schema } = mongoose;

const quoteSchema = new Schema({
  body: String,
  size: {
    type: String,
    enum: ['sm', 'md', 'lg'],
    default: 'lg',
  },
  rating: Number,
});

mongoose.model('Quote', quoteSchema);
