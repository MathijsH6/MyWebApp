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

module.exports = { validateRegister };