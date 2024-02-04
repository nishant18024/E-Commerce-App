const express = require('express');
const Product = require('../models/Product');
const Review = require('../models/Review');
const User = require('../models/User');
const passport = require('passport');
const flash = require('connect-flash')
const router = express.Router()


router.get('/register', (req, res) => {
    res.render('auth/signup')
})

router.post('/register', async (req, res) => {
    let { username, password, email, gender, role } = req.body
    let user = new User({ username, password, email, gender, role })
    let newUser = await User.register(user, password)
    res.redirect('/login')
})

router.get('/login', (req, res) => {
    res.render('auth/login')
})

router.post('/login',
    passport.authenticate('local',
        {
            failureRedirect: '/login',
            failureMessage: true
        }),
    function (req, res) {
        // console.log(req.user, "User:");
        req.flash('Success', `Welcome Back ${req.user.username}`)
        res.redirect('/products')
    }
)

router.get('/logout', (req, res) => {
    req.logout(() => {
        req.flash('Success', `Logout Successfull`)
        res.redirect('/login')
    });
})

module.exports = router