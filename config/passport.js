var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../models/user');
const config = require('./database');

module.exports = function(passport) {
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, (req, jwt_payload, done) => {
        console.log(jwt_payload);
        User.getUserById(jwt_payload._doc_id, (err, user) => {
            if(err) {
                console.log(err);
                return done(err, false);
            }
            if(user) {
                console.log(user);
                return done(null, user);
            }else {
                return done(null, false);
            }
        });
    }));
}
