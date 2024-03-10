require('dotenv').config();

const mongoose = require('mongoose');

const connectionStr = "mongodb+srv://e-commerce:visa@cluster0.xvaxybi.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(connectionStr, {useNewUrlparser: true})
.then(() => console.log('connected to mongodb'))
.catch(err => console.log(err))

mongoose.connection.on('error', err => {
  console.log(err)
})

