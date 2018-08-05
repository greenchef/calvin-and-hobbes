const Quote = require('mongoose').model('Quote');

exports.random = async () => {
  const count = await Quote.count();
  const skip = Math.floor(Math.random() * count);
  return Quote.findOne().skip(skip);
};

exports.search = (term) => {
  const search = new RegExp(term, 'i');
  return Quote.find({ body: search });
};

exports.rejectMe = () => {
  const pr = new Promise((resolve, reject) => {
    reject(new Error('you are not my type'));
  });
  return pr;
};

exports.justThrowIt = () => {
  throw new Error('I threw it');
};

exports.incrementFavCount = async (id) => {
  let quote = await Quote.findById(id);
  quote.favCount = quote.favCount += 1;
  quote = await quote.save();
  return quote;
};
