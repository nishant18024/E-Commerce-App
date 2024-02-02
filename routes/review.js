const express = require('express');
const flash = require('connect-flash');
const Product = require('../models/Product');
const Review = require('../models/Review');
const { validateReview, isLoggedIn } = require('../middleware');
const router = express.Router()

// review route
router.post('/products/:productId/review', isLoggedIn, validateReview, async (req, res) => {
    console.log('checkkkkkkkkkkkk');
    try {
        let { productId } = req.params;
        let { rating, comment } = req.body;

        let product = await Product.findById(productId)

        // new review using class syntax
        const review = new Review({ rating, comment })
        product.reviews.push(review);

        // to save the changes in the database
        await review.save();
        await product.save();

        console.log(review)
        // adding flash message
        req.flash('success', 'Review added successfully')
        res.redirect(`/products/${productId}`)
    }
    catch (e) {
        res.status(500).render('error', { err: e.message });
    }


})

module.exports = router