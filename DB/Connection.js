const mongoose = require('mongoose');

const uri = "mongodb+srv://itayguetta:12345678g@cluster0-cvv2x.mongodb.net/test?retryWrites=true&w=majority";
const connectDB = async()=>{
  await  mongoose.connect(uri,{ useNewUrlParser: true , useUnifiedTopology: true });
  console.log("database connected ! ");
}

module.exports = connectDB;
