const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connect = require('./db');
const productsRouter = require('./routes/products');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/products', productsRouter);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/productdb';

connect(MONGO_URI)
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch((err) => {
        console.error('Database connection failed', err);
        process.exit(1);
    });
