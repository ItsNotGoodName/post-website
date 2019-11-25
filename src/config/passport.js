const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/User');
const bcrypt = require('bcrypt');

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
                bcrypt.compare(passport, user.password, (err, isMatch) => {
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