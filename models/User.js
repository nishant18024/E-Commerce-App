const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose');

// schema of the review
const userSchema = new mongoose.Schema(
    {
        // username and passport cannot be added in schema
        // Because it is being handeled by passport
        email: {
            type: String,
            required: true,
            trim: true
        },
        role: {
            type: String,
            default: 'buyer',
            trim: true
        },
        gender: {
            type: String,
            required: true,
            trim: true
        },
        wishlist: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            }
        ]
    }
)

// mongoose pluggin
// always apply on schema
userSchema.plugin(passportLocalMongoose)

// review model using reviewSchema
let User = mongoose.model('User', userSchema)

// exporting review to use it in any other file
module.exports = User;