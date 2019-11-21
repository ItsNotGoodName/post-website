const express = require('express');
const path = require('path');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const {
    homeController
} = require('./controllers');

app.use('/', homeController);

module.exports = app