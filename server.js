// const {MongoClient} = require('mongodb');

// const uri = "mongodb+srv://itayguetta:12345678g@cluster0-cvv2x.mongodb.net/test?retryWrites=true&w=majority";

// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
// await client.connect();


const express = require('express');
const connectDB = require('./DB/Connection')
const app = express();

connectDB();
app.use(express.json({extanded:false}))
app.use('/api/userModel',require('./API/User'));
const port = process.env.ELASTICSEARCH_HOST || 3000;

app.listen(port,()=>console.log("Server is Started"));