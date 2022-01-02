const express = require("express");
const app = express();
const authRoutes = require("./routes/routes");
const passportSetup = require('./config/passport');

const PORT = 3000;

// Set Up View
app.set("view engine", "ejs");

// Set up routes
app.use('/auth', authRoutes);

// Routes
app.get("/", (req, res)=>{
    res.render('home');
});

app.listen(PORT, ()=>{
    console.log(`Server is running on Port: ${PORT}`)
});