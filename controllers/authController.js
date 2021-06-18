const passport = require('passport');
const jwt = require('jsonwebtoken');

let controller = {};

controller.postLogin = [
  passport.authenticate('local', { session: false }),
  (req, res) => {
    jwt.sign(
      req.user,
      process.env.JWT_SECRET,
      { expiresIn: '7d' },
      (err, token) => {
        if (err)
          return res
            .status(500)
            .json({ message: 'Something went wrong. Try again' });

        res.json({ jwt: token });
      }
    );
  },
];

controller.postTest = [
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({ message: 'token confirmed.', newUser: req.user });
  },
];

module.exports = controller;
