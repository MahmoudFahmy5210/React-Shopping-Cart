const Products = require('../models/prodect');
const express = require('express');
const bodyParser=require('body-parser');
const productRouter=express.Router();



productRouter.use(bodyParser.json());


productRouter.route('/')
.get(async (req,res)=>{
    Products.find({})
    .then((product)=>{
        if(!product){
            res.statusCode=401;
            const err =new Error('Product is not founds');
            throw err;
        }
        else{
            res.statusCode=200;
            res.setHeader("Content-Type",'Application/json');
            res.json(product);
        }
    })
    .catch((err)=>{
        return err;
    })
});

module.exports = productRouter;