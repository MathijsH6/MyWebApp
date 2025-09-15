const locationService = require('../services/location.service');

function list(req, res) {
  locationService.fetchAllLocations((err, locations) => {
    if (err) {
      res.status(500).send('Database fout');
    } else {
      res.render('locations', {
        locations,
        customer_id: req.session.customer_id || null,
        favoriteIds: []
      });
    }
  });
}

module.exports = { list };