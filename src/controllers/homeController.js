const router = require('express').Router();

requests_made = 0

router.get('/', (req, res)=> {
    requests_made+=1
    res.render('index', { title: 'Web App', requests_made: requests_made });
})

module.exports = router;