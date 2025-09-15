const pool = require('./db');

function getAllLocations(callback) {
  pool.query(
    `SELECT store_id, address.address, address.district, address.postal_code, city.city 
     FROM store 
     JOIN address ON store.address_id = address.address_id 
     JOIN city ON address.city_id = city.city_id`,
    (error, results) => {
      callback(error, results);
    }
  );
}

module.exports = { getAllLocations };