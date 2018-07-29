const crypto = require('crypto');
const secret = 'abcdefg';

exports.getHash = (password) => {
  return crypto.createHmac('sha256', secret)
    .update(password)
    .digest('hex');
};
