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
const passport = require('passport')
const User = require('./models/User')
const LocalStrategy = require('passport-local')


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


// middleware for body parser and method overriding
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// session configuration
let configSession = app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
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
    res.locals.success = req.flash('Success')
    res.locals.error = req.flash('Error')
    next()
})

// middleware of productRoutes and reviewRoutes
app.use(productRoutes)
app.use(reviewRoutes)
app.use(authRoutes)

app.listen(PORT, () => {
    console.log(`Server is running at Port:${PORT}`)
})