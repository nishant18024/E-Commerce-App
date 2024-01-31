const express = require('express');
const Product = require('../models/Product');
const Review = require('../models/Review');
const router = express.Router()


router.get('/register', (req, res) => {
    res.render('auth/signup')
})

module.exports = router