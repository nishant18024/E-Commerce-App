const express = require('express');
const Product = require('../models/Product');
const Review = require('../models/Review');
const { validateProduct, validateReview } = require('../middleware');
const router = express.Router()

router.get('/products', async (req, res) => {
    try {

        let products = await Product.find({})
        res.render('index', { products })
    }
    catch (e) {
        res.render('error', { err: e.message })
    }
});

router.get('/product/new', (req, res) => {
    try {
        res.render('new')
    }
    catch (e) {
        res.render('error', { err: e.message })
    }
})

// for new product
router.post('/products', async (req, res) => {
    try {
        let { name, img, price, desc } = req.body; //by default undefined
        await Product.create({ name, img, price, desc });
        res.redirect('/products')
    }
    catch (e) {
        res.render('error', { err: e.message })
    }
})

// show particular product
router.get('/products/:id', async (req, res) => {
    try {
        let { id } = req.params
        // let foundProduct = await Product.findById(id)
        // populating the revies to show in the product description page
        let foundProduct = await Product.findById(id).populate('reviews');
        // console.log(foundProduct);
        res.render('show', { foundProduct, msg: req.flash('msg') })
    }
    catch (e) {
        res.render('error', { err: e.message })
    }
})

// Editing a product details
router.get('/products/:id/edit', async (req, res) => {
    try {
        let { id } = req.params;
        let foundProduct = await Product.findById(id);
        res.render('edit', { foundProduct })
    }
    catch (e) {
        res.render('error', { err: e.message })
    }
})

//Actually changing the product details in database
router.patch('/products/:id', validateProduct, async (req, res) => {
    try {
        let { id } = req.params;
        let { name, img, price, desc } = req.body;
        await Product.findByIdAndUpdate(id, { name, img, price, desc });
        res.redirect('/products')
    }
    catch (e) {
        res.render('error', { err: e.message })
    }
})

// deleting product
router.delete('/products/:id', async (req, res) => {
    try {
        let { id } = req.params
        let foundProduct = await Product.findById(id)
        // to delete the reviews before deleting product
        for (let ids of foundProduct.reviews) {
            await Review.findByIdAndDelete(ids)
        }

        await Product.findByIdAndDelete(id)
        res.redirect('/products')
    }
    catch (e) {
        res.render('error', { err: e.message })
    }

})
module.exports = router;