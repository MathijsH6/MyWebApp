const bcrypt = require('bcrypt');
const dao = require('../dao/login.dao');

function authenticate(email, password, cb) {
  dao.findByEmail(email, (err, user) => {
    if (err || !user) return cb(null, false);
    bcrypt.compare(password, user.password || '', (cmpErr, match) => {
      if (cmpErr || !match) return cb(null, false);
      cb(null, user);
    });
  });
}

module.exports = { authenticate };