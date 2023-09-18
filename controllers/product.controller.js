const Product = require('../models/productModel');
const Margin = require('../models/categoryModel')

// get all products
const getAllProducts = async (req, res, next) => {
    const { search } = req.query;
    try {
        let products;
        if (search) {
            products = await Product.find({
                $or: [
                    { name: new RegExp(search, 'i') },
                ],
            });
        } else {
            products = await Product.find();
        }
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
        // without if condition 
        // const { category } = req.body;
        // // Find the corresponding Margin document for the category
        // const margin = await Margin.findOne({ category });

        // if (!margin) {
        //     return res.status(404).json({ message: "Category not found in Margin collection" });
        // }

        const { category, subcategory } = req.body;
        let quantity;

        // Find the corresponding Margin document based on category and subcategory
        if (category === "chains") {
            // Check both category and subcategory
            const margin = await Margin.findOne({ category, subcategory });

            if (!margin) {
                return res.status(404).json({ message: "Category and subcategory not found in Margin collection" });
            }

            quantity = margin.quantity;
        } else {
            // If category is not "chains," only check category
            const margin = await Margin.findOne({ category });

            if (!margin) {
                return res.status(404).json({ message: "Category not found in Margin collection" });
            }

            quantity = margin.quantity;
        }
        // Use the retrieved quantity to set the product's quantity
        const productData = {
            ...req.body,
            // quantity: margin.quantity,
            quantity
        };
        // Increment product count in the database
        const product = await Product.create(productData)
        await Product.updateMany({}, { $inc: { count: 1 } });
        res.status(200).json(product);
    } catch (error) {
        console.log(error)
        res.status(503).json({ message: error.message })
    }
}

// Add Multiple products (accessible to Dealer and Admin)
const addMultipleProducts = async (req, res) => {
    try {
        const { products } = req.body;
        console.log(typeof products);
        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({
                error: "Invalid request body. Expected an array of products.",
            });
        }

        const createdProducts = await Product.create(products);

        res.status(201).json({
            message: "Products added successfully",
            products: createdProducts,
        });
    } catch (error) {
        res
            .status(500)
            .json({ payload: null, message: error.message || "An error occurred" });
    }
};

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

const updatePricesByCategory = async (req, res) => {
    try {
        const { category, newPrice, newQuantity } = req.body;

        // Update the prices of products with the same category
        const updateResult = await Product.updateMany(
            { category: category },
            { $set: { price: newPrice, quantity: newQuantity } },
        );

        if (updateResult.nModified === 0) {
            return res.status(404).json({
                message: `No products found with category ${category}`,
            });
        }

        res.status(200).json({
            message: `Prices updated for products with category ${category}`,
            updatedCount: updateResult.nModified,
        });
    } catch (error) {
        res
            .status(500)
            .json({ message: error.message || "An error occurred" });
    }
};


module.exports = { getAllProducts, getProductById, getProductByIdUpdate, createProduct, deleteProduct, addMultipleProducts, updatePricesByCategory };