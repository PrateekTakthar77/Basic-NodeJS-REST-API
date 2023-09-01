const express = require('express')
const router = express.Router();
const path = require('path')
const categoryController = require('../controllers/category.controller')

router.post('/up', categoryController.createMargin)
router.get('/', categoryController.getMarginByCategory) // getting some errors in this 

module.exports = router;