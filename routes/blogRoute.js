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

router.use(authMiddleware);

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

router.route('/post').get(controller.getPosts).post(controller.postPost);

router
  .route('/post/:postid')
  .get(controller.getPost)
  .delete(controller.deletePost)
  .put(controller.putPost);

/* Comments */
router
  .route('/post/:postid/comment')
  .get(controller.getComments)
  .post(controller.postComment);

router.route('/post/:postid/comment/:commentid').get().delete().put();

module.exports = router;
