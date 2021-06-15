const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const logger = require('morgan');

app.use(logger('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const passport = require('passport');
require('./setupPassport')();
app.use(passport.initialize());

/* Routes */
const indexRouter = require('./routes/indexRoute');
const authRoute = require('./routes/authRoute');

app.use('/', indexRouter);
app.use('/auth', authRoute);

module.exports = app;
