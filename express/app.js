var createError = require('http-errors');
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOverride = require('method-override');
var cors = require('cors');

var apiRouter = require('./routes/api');
var indexRouter = require('./routes/index');
var cerebrosIndexRouter = require('./routes/cerebros');
var usersRouter = require('./routes/users');

var app = express();

//Conexion a la base de datos
mongoose.connect("mongodb://localhost:27017/final_registro5A");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.use('/api', apiRouter);
app.use('/zombies', indexRouter);
app.use('/users', usersRouter);
app.use('/cerebro', cerebrosIndexRouter);

app.use('/css',express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/css',express.static(__dirname+'/node_modules/@fortawesome/fontawesome-free'));

app.use(methodOverride('_method'));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
