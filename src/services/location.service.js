const locationDao = require('../dao/location.dao');

function fetchAllLocations(callback) {
  locationDao.getAllLocations(callback);
}

module.exports = { fetchAllLocations };