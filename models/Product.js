const mongoose = require('mongoose')

// schema of the product
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    id: {
        type: String,
        required: true,
        trim: true
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
    }
})

// product model using productSchema
let Product = mongoose.model('Product', productSchema)

// exporting product
module.exports = Product;