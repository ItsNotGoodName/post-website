const router = require('express').Router();
const counterService = require('../services').counterService


router.get('/', (req, res)=> {
    counterService.incrementCounter();
    res.render('index', { title: 'Web App', requests_made: counterService.getCounter() });
})

module.exports = router;