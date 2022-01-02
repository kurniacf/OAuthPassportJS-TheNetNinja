const express = require("express");
const app = express();
const PORT = 3000;

// Set Up View
app.set("view engine", "ejs");

// Routes
app.get("/", (req, res)=>{
    res.render('home');
});

app.listen(PORT, ()=>{
    console.log(`Server is running on Port: ${PORT}`)
});