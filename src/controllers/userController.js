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
    registerValidator
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

router.post('/register', registerValidator,
    async (req, res) => {
        let errors = validationResult(req).array();

        if (errors.length > 0) {
            res.redirect('/user/register');
            return;
        }

        const {
            username,
            password
        } = req.body;

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
    loginValidator,
    async (req, res, next) => {
            let errors = validationResult(req).array();
            if (errors.length > 0) {
                res.redirect('/no');
                return;
            }
            next();
        },
        passport.authenticate('local', {
            successRedirect: "/",
            failureRedirect: "/user/login"
        }));

module.exports = router;