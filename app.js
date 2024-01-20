// Requirements
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const seedDB = require('./seed')


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


app.listen(PORT, () => {
    console.log(`Server is running at Port:${PORT}`)
})