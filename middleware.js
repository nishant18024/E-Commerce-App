const Product = require('./models/Product');
const { productSchema, reviewSchema } = require('./schema');
const flash = require('connect-flash')


const validateProduct = (req, res, next) => {
    const { name, img, price, desc } = req.body;
    const { error } = productSchema.validate({ name, img, price, desc })
    if (error) {
        const msg = error.details.map((err) => err.message).join(',')
        return res.render('error', { err: msg })
    }
    next();
}

const validateReview = (req, res, next) => {
    const { rating, comment } = req.body;
    const { error } = reviewSchema.validate({ rating, comment })
    if (error) {
        const msg = error.details.map((err) => err.message).join(',')
        return res.render('error', { err: msg })
    }
    next();
}

const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('Error', 'You need to login first')
        return res.redirect('/login')
    }
    next()
}

const isSeller = (req, res, next) => {
    let { id } = req.params
    if (!req.user.role) {
        req.flash('Error', `You don't have the permision`)
        return res.redirect(`/products/${id}`)
    }
    else if (req.user.role !== 'seller') {
        req.flash('Error', 'You need to login as seller')
        return res.redirect(`/products/${id}`)
    }
    next()
}

const isProductAuthor = async (req, res, next) => {
    let { id } = req.params
    let product = await Product.findById(id)
    const isEqual = product.author.equals(req.user.id)
    if (!product.author.equals(req.user._id)) {
        req.flash('Error', `You are not the owner`)
        return res.redirect(`/products/${id}`)
    }
    next()
}

// const isProductAuthor = (req, res, next) => {

// }

module.exports = { validateProduct, validateReview, isLoggedIn, isSeller, isProductAuthor }