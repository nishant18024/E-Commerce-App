const mongoose = require('mongoose')

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
    }]
})

// product model using productSchema
let Product = mongoose.model('Product', productSchema)

// exporting product to use it in any other file
module.exports = Product;