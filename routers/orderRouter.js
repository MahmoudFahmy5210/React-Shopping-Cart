const Order = require('../models/order');
const bodyParser = require('body-parser');
const express = require('express');
const orderRouter = express.Router();



orderRouter.route('/')
.post((req,res) =>{
    //check existance of data from user
    if( !req.body.name||!req.body.email||!req.body.address||!req.body.total||!req.body.cartItems)
    {
    //if the data is empty , answer with this response
    return res.send({ message :" Data is required. "});
    }
    Order.create(req.body)
    .then((order)=>{
        res.statusCode=200;//ok
        res.setHeader('Content-Type','Application/json');
        res.json(order);
    })
    .catch((err)=>{
        return err;
    })
})

module.exports=orderRouter;
