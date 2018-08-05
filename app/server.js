require('./config');

const express = require('express');
// express cluster
const bodyParser = require('body-parser');
const logger = require('./config/logger');
const routes = require('./routes');


const app = express();

// set app constants
app.set('host', '127.0.0.1');
app.set('port', process.env.PORT || 3001);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// mount the routes
app.use(routes);

app.listen(app.get('port'), () => {
  logger.info('App is running at http://localhost:%d in %s mode', app.get('port'), app.get('env'));
  logger.info('  Press CTRL-C to stop\n');
});

exports = app;
