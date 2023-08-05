
// require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const { Collection } = require('mongoose');
const app = express()
// const { MongoClient } = require('mongodb');

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

app.get('/Products', async (req, res, next) => {
    let data = [{ "_id": "64941d38825d2793151c9478", "name": "Silver Bracelet", "description": "A stylish silver bracelet with a heart charm.", "mrp": 60, "price": 50, "images": ["https://images.naptol.com/usr/local/csp/staticContent/product_images/horizontal/750x750/Sumangali-Jewellery-Collection-o1.jpg"], "category": { "_id": "64acdb7295c8273e8975cc16", "name": "Chains" }, "brand": "Pandora", "material": "Silver", "size": "7 inches", "color": "Silver", "reviews": [{ "rating": 5, "_id": "64941d38825d2793151c9479" }, { "rating": 4, "_id": "64941d38825d2793151c947a" }], "__v": 1, "gemstones": [], "weight": "18" },
    { "_id": "64941d38825d2793151c947e", "name": "Diamond Earrings", "description": "A pair of sparkling diamond earrings.", "mrp": 400, "price": 300, "images": ["https://images.naptol.com/usr/local/csp/staticContent/product_images/horizontal/750x750/Sumangali-Jewellery-Collection-o1.jpg"], "category": { "_id": "64acdb7295c8273e8975cc16", "name": "chains" }, "brand": "Harry Winston", "material": "Diamond", "size": "1 carat", "color": "gold", "reviews": [{ "rating": 5, "_id": "64941d38825d2793151c947f" }, { "rating": 4, "_id": "64941d38825d2793151c9480" }], "__v": 1, "gemstones": [], "weight": "18" },
    { "_id": "64941d38825d2793151c947b", "name": "Pearl Necklace", "description": "A delicate pearl necklace with a matching bracelet.", "mrp": 250, "price": 200, "images": ["https://images.naptol.com/usr/local/csp/staticContent/product_images/horizontal/750x750/Sumangali-Jewellery-Collection-o1.jpg"], "category": { "_id": "64acdb7295c8273e8975cc16", "name": "Plain jewellery" }, "brand": "Moissanite", "material": "Pearl", "size": "18 inches", "color": "White", "reviews": [{ "rating": 5, "_id": "64941d38825d2793151c947c" }, { "rating": 4, "_id": "64941d38825d2793151c947d" }], "__v": 1, "gemstones": [], "weight": "18" },
    { "_id": "64970dadc7ab042f1e90ffe7", "name": "Silver Bracelet", "description": "A stylish silver bracelet with a heart charm.", "mrp": 60, "price": 50, "images": ["https://images.naptol.com/usr/local/csp/staticContent/product_images/horizontal/750x750/Sumangali-Jewellery-Collection-o1.jpg"], "category": { "_id": "64acdb7295c8273e8975cc16", "name": "full set" }, "brand": "Pandora", "material": "Silver", "size": "7 inches", "color": "Silver", "reviews": [{ "rating": 5, "_id": "64970dadc7ab042f1e90ffe8" }, { "rating": 4, "_id": "64970dadc7ab042f1e90ffe9" }], "__v": 1, "gemstones": [], "weight": "18" }]

    // const agregatepipeline = [{ $match: { 'category.name': 'Chains' } }]
    // let collection
    // const result = await collection.aggregate(agregatepipeline).toArray();
    res.status(200).json({
        ok: true,
        // data: result
        data
    })
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

app.listen(3000, (err) => {
    if (err) console.log(err.message)
    console.log('app is running on port', 3000)
})

