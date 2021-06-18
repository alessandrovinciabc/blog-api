const router = require('express').Router();

const controller = require('../controllers/authController');

router.post('/login', controller.postLogin);
router.post('/test', controller.postTest); //check if your JWT works

module.exports = router;
