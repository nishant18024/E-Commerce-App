const express = require('express');
const { isLoggedIn } = require('../middleware');
const User = require('../models/User');
const Product = require('../models/Product');
const stripe = require('stripe')('sk_test_51Oh9NFSFvmNprHzbEAtE7zrlhkPzyCaT4yd3WEyEFnxw4LNtPhy4LLoyZE4YJRL7qJ3J4Y9zWUlntVXQvYkETToh007UKDp2SQ')
const router = express.Router()

router.get('/user/cart', isLoggedIn, async (req, res) => {
    let userId = req.user._id
    let user = await User.findById(userId).populate('cart')
    let totalAmount = user.cart.reduce((sum, index) =>
        sum + index.price, 0
    )
    // console.log(totalAmount);
    res.render('cart/cart', { user, totalAmount })
})

router.post('/user/:productId/add', isLoggedIn, async (req, res) => {
    let { productId } = req.params
    let userId = req.user._id
    let user = await User.findById(userId).populate('cart')
    let product = await Product.findById(productId)
    user.cart.push(product)
    await user.save()
    res.redirect('/user/cart')
})

// Stripe route
router.get('/checkout/:id', async (req, res) => {
    let userId = req.params.id
    let user = await User.findById(userId).populate('cart')
    let totalAmount = user.cart.reduce((sum, index) =>
        sum + index.price, 0
    )
    let productName = user.cart.name
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: 'inr',
                    product_data:
                    {
                        // name: 'T-shirt',
                        name: 'Total Cart Value',
                    },
                    unit_amount: totalAmount * 100,
                },
                // quantity: user.cart.length,
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: 'http://localhost:8080/success',
        cancel_url: 'http://localhost:8080/cancel',
    });

    res.redirect(303, session.url);
})

module.exports = router