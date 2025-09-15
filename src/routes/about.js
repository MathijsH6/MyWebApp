const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('about', { title: 'Over ons', customer_id: req.session.customer_id || null, favoriteIds: [] });
});

module.exports = router;