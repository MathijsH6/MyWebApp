function requireLogin(req, res, next) {
  if (!req.session || !req.session.customer_id) {
    return res.redirect('/login');
  }
  next();
}

module.exports = { requireLogin };