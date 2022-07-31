const bodyParser = require("body-parser");//for parseing post api body
const express = require("express"); //for creating webserver
const mongoose = require("mongoose");//to connect to MongoDb
const path = require('path');
///////
const productRouter = require('./routers/productRouter')
const orderRouter = require('./routers/orderRouter');

// creating app by using express modle
const app = express();
app.use(bodyParser.json());
mongoose.connect("mongodb://localhost/react-shopping-cart-db",{
   useNewUrlParser: true,
        useUnifiedTopology: true,

}).then(() => console.log("Database connected!"))
.catch(err => console.log(err));//url to connection to db,second one is optional and used for better connection

// define product model
// const Product = mongoose.model("products",new mongoose.Schema({
//    _id:{type:String, default: shortid.generate},
//    title:String,
//    description:String,
//    image:String,
//    price:Number,
//    availableSizes:[String],
// }));
app.use('/api/products',productRouter)
app.use('/api/orders',orderRouter)

//define first endpoint
//Routes HTTP GET requests to the specified path with the specified callback functions.
//get the product
/*
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
*/
//Creating Model / database for order
//order is the name of the database 
//schema is the info of the database/columns
// const Order = mongoose.model("order",new mongoose.Schema(
//    {
//       _id:
//       {
//          type:String,
//          default:shortid.generate
//       },
//       email:String,
//       name:String,
//       address:String,
//       total:Number,
//       cartItems:
//       [  {
//          _id:String,
//          title:String,
//          price:Number,
//          count:Number,
//          },
//       ],
//    },
//    {
//       timestamps:true,
//    },
// ));

// //creating the post api
// app.post("/api/orders", async ( req , res) => {
//    //check existance of data from user
//    if( !req.body.name||!req.body.email||!req.body.address||!req.body.total||!req.body.cartItems)
//    {
//       //if the data is empty , answer with this response
//       return res.send({ message :" Data is required. "});
//    }
//    //if the data is complete it will reach here so
//    //Order is the const we define above
//    const order = await Order(req.body).save();
//    console.log(typeof(order),"this is the order",order);
//    res.send(order);
// });
//production means we deploy it
if(process.env.NODE_ENV === 'production'){
   //set static folder
   app.use(express.static('Client/build'));
   app.get('*',(req,res)=>{
      res.sendFile(path.resolve(__dirname,'Client','build','index.html'));
   });
}

const port = process.env.PORT || 5000;
app.listen(port,()=> console.log("serve at http://localhost:5000"));