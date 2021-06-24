const mongoose = require('mongoose');
const debug = require('debug')('blog-api:mongoose');

module.exports = function () {
  mongoose.connect(process.env.MONGODB_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  mongoose.connection.on('connected', () => {
    debug('Connection established.');
  });

  mongoose.connection.on('error', () => {
    debug('Connection error.');
  });
};
