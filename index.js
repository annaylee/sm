if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const morgan = require('morgan');
const methodOverride = require('method-override');

// Passport config
require('./config/passport')(passport);

// Mongodb connection
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', error=>{
    console.log(error);
});
db.once('open', ()=>{
    console.log('Database connected..')
});

// Morgan
// app.use(morgan('dev'));

// EJS middleware ( make sure express-ejs-layouts is above ejs or layouts won't work )
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join( __dirname, 'views'));
app.use(express.static('public')); // to make client-side browser has access to the css

// Body parser ( body parser is now included in express and no need to install 'body-parser' )
app.use(express.urlencoded({ extended: false }));

// Express session ( connect-flash requires express-session to work )
app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true
}));

// Passport middleware ( passport documentation is hard to understand )
// It is important TO put it after session 
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Custom middleware for global variables
// The res.locals property is an object that contains response local variables 
// scoped to the request and because of this, it is only available to the view
// rendered during that request/response cycle (if any).
// Since we implemented the connect-flash, we have access to the req.flash()

app.use((req, res, next)=>{
    res.locals.success = req.flash('success');  
    res.locals.error = req.flash('error');
    next();
});

app.use(methodOverride('_method'));

// Import routers
const indexRouter = require('./routers/index');
const createRouter = require('./routers/create');
const modifyRouter = require('./routers/modify');

app.use('/', indexRouter); // for REGISTER, LOGIN, and LOGOUT
app.use('/create', createRouter); // for CREATE menu
app.use('/modify', modifyRouter); // for MODIFY menu
app.use((req, res, next)=>{
    res.status(404).render('404', {title: '404 - Page Not Found'});
});

app.listen( process.env.PORT || 3000, ()=>{
    console.log('Server started...');
});
