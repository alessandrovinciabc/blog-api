const express = require('express');
const app = express();

const cors = require('cors');

var whitelist = [
  'https://alessandrovinciabc.github.io',
  'http://localhost:3001',
];
var options = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(options));

require('./models/setupMongoose')();

const cookieParser = require('cookie-parser');
const logger = require('morgan');
const compression = require('compression');
const helmet = require('helmet');

app.use(logger('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(compression());
app.use(helmet());

const passport = require('passport');
require('./setupPassport')();
app.use(passport.initialize());

/* Routes */
const indexRouter = require('./routes/indexRoute');
const authRoute = require('./routes/authRoute');
const blogRoute = require('./routes/blogRoute');

app.use('/', indexRouter);
app.use('/auth', authRoute);
app.use('/blog', blogRoute);

module.exports = app;
