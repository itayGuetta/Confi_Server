
const express = require('express');
const connectDB = require('./DB/Connection')
const expressLayouts  = require('express-ejs-layouts')
var session = require('express-session')
const app = express();
const passport = require('passport')

//Paspport Config
require('./configs/passport')(passport);


//Layout-express EJS
app.use(expressLayouts);
app.set('view engine','ejs');

//BodyParser 
app.use(express.urlencoded({ extended: false }))

//Express-Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  }));

//Passport Mideelwere
app.use(passport.initialize());
app.use(passport.session());

//
app.use(flash());


//Routes
app.use('/api/userModel',require('./API/User'));
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/user'));

//Port init and Connect to DB method 
const port = process.env.ELASTICSEARCH_HOST || 3000;
connectDB();

//Server Listen 
app.listen(port,()=>console.log("Server is Started"));