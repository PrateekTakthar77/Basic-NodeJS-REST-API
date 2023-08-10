const express = require('express')
const router = express.Router();
const Product = require('../models/productModel')
const productController = require('../controllers/product.controller')
// get all products
router.get('/', productController.getAllProducts);

// get Single Product by ID
router.get('/:id', productController.getProductById)

// get Single Product by ID and update
router.put('/:id', productController.getProductByIdUpdate);
// create Product
router.post('/', productController.createProduct);
// delete Product
router.delete('/:id', productController.deleteProduct)

module.exports = router;
