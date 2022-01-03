const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const key = require('./keys');
const User = require('../models/userSchema');

passport.use(new GoogleStrategy(
    {
        // Setup Google Strategy
        callbackURL: '/auth/google/redirect',
        clientID: key.google.clientID,
        clientSecret: key.google.clientSecret
    }, (accessToken, refreshToken, profile, done)=>{
        // Passport Callback
        // Check if User Already Account in DB
        User.findOne({
            googleId: profile.id
        }).then((currentUser)=>{
            if(currentUser){
                // Already Account User
                console.log('User is: ' + currentUser);
            } else {
                // If Not Already (Create User)
                new User({
                    username: profile.displayName,
                    googleId: profile.id
                }).save().then((newUser) => {
                    console.log('New User Created: '+ newUser);
                });
            }
        });

        
    })
);