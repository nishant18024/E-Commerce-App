const express = require('express');
const Product = require('../models/Product');
const router = express.Router()

router.get('/products', async (req, res) => {
    let products = await Product.find({})
    res.render('index', { products })
});

router.get('/product/new', (req, res) => {
    res.render('new')
})

// for new product
router.post('/products/new', (req, res) => {
    req.body = {name, img, price, desc}
})
module.exports = router;