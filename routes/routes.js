const router = require("express").Router();

// Auth Login
router.get('/login', (req, res) => {
    res.render('login', { user: req.user });
});

// Auth Logout
router.get('/logout', (req, res)=>{
    // Handle with Passport
    res.send('Logout');
});

// Google Auth
router.get('/google', (req, res)=>{
    // Handle with Passport
    res.send('Login with Google');
});

module.exports = router;