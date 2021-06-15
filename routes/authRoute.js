const router = require('express').Router();

const passport = require('passport');

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

module.exports = router;
