const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/productModels');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('Hello Node API');
});

app.get('/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/products', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.put('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if (!product) {
            return res.status(404).json({ message: Cannot find product with ID ${id} });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.delete('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: Cannot find product with ID ${id} });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

mongoose.connect('mongodb+srv://NancySharma:7015977577@nancyapi.mdqjc.mongodb.net/Node-API?retryWrites=true&w=majority&appName=NancyAPI')
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.log('Error connecting to MongoDB:', error));