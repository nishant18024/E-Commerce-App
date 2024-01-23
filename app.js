// Requirements
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const seedDB = require('./seed')
const methodOverride = require('method-override')
const productRoutes = require('./routes/product')
const reviewRoutes = require('./routes/review')


const app = express();

const PORT = 8080;

// database connection using mongoose
mongoose.connect('mongodb://localhost:27017/e-commerce')
    .then(() => {
        console.log('Database is connected');
    })
    .catch((error) => {
        console.log(`Error: ${error}`)
    })

// view engine and path
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// static file path
app.use(express.static(path.join(__dirname, 'public')))

// storing product data in database
// need to comment it after running it once 
// because if not it will seed again and again due to nodemon server restart

// seedDB();


// middleware
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(productRoutes)
app.use(reviewRoutes)

app.listen(PORT, () => {
    console.log(`Server is running at Port:${PORT}`)
})