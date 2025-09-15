const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('contact', { title: 'Contact', customer_id: req.session.customer_id || null, favoriteIds: [] });
});

module.exports = router;