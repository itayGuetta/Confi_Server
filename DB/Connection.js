const mongoose = require('mongoose');

const uri = "mongodb+srv://itayguetta:12345678g@cluster0-cvv2x.mongodb.net/test?retryWrites=true&w=majority";
// const uri = "mongodb://itayguetta:12345678g>@cluster0-shard-00-00-cvv2x.mongodb.net:27017,cluster0-shard-00-01-cvv2x.mongodb.net:27017,cluster0-shard-00-02-cvv2x.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority"
const connectDB = async()=>{
  await  mongoose.connect(uri,{ useNewUrlParser: true , useUnifiedTopology: true });
  console.log("database connected ! ");
}

module.exports = connectDB;
