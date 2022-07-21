const mongoose = require('mongoose');
const shortid = require("shortid");//to use friendly user id
const Schema = mongoose.Schema;


// define product table
 const productSchema =new Schema({

    _id:{type:String, default: shortid.generate},
    title:String,
    description:String, 
    price:Number,
    availableSizes:[String],
 });

 const Product = mongoose.model('Product',productSchema);

 module.exports = Product;