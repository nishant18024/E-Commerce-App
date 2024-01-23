const mongoose = require('mongoose')

// schema of the product
const reviewSchema = new mongoose.Schema(
    {
        rating: {
            type: Number,
            min: 0,
            max: 5
        }
    },
    {
        comment: {
            type: String,
            trim: true
        }
    }
)

// review model using reviewSchema
let Review = mongoose.model('Review', reviewSchema)

// exporting review to use it in any other file
module.exports = Review;