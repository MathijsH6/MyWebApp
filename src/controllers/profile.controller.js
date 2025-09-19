const service = require('../services/profile.service');

function showForm(req, res) {
  if (!req.session.customer_id) {
    return res.redirect('/login');
  }
  service.getFormData(req.session.customer_id, (err, user) => {
    res.render('profile', {
      customer_id: req.session.customer_id,
      user: null,
      error: err ? 'Kon profiel laden.' : null
    });
  });
}

function update(req, res) {
  const data = req.body;
  service.updateProfile(req.session.customer_id, data, (err) => {
    if (err) {
      return res.status(500).render('profile', {
        customer_id: req.session.customer_id,
        user: data,
        error: 'Bijwerken mislukt.',
        success: null
      });
    }
    // Succes: geef een succesmelding mee
    res.render('profile', {
      customer_id: req.session.customer_id,
      user: data,
      error: null,
      success: 'Je profiel is succesvol aangepast!'
    });
  });
}

module.exports = { showForm, update };