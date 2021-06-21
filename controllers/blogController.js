const { body, validationResult } = require('express-validator');
const filterHTML = require('../util/sanitizeHTML');

const Post = require('../models/postModel');

let controller = {};

/****************** /post  ******************/

controller.getPost = (req, res) => {
  res.json(req.postDoc);
};

controller.getPosts = (req, res) => {
  Post.find({})
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Something unexpected happened.' });
    });
};

controller.postPost = [
  body('title').exists({ checkFalsy: true }).isString().trim().escape(),
  body('html')
    .exists({ checkFalsy: true })
    .isString()
    .trim()
    .customSanitizer(filterHTML),
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ error: 'Invalid request.' });

    const { title, html } = req.body;

    Post.create({ title, html })
      .then((doc) => {
        res.json(doc);
      })
      .catch((err) => {
        res.status(500).json({ error: 'Something unexpected happened.' });
      });
  },
];

/****************** /post/:postid  ******************/

controller.deletePost = (req, res) => {
  req.postDoc
    .remove()
    .then((product) => {
      res.json({ message: 'The post was deleted.' });
    })
    .catch((err) => {
      res.status(500).json({ error: 'Unexpected error' });
    });
};

controller.putPost = [
  body('title').exists({ checkFalsy: true }).isString().trim().escape(),
  body('html')
    .exists({ checkFalsy: true })
    .isString()
    .trim()
    .customSanitizer(filterHTML),
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ error: 'Invalid request.' });

    const { title, html } = req.body;

    req.postDoc
      .set({ title, html })
      .save()
      .then((doc) => {
        res.json({ message: 'Post was updated.', doc });
      })
      .catch((err) => {
        res.status(500).json({ error: 'Something unexpected happened.' });
      });
  },
];

/****************** /post/:postid/comment  ******************/

const Comment = require('../models/commentModel');

controller.getComments = (req, res) => {
  const { postid } = req.params;

  Comment.find({ postId: postid })
    .then((docs) => {
      res.json(docs);
    })
    .catch((err) => {
      res.json({ error: 'Something unexpected happened.' });
    });
};

controller.postComment = [
  body('text')
    .exists({ checkFalsy: true })
    .isString()
    .trim()
    .isLength({ max: 255 }),
  body('owner')
    .exists({ checkFalsy: true })
    .isString()
    .trim()
    .isLength({ max: 20 }),
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ error: 'Invalid request.' });

    const { text, owner } = req.body;

    Comment.create({ text, postId: req.params.postid, owner })
      .then((doc) => {
        res.json(doc);
      })
      .catch((err) => {
        res.status(500).json({ error: 'Something unexpected happened.' });
      });
  },
];

/****************** /post/:postid/comment/:commentid  ******************/

controller.getComment = (req, res) => {
  const { commentid } = req.params;

  Comment.findById(commentid)
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.json({ error: 'Something unexpected happened.' });
    });
};

controller.deleteComment = (req, res) => {
  const { commentid } = req.params;

  Comment.findByIdAndDelete(commentid)
    .then(() => {
      res.json({ message: 'The comment was deleted.' });
    })
    .catch((err) => {
      res.status(500).json({ error: 'Unexpected error' });
    });
};

controller.putComment = [
  body('text')
    .optional({ checkFalsy: true })
    .isString()
    .trim()
    .isLength({ max: 255 }),
  body('owner')
    .optional({ checkFalsy: true })
    .isString()
    .trim()
    .isLength({ max: 20 }),
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ error: 'Invalid request.' });

    const { text, owner } = req.body;

    let updateToApply = {};
    if (!(text == null || !text)) updateToApply.text = text;
    if (!(owner == null || !owner)) updateToApply.owner = owner;

    Comment.findByIdAndUpdate(req.params.commentid, updateToApply, {
      new: true,
    })
      .then((doc) => {
        res.json({ message: 'Comment was updated.', doc });
      })
      .catch((err) => {
        res.status(500).json({ error: 'Something unexpected happened.' });
      });
  },
];

module.exports = controller;
