const express = require("express");
const app = express();
const authRoutes = require("./routes/routes");
const passportSetup = require('./config/passport');
const mongoose = require('mongoose');
const key = require('./config/keys');

const PORT = 3000;

// Set Up View
app.set("view engine", "ejs");

// Set Up Database
mongoose.connect(key.mongodb.dbURI, ()=>{
    console.log('Connected MongodDB Database');
});

// Set up routes
app.use('/auth', authRoutes);

// Routes
app.get("/", (req, res)=>{
    res.render('home');
});

app.listen(PORT, ()=>{
    console.log(`Server is running on Port: ${PORT}`)
});