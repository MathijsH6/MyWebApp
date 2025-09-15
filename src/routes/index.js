const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { title: 'Home', films: [], customer_id: req.session.customer_id || null, favoriteIds: [] });
});

module.exports = router;