const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const key = require('./keys');

passport.use(new GoogleStrategy(
    {
        // Setup Google Strategy
        callbackURL: '/auth/google/redirect',
        clientID: key.google.clientID,
        clientSecret: key.google.clientSecret
    }, ()=>{
        // Passport Callback

    })
);