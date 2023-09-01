const Margin = require('../models/categoryModel')

// Create a new margin entry
const createMargin = async (req, res) => {
    try {
        const { category, quantity, subcategory } = req.body;
        const margin = new Margin({ category, quantity, subcategory });
        await margin.save();
        return res.status(201).json(margin);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { createMargin };