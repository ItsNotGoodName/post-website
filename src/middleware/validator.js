const {
    validationResult,
    check
} = require('express-validator');


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

const checkErrors = (redirect) => {
    return (req, res, next) => {
        let errors = validationResult(req).array();
        if (errors.length > 0) {
            req.flash('errors', errors.map((e)=> {return e.msg}))
            res.redirect(redirect);
            return;
        }
        next();
    }
}

module.exports = {
    loginValidator,
    registerValidator,
    checkErrors,
}