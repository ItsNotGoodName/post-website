'use strict';

before(() => {
    return new Promise((resolve, reject) => {
        require('dotenv').config()
        const db = require('../src/config/db').connection;
        db.once('open', () => {
            resolve();
        });
        db.on('error', (e) => {
            reject(e);
        });
    });
});

after(() => {
    return new Promise((resolve, reject) => {
        const db = require('../src/config/db').connection;
        db.close()
            .then(() => {
                resolve()
            });
    });
});