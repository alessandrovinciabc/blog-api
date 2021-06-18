const { body, validationResult } = require('express-validator');
const filterHTML = require('../util/sanitizeHTML');

const Post = require('../models/postModel');

let controller = {};

controller.postPost = [
  body('title').exists({ checkFalsy: true }).isString().trim().escape(),
  body('html')
    .exists({ checkFalsy: true })
    .isString()
    .trim()
    .customSanitizer(filterHTML),
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) res.status(400).json({ error: 'Invalid request.' });

    const { title, html } = req.body;

    Post.create({ title, html })
      .then((doc) => {
        res.json(doc);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'Something unexpected happened.' });
      });
  },
];

module.exports = controller;
