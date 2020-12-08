const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => { //user is the user pulled out of the database
  done(null, user.id); //null - error object (not expecting any error to occur), user.id != profile.id, "user.id" = "_id", which is assigned by Mongo (since there could be using non-google oauth, e.g., FB)
  //after user signs in, we only care about our own Mongo generated ID (not google generated profile.id)
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  })
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      //check if the same id already exists in the database
      User.findOne({ googleId: profile.id }).then((existingUser) => {
        if (existingUser) {//already have a record of the profile ID
          done(null, existingUser); //null - no error, existingUser - user record
        } else { // don't have a record so create a new record
          new User({ googleId: profile.id })
          .save() //save the new user to the database
          .then(user => done(null, user)); //finish after checking the user is saved in the databsase
        }
      });
    }
  )
); //passport.use => generic register to use GoogleStrategy for authentification
