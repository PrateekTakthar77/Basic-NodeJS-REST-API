require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const { Collection, default: mongoose } = require('mongoose');
const app = express()
const Product = require('./models/productModel')
// const { MongoClient } = require('mongodb');

const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: false }))

app.use(express.json())

// app.get('/',(req,res,next)=>{
//     res.status(200).json({
//         message:"Working",
//         ok: true
//     })
// })
app.get('/', (req, res, next) => {
    res.status(200).json({
        ok: true,
        message: 'working'
    })
})
app.get('/categories', (req, res, next) => {
    res.status(200).json({
        ok: true,
        data: [
            { name: "Chains", subcategory: ["stone", "whole"] },
            { name: "Rings", subcategory: ["stone", "whole"] }
        ]
    })
})

app.get('/employees', (req, res, next) => {
    let data = [
        { name: "Prateek", Profile: ["RactN",] },
        { name: "Prateek", Profile: ["RactNa",] },
        { name: "B", Profile: ["RactNative",] },
        { name: "Prateek", Profile: ["RactN",] },
        { name: "A", Profile: ["RactNative",] },
    ]
    if (req.query.profile) {
        data = data.filter((ele) => ele.Profile.includes(req.query.profile))
    }
    // User.find({Profile:{}})
    res.status(200).json({
        ok: true,
        data
    })
})

// app.get('/Products', async (req, res, next) => {
//     let data = [{ "_id": "64941d38825d2793151c9478", "name": "Silver Bracelet", "description": "A stylish silver bracelet with a heart charm.", "mrp": 60, "price": 50, "images": ["https://images.naptol.com/usr/local/csp/staticContent/product_images/horizontal/750x750/Sumangali-Jewellery-Collection-o1.jpg"], "category": { "_id": "64acdb7295c8273e8975cc16", "name": "Chains" }, "brand": "Pandora", "material": "Silver", "size": "7 inches", "color": "Silver", "reviews": [{ "rating": 5, "_id": "64941d38825d2793151c9479" }, { "rating": 4, "_id": "64941d38825d2793151c947a" }], "__v": 1, "gemstones": [], "weight": "18" },
//     { "_id": "64941d38825d2793151c947e", "name": "Diamond Earrings", "description": "A pair of sparkling diamond earrings.", "mrp": 400, "price": 300, "images": ["https://images.naptol.com/usr/local/csp/staticContent/product_images/horizontal/750x750/Sumangali-Jewellery-Collection-o1.jpg"], "category": { "_id": "64acdb7295c8273e8975cc16", "name": "chains" }, "brand": "Harry Winston", "material": "Diamond", "size": "1 carat", "color": "gold", "reviews": [{ "rating": 5, "_id": "64941d38825d2793151c947f" }, { "rating": 4, "_id": "64941d38825d2793151c9480" }], "__v": 1, "gemstones": [], "weight": "18" },
//     { "_id": "64941d38825d2793151c947b", "name": "Pearl Necklace", "description": "A delicate pearl necklace with a matching bracelet.", "mrp": 250, "price": 200, "images": ["https://images.naptol.com/usr/local/csp/staticContent/product_images/horizontal/750x750/Sumangali-Jewellery-Collection-o1.jpg"], "category": { "_id": "64acdb7295c8273e8975cc16", "name": "Plain jewellery" }, "brand": "Moissanite", "material": "Pearl", "size": "18 inches", "color": "White", "reviews": [{ "rating": 5, "_id": "64941d38825d2793151c947c" }, { "rating": 4, "_id": "64941d38825d2793151c947d" }], "__v": 1, "gemstones": [], "weight": "18" },
//     { "_id": "64970dadc7ab042f1e90ffe7", "name": "Silver Bracelet", "description": "A stylish silver bracelet with a heart charm.", "mrp": 60, "price": 50, "images": ["https://images.naptol.com/usr/local/csp/staticContent/product_images/horizontal/750x750/Sumangali-Jewellery-Collection-o1.jpg"], "category": { "_id": "64acdb7295c8273e8975cc16", "name": "full set" }, "brand": "Pandora", "material": "Silver", "size": "7 inches", "color": "Silver", "reviews": [{ "rating": 5, "_id": "64970dadc7ab042f1e90ffe8" }, { "rating": 4, "_id": "64970dadc7ab042f1e90ffe9" }], "__v": 1, "gemstones": [], "weight": "18" }]

//     // const agregatepipeline = [{ $match: { 'category.name': 'Chains' } }]
//     // let collection
//     // const result = await collection.aggregate(agregatepipeline).toArray();
//     res.status(200).json({
//         ok: true,
//         // data: result
//         data
//     })
// })

// get all products
app.get('/products', async (req, res, next) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products);
    } catch (error) {
        console.log(error)
        res.status(503).json({ message: error.message })
    }
})

// get Single Product by ID
app.get('/products:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id)
        res.status(200).json(product);
    } catch (error) {
        console.log(error)
        res.status(503).json({ message: error.message })
    }
})
// get Single Product by ID and update
app.put('/products/:id', async (req, res, next) => {
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
});
// create Product
app.post('/products', async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);
    } catch (error) {
        console.log(error)
        res.status(503).json({ message: error.message })
    }
});
// delete Product
app.delete('/products/:id', async (req, res) => {
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
})

app.post('/post/:id/friends/:id2', (req, res, next) => {
    User.findById(req.params.id)
    res.send(req.params.id);
    // })
});
// app.post

// app.delete

// app.




app.use(function (req, res, next) {
    next(createError.BadRequest);
});

app.use((err, req, res, next) => {
    res.json({
        message: err.message,
        ok: false,
    }).status(err.status || 500)
})



mongoose.connect(MONGO_URL)
    .then(() => {
        console.log("Database connected succesfully :)");
        app.listen(PORT, (err) => {
            if (err) console.log(err.message)
            console.log('app is running on port', PORT)
        })
    }).catch((error) => {
        console.log("error while connecting to the database ", error);
    })