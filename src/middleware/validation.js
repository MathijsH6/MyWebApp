function validateRegister(req, res, next) {
  const {
    email,
    firstname,
    lastname,
    password,
    address1,
    postcode,
    city,
    country
  } = req.body;

  if (
    !email ||
    !firstname ||
    !lastname ||
    !password ||
    !address1 ||
    !postcode ||
    !city ||
    !country
  ) {
    return res.status(400).render('register', {
      error: 'Vul alle verplichte velden in.',
      customer_id: req.session.customer_id || null,
      favoriteIds: [],
      films: []
    });
  }
  // Extra checks 

  next();
}

function validateProfile(req, res, next) {
  const {
    firstname,
    lastname,
    address1,
    postcode,
    city,
    country,
    phone
  } = req.body;

  if (
    !firstname ||
    !lastname ||
    !address1 ||
    !postcode ||
    !city ||
    !country ||
    !phone
  ) {
    return res.status(400).render('profile', {
      error: 'Vul alle verplichte velden in.',
      customer_id: req.session.customer_id || null,
      user: req.body
    });
  }
  next();
}

module.exports = { validateRegister, validateProfile };