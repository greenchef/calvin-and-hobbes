const app = module.exports = require('express')();
const asyncWrap = require('./asyncMiddleware');
const { signIn } = require('../actions/authentication');

app.post('/signin', asyncWrap(async (req, res) => {
  // Note that we pull data off of req here, do not pass along req object.
  const token = await signIn(req.body.email, req.body.password);
  res.status(200).json({ token });
}));

app.post('/signout', asyncWrap(async (req, res) => {
}));
