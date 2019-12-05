const router = require('express').Router();
const passport = require('passport');
const {
    userService
} = require('../services');
const {
    blockAuthenticated,
    forwardAuthenticated
} = require('../middleware/authentication');
const {
    loginValidator,
    registerValidator,
    checkErrors
} = require('../middleware/validator');
const {
    validationResult
} = require('express-validator')

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get('/profile', forwardAuthenticated, (req, res) => {
    res.render('profile');
});

router.use(blockAuthenticated);

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', registerValidator, checkErrors('/user/register'),
    async (req, res) => {
        const {
            username,
            password
        } = req.body;

        if (!await userService.addUser(username, password)) {
            req.flash('errors', ['Username taken']);
            res.redirect('/user/register');
            return;
        }
        req.flash('info', ['Success, login']);
        res.redirect('/user/login');
    });

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login',
    loginValidator,
    checkErrors('/user/login'),
    passport.authenticate('local', {
        successRedirect: "/",
        failureRedirect: "/user/login",
        failureFlash: true
    }));

module.exports = router;