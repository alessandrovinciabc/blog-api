const mongoose = require('mongoose');

module.exports = function () {
  mongoose.connect(process.env.MONGODB_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  mongoose.connection.on('connected', () => {
    console.log('Mongoose: connection established.');
  });

  mongoose.connection.on('error', () => {
    console.log('Mongoose: connection error.');
  });
};
