const pool = require('./db');

function getProfileData(customerId, callback) {
  const sql = `
    SELECT c.first_name, c.last_name, c.email, a.address, a.address2, a.district, a.postal_code, a.phone, ci.city, co.country
    FROM customer c
    JOIN address a ON c.address_id = a.address_id
    JOIN city ci ON a.city_id = ci.city_id
    JOIN country co ON ci.country_id = co.country_id
    WHERE c.customer_id = ?
  `;
  pool.query(sql, [customerId], function(err, results) {
    if (err) return callback(err);
    if (results.length === 0) return callback(new Error('No profile found'));
    callback(null, results[0]);
  });
}

function updateProfile(customerId, formData, callback) {
  const sqlCustomer = 'UPDATE customer SET first_name=?, last_name=? WHERE customer_id=?';
  pool.query(sqlCustomer, [formData.firstname, formData.lastname, customerId], function(err) {
    if (err) return callback(err);

    const sqlAddress = `
      UPDATE address SET address=?, address2=?, district=?, postal_code=?, phone=?
      WHERE address_id=(SELECT address_id FROM customer WHERE customer_id=?)
    `;
    pool.query(sqlAddress, [formData.address1, formData.address2, formData.district, formData.postal_code, formData.phone, customerId], function(err) {
      if (err) return callback(err);
      callback(null);
    });
  });
}

module.exports = {
  getProfileData,
  updateProfile
};