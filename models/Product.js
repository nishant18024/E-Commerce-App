const mongoose = require('mongoose')
const Review = require('./Review')

// schema of the product
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    img: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        min: 0,
        required: true
    },
    desc: {
        type: String,
        trim: true
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }],
    author: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
})

productSchema.post('findOneAndDelete', async function(product){
    if(product.reviews.length > 0){
        await Review.deletemany({_id:{$in:product.reviews}})
    }
})

// product model using productSchema
let Product = mongoose.model('Product', productSchema)

// exporting product to use it in any other file
module.exports = Product;