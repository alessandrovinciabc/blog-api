const router = require('express').Router();

const passport = require('passport');

router
  .route('/post')
  .all((req, res, next) => {
    if (['POST', 'DELETE', 'PUT'].includes(req.method)) {
      return passport.authenticate('jwt', { session: false })(req, res, next);
    }
    next();
  })
  .get((req, res) => {
    res.json('...');
  })
  .post((req, res) => {})
  .delete((req, res) => {})
  .put((req, res) => {});

module.exports = router;
