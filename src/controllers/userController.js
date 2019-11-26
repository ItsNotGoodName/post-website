const router = require('express').Router();
const passport = require('passport');
const { userService } = require('../services');
const {blockAuthenticated} = require('../middleware/authentication');

router.get('/logout', (req, res)=>{
    req.logout();
    res.redirect('/');
});

router.use(blockAuthenticated);

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    const {
        username,
        password
    } = req.body;

    if (username == "" || username == undefined || password == "" || password == undefined) {
        res.redirect('/user/register');
        return;
    }

    if (!await userService.addUser(username, password)) {
        res.redirect('/user/register');
        return;
    }

    res.redirect('/user/login');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login',
    passport.authenticate('local', {
        successRedirect: "/",
        failureRedirect: "/user/login"
    })
);

module.exports = router;