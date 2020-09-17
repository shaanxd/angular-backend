const express = require('express');

const wrap = require('../util/wrap');
const controller = require('../controllers/product');

const router = express.Router();

router.get('/', wrap(controller.getProducts));

router.get('/:id', wrap(controller.getProductById));

module.exports = router;