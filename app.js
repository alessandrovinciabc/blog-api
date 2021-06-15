const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const logger = require('morgan');

app.use(logger('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/* Routes */
const indexRouter = require('./routes/index');

app.use('/', indexRouter);

module.exports = app;
