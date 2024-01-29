const express = require('express');
const Product = require('../models/Product');
const Review = require('../models/Review');
const { validateReview } = require('../middleware');
const router = express.Router()

// review route
router.post('/products/:id/rating', validateReview, async (req, res) => {
    try {
        let { rating, comment } = req.body;
        let { id } = req.params;

        let product = await Product.findById(id)

        // new review using class syntax
        let review = new Review({ rating, comment })
        product.reviews.push(review);

        // to save the changes in the database
        await product.save();
        await review.save();

        // adding flash message
        req.flash('msg', 'Review added successfully')
        res.redirect(`/products/${id}`)
    }
    catch (e) {
        res.render('error', { err: e.message })
    }


})

module.exports = router