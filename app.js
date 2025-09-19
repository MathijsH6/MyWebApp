var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

// Gebruik routers uit de juiste map
var indexRouter = require('./src/routes/index');
//var usersRouter = require('./src/routes/users');
var filmsRouter = require('./src/routes/movie.routes');
var aboutRouter = require('./src/routes/about');
var contactRouter = require('./src/routes/contact');
var locationsRouter = require('./src/routes/locations');
var favoritesRouter = require('./src/routes/favorites');
var registerRouter = require('./src/routes/register');
var loginRouter = require('./src/routes/login');
var profileRouter = require('./src/routes/profile');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));

// Session setup (add this before your routers)
app.use(session({
  secret: 'your_secret_key', // Change this to a secure value!
  resave: false,
  saveUninitialized: false
}));

// Routers
app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use('/films', filmsRouter);
app.use('/about', aboutRouter);
app.use('/contact', contactRouter);
app.use('/locations', locationsRouter);
app.use('/favorites', favoritesRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/profile', profileRouter);

// Optional: direct /login to usersRouter for login POST
//app.use('/login', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
