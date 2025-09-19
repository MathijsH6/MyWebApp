const service = require('../services/register.service');

function showForm(req, res) {
  res.render('register', {
    customer_id: null,
    favoriteIds: [],
    films: [],
    user:  null,
    error: null
  });
}

function submit(req, res) {
  const data = req.body;
  service.registerNew(data, (err, result) => {
    if (err && err.code === 'EMAIL_EXISTS') {
      return res.status(400).render('register', {
        customer_id: null,
        favoriteIds: [],
        films: [],
        user: null,
        error: 'Dit e-mailadres is al in gebruik.'
      });
    }
    if (err) {
      return res.status(500).render('register', {
        customer_id: null,
        favoriteIds: [],
        films: [],
        user: null,
        error: 'Registratie mislukt.'
      });
    }
    // Optioneel: sessie zetten -> req.session.customer_id = result.customer_id;
    res.redirect('/');
  });
}

module.exports = { showForm, submit };