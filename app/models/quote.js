const mongoose = require('mongoose');

const { Schema } = mongoose;

const quoteSchema = new Schema({
  body: String,
  stripNumber: String,
  favCount: {
    type: Number,
    default: 0,
  },
});

mongoose.model('Quote', quoteSchema);
