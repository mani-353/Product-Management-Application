const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;

const sample = [
    { name: 'Copper Mug', price: 499, description: 'Handy mug for drinks', category: 'Kitchen' },
    { name: 'Canvas Notebook', price: 199, description: 'A5 ruled notebook', category: 'Stationery' },
    { name: 'Bluetooth Speaker', price: 1499, description: 'Portable speaker', category: 'Electronics' }
];

(async () => {
    await mongoose.connect(MONGO_URI);
    await Product.deleteMany({});
    await Product.insertMany(sample);
    console.log('Seed complete');
    process.exit();
})();
