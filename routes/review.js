const express = require('express');
const Product = require('./models/Product');
const Review = require('../models/Review');
const { validateReview } = require('../middleware');
const router = express.Router()

// review route
router.post('/products/:id/rating', validateReview, async (req, res) => {
    try {
        let { productId } = req.params;
        let { rating, comment } = req.body;

        let product = await Product.findById(productId)

        // new review using class syntax
        const review = new Review({ rating, comment })
        product.reviews.push(review);

        // to save the changes in the database
        await product.save();
        await review.save();

        // adding flash message
        req.flash('success', 'Review added successfully')
        res.redirect(`/products/${productId}`)
    }
    catch (e) {
        res.status(500).render('error', { err: e.message });
    }


})

module.exports = router