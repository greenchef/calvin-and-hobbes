const Boom = require('boom');
const accountSvc = require('../services/account');

exports.signIn = async (email, password) => {
  const token = await accountSvc.signIn(email, password);
  if (token) {
    return token;
  }
  throw Boom.unauthorized('email or password is incorrect');
};
