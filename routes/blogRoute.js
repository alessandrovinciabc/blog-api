const router = require('express').Router();

const passport = require('passport');
const controller = require('../controllers/blogController');

const Post = require('../models/postModel');

function authMiddleware(req, res, next) {
  if (['POST', 'DELETE', 'PUT'].includes(req.method)) {
    return passport.authenticate('jwt', { session: false })(req, res, next);
  }
  next();
}

router.param('postid', (req, res, next, id) => {
  Post.findById(id)
    .then((doc) => {
      req.postDoc = doc;
      return next();
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ error: 'Unexpected error.' });
    });
});

router
  .route('/post')
  .all(authMiddleware)
  .get(controller.getPosts)
  .post(controller.postPost);

router
  .route('/post/:postid')
  .all(authMiddleware)
  .get(controller.getPost)
  .delete(controller.deletePost)
  .put(controller.putPost);

/* Comments */
router
  .route('/post/:postid/comment')
  // No auth middleware to allow everyone to post comments
  .get(controller.getComments)
  .post(controller.postComment);

router
  .route('/post/:postid/comment/:commentid')
  .all(authMiddleware)
  .get(controller.getComment)
  .delete(controller.deleteComment)
  .put(controller.putComment);

module.exports = router;
