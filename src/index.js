const express = require('express');
const path = require('path');
const app = express();
const logger = require('morgan');
const cors = require('cors');

// Views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(logger('dev'));
app.use(express.urlencoded({
    extended: true
}));

// Redirect to HTTPS if in production
if(process.env.ENVIROMENT=='production'){
    function requireHTTPS(req, res, next) {
        if (!req.secure) {
            return res.redirect('https://' + req.get('host') + req.url);
        }
        next();
    }
    app.use(requireHTTPS);
}

// Controllers
const {
    homeController
} = require('./controllers');

app.use('/', homeController);

module.exports = app