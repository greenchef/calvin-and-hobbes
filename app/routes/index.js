const app = module.exports = require('express')();
const boom = require('boom');
const jwt = require('express-jwt');

// Mount routes under namespace
app.use('/auth', require('./authentication'));
app.use('/v1', jwt({ secret: process.env.JWT_SECRET }));
app.use('/v1', require('./cnh'));

// server health check route
app.get('/', (_req, res) => {
  res.send({ msg: 'hello! Server is up and running' });
});

// the catch all route
app.all('*', (req, res) => {
  res.status(404).send({ msg: 'not found' });
});

// top level error handler
app.use((err, _req, res, _next) => {
  let responseErr = err;
  if (!responseErr.isBoom) {
    // error thrown by something I'm not controlling, like jwt
    responseErr = boom.boomify(responseErr, { statusCode: responseErr.status });
  }
  if (responseErr.isServer) {
    console.log(responseErr);
    // log the error... or don't
  }
  return res.status(responseErr.output.statusCode).json(responseErr.output.payload);
});
