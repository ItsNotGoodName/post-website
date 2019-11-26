const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcrypt');
const {
    userService
} = require('../services')

module.exports = () => {
    passport.use(
        new LocalStrategy({
            usernameField: "username"
        }, (username, password, done) => {
            User.findOne({
                username: username
            }, (err, user) => {
                if (err) {
                    return done(err);
                }

                if (!user) {
                    return done(null, false, {
                        message: "Incorrect username."
                    });
                }
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        done(null, false, {
                            message: 'Password incorrect'
                        });
                    }
                })
            })

        })
    );
}

passport.serializeUser(function (user, cb) {
    cb(null, user.username);
})

passport.deserializeUser(function (username, cb) {
    console.log(username);
    userService.findUser(username).then((user) => {
        console.log(user);
        cb(null, user);
    })
})