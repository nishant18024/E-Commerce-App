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
router.post('/products', async (req, res) => {
    let { name, img, price, desc } = req.body; //by default undefined
    await Product.create({ name, img, price, desc });
    res.redirect('/products')
})

// it will automatically save into database
module.exports = router;