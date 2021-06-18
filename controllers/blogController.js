const { body, validationResult } = require('express-validator');
const filterHTML = require('../util/sanitizeHTML');

const Post = require('../models/postModel');

let controller = {};

controller.getPost = (req, res) => {
  res.json(req.postDoc);
};

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

module.exports = controller;
