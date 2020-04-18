
const express = require('express');
const connectDB = require('./DB/Connection')
const expressLayouts  = require('express-ejs-layouts')
const app = express();


//Layout-express


//Routes
app.use(express.json({extanded:false}))
app.use('/api/userModel',require('./API/User'));
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/user'));

//Port init and Connect to DB method 
const port = process.env.ELASTICSEARCH_HOST || 3000;
connectDB();


//Server Listen 
app.listen(port,()=>console.log("Server is Started"));