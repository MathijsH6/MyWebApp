const dao = require('../dao/profile.dao');

function getFormData(customerId, cb) {
  dao.getProfileData(customerId, cb);
}

function updateProfile(customerId, data, cb) {
  dao.updateProfile(customerId, data, cb); 
}

module.exports = { getFormData, updateProfile };