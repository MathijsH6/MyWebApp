const bcrypt = require('bcrypt');
const dao = require('../dao/register.dao');

function registerNew(formData, callback) {
  dao.findCustomerByEmail(formData.email, (err, exists) => {
    if (err) {
      console.error('Email check error:', err);
      return callback(err);
    }
    if (exists) return callback({ code: 'EMAIL_EXISTS' });

    bcrypt.hash(formData.password, 10, (errHash, hash) => {
      if (errHash) {
        console.error('Hash error:', errHash);
        return callback(errHash);
      }
      formData.password = hash;

      dao.insertAddress(formData, (errAddr, addressId) => {
        if (errAddr) {
          console.error('Address error:', errAddr);
          return callback(errAddr);
        }

        dao.insertCustomer(formData, addressId, (errCust, customerId) => {
          if (errCust) {
            console.error('Customer error:', errCust);
            return callback(errCust);
          }
          callback(null, { customer_id: customerId });
        });
      });
    });
  });
}

module.exports = { registerNew };