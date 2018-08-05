const mongoose = require('mongoose');

const Account = mongoose.model('Account');

exports.signIn = async (email, password) => {
  const account = await Account.findOne({ email });
  if (!account || !account.authenticate(password)) {
    return null;
  }
  return account.generateJWT();
};
