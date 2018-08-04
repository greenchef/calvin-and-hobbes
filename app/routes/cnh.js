const app = module.exports = require('express')();
const boom = require('boom');
const asyncWrap = require('./asyncMiddleware');
const { randomCalvinQuote, searchCalvinQuote, asyncerror, rejectMe, justThrowIt } = require('../actions/cnh');

app.get('/random', asyncWrap(async (req, res) => {
  const quote = await randomCalvinQuote();
  res.status(200).send(quote);
}));

app.post('/search', asyncWrap(async (req, res) => {
  const quote = await searchCalvinQuote(req.body.term);
  if (!quote) {
    throw boom.notFound('a quote matching your search could not be found');
  }
  res.status(200).send(quote);
}));

app.get('/asyncerror', asyncWrap(async (req, res) => {
  const unhandledErr = await asyncerror();
  res.status(200).send('this will not be sent');
}));

app.get('/rejectme', asyncWrap(async (req, res) => {
  const unhandledErr = await rejectMe();
  res.status(200).send('this will not be sent');
}));

app.get('/justthrowit', asyncWrap(async (req, res) => {
  await justThrowIt();
  res.status(200).send('this will not be sent');
}));
