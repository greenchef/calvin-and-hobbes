const bunyan = require('bunyan');

const logger = bunyan.createLogger({
  name: 'calvin_and_hobbes',
  stream: process.stdout,
  level: 'info',
});

module.exports = logger;
