const mongoose = require('mongoose');
const logger = require('./logger');

// Connect to MongoDB.
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });
mongoose.connection.on('error', (err) => {
  logger.error('MongoDB connection error. Please make sure MongoDB is running.');
  logger.error(err);
  process.exit();
});

require('../models');
