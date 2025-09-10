const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
    try {
        const { sort, search } = req.query;
        const filter = {};
        if (search) filter.name = { $regex: search, $options: 'i' };
        const sortOption = {};
        if (sort === 'asc') sortOption.price = 1;
        if (sort === 'desc') sortOption.price = -1;
        const products = await Product.find(filter).sort(sortOption);
        res.json(products);
    } catch {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const { name, price, description, category } = req.body;
        if (!name || price == null) return res.status(400).json({ error: 'Name and price are required' });
        const product = new Product({ name: name.trim(), price, description: description?.trim(), category: category?.trim() || 'General' });
        const saved = await product.save();
        res.status(201).json(saved);
    } catch {
        res.status(500).json({ error: 'Failed to create product' });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Product.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ error: 'Product not found' });
        res.json({ message: 'Product deleted', id: deleted._id });
    } catch {
        res.status(500).json({ error: 'Failed to delete product' });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const updated = await Product.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
        if (!updated) return res.status(404).json({ error: 'Product not found' });
        res.json(updated);
    } catch {
        res.status(500).json({ error: 'Failed to update product' });
    }
};
