const express = require('express');
const router = express.Router();

const passport = require('passport')

//renderiza formularios
router.get('/signup', (req, res) => {
    res.render('auth/signup');
});

router.get('/signin', (req, res) => {
    res.render('auth/signin');
});

router.get('/profile', (req, res) =>{
    res.send('este es el perfil')
});


//recibe los datos
router.post('/signup',   passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
    }));
  
router.post('/signin', (req, res, next) =>{
    passport.authenticate('local.signin', {
        sucecesRedirect: "/profile",
        failureRedirect: "/signin",
        failureFlash: true
    })(req, res, next );
});


module.exports = router;