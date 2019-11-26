const express = require('express');
const fs = require('fs')
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
require('./config/passport')();

const app = express();

// Views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Disable
app.disable('x-powered-by');

// Middleware
app.use(session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({
    extended: false
}));

if(process.env.NODE_ENV === 'production'){
     // Redirect to HTTPS if in production
    app.use(require('./middleware/requireHTTPS'));
    // Log to access.log
    app.use(morgan('combined', {stream: fs.createWriteStream(path.join(__dirname, '../access.log'), { flags: 'a' })}));
}else{
    app.use(morgan('dev'));
}

// Controllers
const {
    homeController,
    postController,
    userController
} = require('./controllers');

app.use('/', homeController);
app.use('/post', postController);
app.use('/user', userController)

module.exports = app