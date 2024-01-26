// requirements
const Joi = require('joi')
// Joi is a third party validator to validate data on server side

// Joi schema for product
const productSchema = Joi.object({
    name: Joi.string().required().trim(),
    img: Joi.string().trim(),
    price: Joi.number().required().min(0),
    desc: Joi.string().trim()
});

// Joi schema for review
const reviewSchema = Joi.object({
    rating: Joi.number().min(0).max(5),
    Comment: Joi.string().trim()
})

module.exports = { productSchema, reviewSchema }

