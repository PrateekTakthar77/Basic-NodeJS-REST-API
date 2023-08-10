const Product = require('../models/productModel');

// get all products
const getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products);
    } catch (error) {
        console.log(error)
        res.status(503).json({ message: error.message })
    }
}
// get Single Product by ID
const getProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id)
        res.status(200).json(product);
    } catch (error) {
        console.log(error)
        res.status(503).json({ message: error.message })
    }
}
// get Single Product by ID and update
const getProductByIdUpdate = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body)
        if (!product) {
            res.status(403).json({ message: `cannot find any product with id ${id}` })
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}
// create Product
const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);
    } catch (error) {
        console.log(error)
        res.status(503).json({ message: error.message })
    }
}
// delete Product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id)
        if (!product) {
            res.status(403).json({ message: `cannot find any product with id ${id}` })
        }
        res.status(200).json(product);
    } catch (error) {
        console.log(error)
        res.status(503).json({ message: error.message })
    }
}

module.exports = { getAllProducts, getProductById, getProductByIdUpdate, createProduct, deleteProduct };