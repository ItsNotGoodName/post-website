const {
    validationResult,
    check
} = require('express-validator');
const {
    postService
} = require('../services');


const loginValidator = [
    check('username')
    .not()
    .isEmpty()
    .withMessage('Username is required'),
    check('password')
    .not()
    .isEmpty()
    .withMessage('Password is required')
]

const registerValidator = [
    check('username')
    .not()
    .isEmpty()
    .withMessage('Username is required')
    .isLength({
        min: 3
    })
    .withMessage("Username too small"),
    check('password')
    .not()
    .isEmpty()
    .withMessage('Password is required')
]

const postValidator = [
    check('title')
    .not()
    .isEmpty()
    .withMessage('Title is required'),
    check('body')
    .not()
    .isEmpty()
    .withMessage('Body is required')
]

const postDeleteValidator = [
    check('id')
    .not()
    .isEmpty()
    .withMessage('id not supplied')
]

const pageValidator = [
    check('page')
    .isNumeric()
    .custom(async (value) => {
        if (!Number.isInteger(Number(value))) {
            throw new Error('Not an integer');
        }
        if (value < 1) {
            throw new Error('Not a valid page');
        }
        let maxpage = await postService.getNumPage()
        if (value > maxpage) {
            throw new Error('Not a valid page')
        }
        return true;
    })
]

/*
    Checks validator errors and then redirects to a url while passing the errors to it.
*/
const checkErrors = (redirect) => {
    return (req, res, next) => {
        let errors = validationResult(req).array();
        if (errors.length > 0) {
            req.flash('errors', errors.map((e) => {
                return e.msg
            }))
            res.redirect(redirect);
            return;
        }
        next();
    }
}

module.exports = {
    loginValidator,
    registerValidator,
    postValidator,
    checkErrors,
    pageValidator,
    postDeleteValidator
}