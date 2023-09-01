const Margin = require('../models/categoryModel')

// Create a new margin entry
const createMargin = async (req, res) => {
    try {
        const { category, quantity } = req.body;
        const margin = new Margin({ category, quantity });
        await margin.save();
        return res.status(201).json(margin);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Get margin values by category
const getMarginByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const margin = await Margin.findOne({ category: categoryId }).populate('category');
        if (!margin) {
            return res.status(404).json({ message: 'Margin not found for the category' });
        }
        return res.status(200).json(margin);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { createMargin, getMarginByCategory };