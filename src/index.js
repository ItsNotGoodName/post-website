const express = require('express');
const fs = require('fs')
const path = require('path');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

// Views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Disable
app.disable('x-powered-by');

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.urlencoded({
    extended: false
}));

if(process.env.ENVIROMENT=='production'){
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
    homeController
} = require('./controllers');

app.use('/', homeController);

module.exports = app