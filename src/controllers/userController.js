const router = require('express').Router();
const passport = require('passport');
const {
    userService
} = require('../services');
const {
    blockAuthenticated
} = require('../middleware/authentication');
const {
    check,
    validationResult
} = require('express-validator');

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.use(blockAuthenticated);

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', [
        check('username')
        .not()
        .isEmpty()
        .withMessage('Username is required'),
        check('password')
        .not()
        .isEmpty()
        .withMessage('Password is required')
    ],
    async (req, res) => {
        let errors = validationResult(req).array();
        if (errors.length > 0) {
            res.redirect('/no');
            return;
        }

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
    [
        check('username')
        .not()
        .isEmpty()
        .withMessage('Username is required'),
        check('password')
        .not()
        .isEmpty()
        .withMessage('Password is required')
    ],
    async (req, res, next) => {
            let errors = validationResult(req).array();
            if (errors.length > 0) {
                console.log(errors);
                res.redirect('/no');
                return;
            }
            next();
        },
        passport.authenticate('local', {
            successRedirect: "/",
            failureRedirect: "/user/login"
        })
);

module.exports = router;