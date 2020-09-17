const { Product } = require('../models');

const getProducts = async(req, res, next) => {
    const products = await Product.find({}).limit(4);

    return res.status(200).json(products);
}

module.exports = {
    getProducts,
}