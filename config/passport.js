const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const key = require('./keys');
const User = require('../models/userSchema');

passport.serializeUser((user, done)=>{
    done(null, user.id);
});

passport.deserializeUser((id, done)=>{
    User.findById(id).then((user)=>{
        done(null, user.id);
    });
});

passport.use(new GoogleStrategy(
    {
        // Setup Google Strategy
        clientID: key.google.clientID,
        clientSecret: key.google.clientSecret,
        callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done)=>{
        console.log(profile);
        // Passport Callback
        // Check if User Already Account in DB
        User.findOne({
            googleId: profile.id
        }).then((currentUser)=>{
            if(currentUser){
                // Already Account User
                console.log('User is: ' + currentUser);
                done(null, currentUser);
            } else {
                // If Not Already (Create User)
                new User({
                    username: profile.displayName,
                    googleId: profile.id,
                    thumbnail: profile._json.image
                }).save().then((newUser) => {
                    console.log('New User Created: '+ newUser);
                    done(null, newUser);
                });
            }
        });

        
    })
);