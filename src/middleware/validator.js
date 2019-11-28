const {
    check
} = require('express-validator');


const loginValidator = [
    check('username')
    .not()
    .isEmpty()
    .withMessage('Username is required')
    .isLength({min: 3})
    .withMessage("Too small"),
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
    .isLength({min: 3})
    .withMessage("Too small"),
    check('password')
    .not()
    .isEmpty()
    .withMessage('Password is required')
]

module.exports = {
    loginValidator,
    registerValidator
}