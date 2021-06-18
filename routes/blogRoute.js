const router = require('express').Router();

const passport = require('passport');

const controller = require('../controllers/blogController');

function authMiddleware(req, res, next) {
  if (['POST', 'DELETE', 'PUT'].includes(req.method)) {
    return passport.authenticate('jwt', { session: false })(req, res, next);
  }
  next();
}

router
  .route('/post')
  .all(authMiddleware)
  .get(controller.getPosts)
  .post(controller.postPost);

module.exports = router;
