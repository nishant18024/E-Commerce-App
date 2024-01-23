const express = require('express');
const Product = require('../models/Product');
const Review = require('../models/Review');
const router = express.Router()

// review route
router.post('/products/:id/rating', async (req, res) => {
    let { rating, comment } = req.body;
    let { id } = req.params;

    let product = await Product.findById(id)

    // new review using class syntax
    let review = new Review({ rating, comment })
    product.reviews.push(review);

    // to save the changes in the database
    await product.save();
    await review.save();
    res.redirect(`/products/${id}`)
})

module.exports = router