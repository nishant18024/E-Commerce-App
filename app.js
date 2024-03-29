// Requirements
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const seedDB = require('./seed')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash');
const productRoutes = require('./routes/productRoutes')
const reviewRoutes = require('./routes/review')
const authRoutes = require('./routes/auth')
const cartRoutes = require('./routes/cart')
const productApi = require('./routes/api/productapi')
const passport = require('passport')
const User = require('./models/User')
const LocalStrategy = require('passport-local')
const dotenv = require('dotenv').config()


const app = express();

// const PORT = 8080;

// database connection using mongoose
let url = process.env.MONGO_URL
// let url = 'mongodb+srv://nishantkumar18024:DlExjsd6EReDHIxS@cluster0.rohmo2s.mongodb.net/ShoppingCart?retryWrites=true&w=majority'
// mongoose.connect('mongodb://localhost:27017/e-commerce')
mongoose.connect(url)
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


// middleware for body parser and method overriding
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// session configuration
let configSession = app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000
    }
}))

// session middleware
app.use(session(configSession))

// flash middleware
app.use(flash());

// middleware for initializing passport
app.use(passport.initialize())

// to let session is being assessibe by passport
app.use(passport.session())

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));

app.use((req, res, next) => {
    res.locals.currentUser = req.user
    res.locals.success = req.flash('Success')
    res.locals.error = req.flash('Error')
    next()
})

// home route
app.get('/', (req, res) => {
    res.render('home')
})
// middleware
app.use(productRoutes)
app.use(reviewRoutes)
app.use(authRoutes)
app.use(cartRoutes)
app.use(productApi)

app.listen(process.env.PORT, () => {
    console.log(`Server is running at Port:${process.env.PORT}`)
})