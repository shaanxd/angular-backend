const { Product } = require('../models');
const CustomError = require('../exception/error');

const getProducts = async(req, res, next) => {
    const products = await Product.find({}).limit(4);

    return res.status(200).json(products);
}

const getProductById = async(req, res, next) => {
    const {params: {id}} = req;

    const product = await Product.findById(id);

    if (!product) {
        throw new CustomError(404, "Product not found.");
    }
    return res.status(200).json(product);
}

module.exports = {
    getProducts,
    getProductById,
}