const express = require('express')
const router = express.Router();
const path = require('path')
const productController = require('../controllers/product.controller')
// getting error in the path 
// const productController = require(path.join(__dirname, 'controllers', 'product.controller'))
// get all products
router.get('/', productController.getAllProducts);

// get Single Product by ID
router.get('/:id', productController.getProductById)

// get Single Product by ID and update
// router.put('/:id', productController.getProductByIdUpdate);
// create Product
router.post('/', productController.createProduct);
// bulk
router.post('/bulk', productController.addMultipleProducts);
// delete Product
router.delete('/:id', productController.deleteProduct)

router.put('/update', productController.updatePricesByCategory)
module.exports = router;
