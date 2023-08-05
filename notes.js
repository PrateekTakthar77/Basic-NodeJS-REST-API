// require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const app = express()

app.use(express.json())

// app.get('/',(req,res,next)=>{
//     res.status(200).json({
//         message:"Working",
//         ok: true
//     })
// })
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

// app.get('/emplyeos/',(req,res,next)=>{
//     res.status(200).json({
//         ok: true,
//         data:[
//             {name:"Prateek",Profile:["RactNative",]},
//             {name:"Prateek",Profile:["RactNative",]},
//             {name:"Prateek",Profile:["RactNative",]},
//             {name:"Prateek",Profile:["RactNative",]},
//             {name:"Prateek",Profile:["RactNative",]},
//         ]
//     })
// })

app.post('/post/:id/friends/:id2', (req, res, next) => {
    User.findById(req.params.id)
    res.send(req.params.id);
    // })
});
// app.post

// app.delete

// app.




app.use(function (req, res, next) {
    next(createError[404]('This route does not exist'));
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

