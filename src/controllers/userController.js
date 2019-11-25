const router = require('express').Router();
const passport = require('passport');
const services = require('../services')
const bcrypt = require('bcrypt')

router.get('/register', (req,res) =>{
    res.render('register');
});

router.post('/register', async (req,res)=>{
});

router.get('/login', (req,res)=>{
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: "/",
        failureRedirect : "/user/login"
    })(req, res, next)
});

module.exports = router;