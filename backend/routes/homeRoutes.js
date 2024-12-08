const express = require('express');
const homeController = require('./../controllers/homeController');

const router = express.Router();

router.route('/contact').post(homeController.sendContactMessage);
module.exports = router;
