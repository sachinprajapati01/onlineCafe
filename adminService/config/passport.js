const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

passport.use('admin-local', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return done(null, false, { message: 'Incorrect email.' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return done(null, false, { message: 'Incorrect password.' });
    }

    return done(null, admin);
  } catch (error) {
    return done(error);
  }
}));

const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

passport.use('jwt', new JwtStrategy(jwtOpts, async (jwt_payload, done) => {
  try {
    const admin = await Admin.findById(jwt_payload.id);
    if (admin) {
      return done(null, admin);
    }
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
}));