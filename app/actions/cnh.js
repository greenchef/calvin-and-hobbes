// Business logic that a route needs to perfom that is not shared functionality lives here.
// Ours will be much more complicated. e.g. call this service and then call another
// service with that response data then compute some stuff and return the result.

const Boom = require('boom');
const calvinQuoter = require('../services/calvinQuoter');
const QuoteFavJob = require('../jobs/quoteFav');

const timeout = (ms) => {
  return new Promise(resolve => setTimeout(resolve('this is a test'), ms));
};

exports.randomCalvinQuote = () => {
  return calvinQuoter.random();
};

exports.searchCalvinQuote = (term) => {
  return calvinQuoter.search(term);
};

exports.asyncerror = async () => {
  // do some things that are async and throw an exception
  const test = await timeout(3000);
  if (test === 'this is a test') throw Boom.teapot('testing a throw from action');
};

exports.rejectMe = async () => {
  // normal js error throw from a promise we don't control
  const test = await calvinQuoter.rejectMe();
};

exports.justThrowIt = async () => {
  await timeout(3000);
  calvinQuoter.justThrowIt();
};

exports.enqueueJob = async (data) => {
  QuoteFavJob.enqueue(data);
};
