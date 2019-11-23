const express = require('express');
const path = require('path');
const app = express();
const logger = require('morgan');

const {
    homeController
} = require('./controllers');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'))
app.use(express.urlencoded({extended: true})); 

app.use('/', homeController);

module.exports = app