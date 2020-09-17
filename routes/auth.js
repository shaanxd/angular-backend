const express = require('express');

const controller = require('../controllers/auth');
const wrap = require('../util/wrap');

const router = express.Router();

router.post('/authenticate', wrap(controller.authenticate));

router.post('/register', wrap(controller.register));

module.exports = router;