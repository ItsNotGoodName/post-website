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

// Controllers
const {
    homeController
} = require('./controllers');

app.use('/', homeController);

module.exports = app