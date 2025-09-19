const pool = require('./db');

function insertAddress(formData, callback) {
  const cityQuery = 'SELECT city_id FROM city WHERE city = ?';
  pool.query(cityQuery, [formData.city], function(err, cityResults) {
    if (err) {
      return callback(err);
    }
    if (cityResults.length === 0) {
      return callback(new Error('City not found'));
    }

    const cityId = cityResults[0].city_id;

    const sql = `
      INSERT INTO address
        (address, address2, district, city_id, postal_code, phone, location)
      VALUES (?, ?, ?, ?, ?, ?, POINT(0,0))
    `;
    pool.query(
      sql,
      [
        formData.address1,
        formData.address2 || null,
        formData.district,
        cityId,
        formData.postcode,
        formData.phone
      ],
      function(err, result) {
        if (err) {
          return callback(err);
        }
        callback(null, result.insertId);
      }
    );
  });
}

function insertCustomer(formData, addressId, callback) {
  const storeId = 1;
  const sql = `
    INSERT INTO customer
      (store_id, first_name, last_name, email, address_id, active, create_date, password)
    VALUES (?, ?, ?, ?, ?, 1, NOW(), ?)
  `;
  pool.query(
    sql,
    [
      storeId,
      formData.firstname,
      formData.lastname,
      formData.email,
      addressId,
      formData.password
    ],
    function(err, result) {
      if (err) {
        return callback(err);
      }
      callback(null, result.insertId);
    }
  );
}

function findCustomerByEmail(email, callback) {
  const sql = 'SELECT customer_id FROM customer WHERE email = ?';
  pool.query(sql, [email], function(err, results) {
    if (err) return callback(err);
    callback(null, results.length > 0); 
  });
}

module.exports = { insertAddress, insertCustomer, findCustomerByEmail };