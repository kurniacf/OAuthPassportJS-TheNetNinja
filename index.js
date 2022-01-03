const express = require("express");
const app = express();
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require('./routes/profileRoutes');
const passportSetup = require('./config/passport');
const mongoose = require('mongoose');
const key = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');

const PORT = 3000;

// Set Up View
app.set("view engine", "ejs");

app.use(cookieSession({
    maxCookie: 24 * 60 * 60 * 1000,
    keys: [key.session.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());

// Set Up Database
mongoose.connect(key.mongodb.dbURI, ()=>{
    console.log('Connected MongodDB Database');
});

// Set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

// Routes
app.get("/", (req, res)=>{
    res.render('home', {user: req.user});
});

app.listen(PORT, ()=>{
    console.log(`Server is running on Port: ${PORT}`)
});