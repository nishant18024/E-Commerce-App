const express = require('express');
const Product = require('../models/Product');
const Review = require('../models/Review');
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

// show particular product
router.get('/products/:id', async (req, res) => {
    let { id } = req.params
    // let foundProduct = await Product.findById(id)
    // populating the revies to show in the product description page
    let foundProduct = await Product.findById(id).populate('reviews');
    // console.log(foundProduct);
    res.render('show', { foundProduct })
})

// Editing a product details
router.get('/products/:id/edit', async (req, res) => {
    let { id } = req.params;
    let foundProduct = await Product.findById(id);
    res.render('edit', { foundProduct })
})

//Actually changing the product details in database
router.patch('/products/:id', async (req, res) => {
    let { id } = req.params;
    let { name, img, price, desc } = req.body;
    await Product.findByIdAndUpdate(id, { name, img, price, desc });
    res.redirect('/products')
})

// deleting product
router.delete('/products/:id', async (req, res) => {
    let { id } = req.params
    let foundProduct = await Product.findById(id)
    // to delete the reviews before deleting product
    for (let ids of foundProduct.reviews) {
        await Review.findByIdAndDelete(ids)
    }

    await Product.findByIdAndDelete(id)
    res.redirect('/products')

})
module.exports = router;