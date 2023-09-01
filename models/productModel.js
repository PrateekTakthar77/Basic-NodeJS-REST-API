const mongoose = require('mongoose');

const productschema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter a Product name"]
        },
        price: {
            type: Number,
            required: true
        },
        margin: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            default: 0
        },
        image: {
            type: String,
            required: false
        },
        count: {
            type: Number,
            default: 0
        },
        category: {
            type: String,
        }
    },
    {
        timestamps: true
    },
)

const Product = mongoose.model("product", productschema);

module.exports = Product;