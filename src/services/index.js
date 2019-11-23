const fs = require('fs');
// const models = require('../models');

fs
    .readdirSync(__dirname)
    .filter((file) => {
        return file !== __filename && file.endsWith('Service.js');
    })
    .forEach((file) => {
        let service = require('./' + file);
        module.exports[file.substr(0, file.length - 3)] = new service();
    });