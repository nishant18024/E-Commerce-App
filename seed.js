const mongoose = require('mongoose')
const Product = require('./models/Product')

// Array containing details of the products
const products = [
    {
        name: 'Iphone 15 Pro',
        img: 'https://images.unsplash.com/photo-1702184117235-56002cb13663?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aXBob25lJTIwMTUlMjBwcm98ZW58MHx8MHx8fDA%3D',
        price: 124000,
        desc: 'very costly Phone'
    },
    {
        name: 'MacBook Pro',
        img: 'https://images.unsplash.com/photo-1542393545-10f5cde2c810?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWFjYm9vayUyMHByb3xlbnwwfHwwfHx8MA%3D%3D',
        price: 230000,
        desc: 'Hello i am a good Machine'
    },
    {
        name: 'Apple Pencil',
        img: 'https://images.unsplash.com/photo-1594200664133-0ee987e1babf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXBwbGUlMjBwZW5jaWx8ZW58MHx8MHx8fDA%3D',
        price: 10000,
        desc: 'I can write the future'
    }
]

// function to insert products details into the database
async function seedDB() {
    await Product.insertMany(products)
    console.log(`DB Seeded`);
}

module.exports = seedDB;