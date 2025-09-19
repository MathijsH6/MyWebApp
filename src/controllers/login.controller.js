const service = require('../services/login.service');

function showLogin(req, res) {
  res.render('login', { customer_id: req.session.customer_id || null, favoriteIds: [], error: null });
}

function login(req, res) {
  const { email, password } = req.body;
  service.authenticate(email, password, (err, user) => {
    if (!user) {
      return res.status(401).render('login', {
        error: 'Geen bestaand account met deze gegevens.',
        customer_id: null,
        favoriteIds: [],
      });
    }
    req.session.customer_id = user.customer_id;
    res.redirect('/');
  });
}

function logout(req, res) {
  req.session.destroy(() => res.redirect('/login'));
}

module.exports = { showLogin, login, logout };