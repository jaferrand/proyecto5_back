const express = require('express');

const { getProducts, createProduct } = require('../controllers/product.controller');

const productRouter = express.Router()

productRouter.route('/product')
    .post(createProduct)
    .get(getProducts)

module.exports = productRouter;