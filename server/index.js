const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();
const { Schema } = mongoose;



//midleware for handling 
//req and res json
app.use(bodyParser.json());
//logs the request from the client
app.use(morgan('tiny'));

const api = process.env.API_URL;

mongoose.connect(process.env.CONNECTION_URL,{
  dbName: 'eshop-database',
}).then(() => {
  console.log("Database Connection is ready...");
}).catch((err) => {
  console.log(err);
});

const productSchema = new Schema({
  name: String,
  description: String,
  countInStock: Number,
});

const Product = mongoose.model('Product', productSchema);

app.post(`${api}/products`,(req, res) => {
  // const product = {
  //   id:1,
  //   name: 'hair dresser',
  //   description: 'a hair dresser for your hair'
  // }
  const  product = new Product({
    name: req.body.name,
    description: req.body.description,
    countInStock: req.body.countInStock,
  });
  product.save().then((createdProduct => {
    res.status(201).json(createdProduct);
  })).catch((err) => {
    res.status(500).json({
      error: err,
      success: false 
    })
  })
  console.log(product);
});


const port = process.env.PORT || 5000;

app.listen(port, () => { 
  console.log(api)
  console.log(`Server is running on port ${port}`); });