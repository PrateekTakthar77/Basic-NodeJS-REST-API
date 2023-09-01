const mongoose = require('mongoose');

const marginSchema = new mongoose.Schema({
    category: {
        type: String
    },
    quantity: {
        type: Number,
        required: true,
    },
});

const Margin = mongoose.model('Margin', marginSchema);

module.exports = Margin;
