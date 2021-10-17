const bodyParser = require("body-parser");//for parseing post api body
const express = require("express"); //for creating webserver
const mongoose = require("mongoose");//to connect to MongoDb
const shortid = require("shortid");//to use friendly user id

// creating app by using express modle
const app = express();
app.use(bodyParser.json());
mongoose.connect("mongodb://localhost/react-shopping-cart-db",{
   useNewUrlParser: true,
        useUnifiedTopology: true,

}).then(() => console.log("Database connected!"))
.catch(err => console.log(err));//url to connection to db,second one is optional and used for better connection

// define product model
const Product = mongoose.model("products",new mongoose.Schema({
   _id:{type:String, default: shortid.generate},
   title:String,
   description:String,
   image:String,
   price:Number,
   availableSizes:[String],
}));
//define first endpoint
//Routes HTTP GET requests to the specified path with the specified callback functions.
//get the product
app.get("/api/products",async (req,res)=>{
const products = await Product.find({});//find with empty means returns all data 
res.send(products);//send the page
});

//post the products
app.post("/api/products" , async (req , res) =>{
   const newProduct = new Product(req.body);
   const savedProduct = await newProduct.save();//save to database
   res.send(savedProduct);
});
app.delete("/api/products/:id" , async (req,res) =>{
   const deletedProduct = await Product.findByIdAndDelete(req.params.id);
   res.send(deletedProduct);
});
const port = process.env.PORT || 5000;
app.listen(port,()=> console.log("serve at http://localhost:5000"));