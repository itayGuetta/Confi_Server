
const express = require('express');
const connectDB = require('./DB/Connection');
const expressLayouts  = require('express-ejs-layouts');
const session = require('express-session');
const flash = require('connect-flash');
const app = express();
const passport = require('passport');

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

// Connect flash
app.use(flash());


// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});


//Routes
app.use('/api/userModel',require('./API/User'));
app.use('/', require('./routes/index'));
app.use('/dashboard',(req,res) => res.render("Hello"));
app.use('/users', require('./routes/user'));

//Port init and Connect to DB method 
const port = process.env.ELASTICSEARCH_HOST || 3001;
connectDB();

//Server Listen 
app.listen(port,()=>console.log(`Server started on port ${port}`));