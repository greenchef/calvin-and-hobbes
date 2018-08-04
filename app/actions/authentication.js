const boom = require('boom');
const jwt = require('jsonwebtoken');
const accountSvc = require('../services/account');

exports.signIn = async (email, password) => {
  const account = await accountSvc.signIn(email, password);
  if (!account) {
    throw boom.unauthorized('email or password is incorrect');
  } else {
    return jwt.sign({ id: account.id }, process.env.JWT_SECRET, { expiresIn: 1000 * 60 });
  }
};
