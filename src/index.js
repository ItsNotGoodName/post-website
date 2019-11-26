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
    function requireHTTPS(req, res, next) {
        if (!req.secure) {
            return res.redirect('https://' + req.get('host') + req.url);
        }
        next();
    }
    app.use(requireHTTPS);
    // Log to access.log
    const accessLogStream = fs.createWriteStream(path.join(__dirname, '../access.log'), { flags: 'a' });
    app.use(morgan('combined', {stream: accessLogStream}))
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