import React, { useState, useEffect } from 'react';
import api from './api';
import ProductList from './components/ProductList';
import AddProductForm from './components/AddProductForm';

export default function App() {
    const [products, setProducts] = useState([]);
    const [sortOrder, setSortOrder] = useState('');
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const params = {};
            if (sortOrder) params.sort = sortOrder;
            if (search) params.search = search;
            const res = await api.get('/products', { params });
            setProducts(res.data);
        } catch {
            // silent
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [sortOrder, search]);

    const addProduct = async (product) => {
        try {
            const res = await api.post('/products', product);
            setProducts(prev => [res.data, ...prev]);
        } catch {
            // silent
        }
    };

    const deleteProduct = async (id) => {
        const ok = window.confirm('Delete this product?');
        if (!ok) return;
        try {
            await api.delete(`/products/${id}`);
            setProducts(prev => prev.filter(p => p._id !== id));
        } catch {
            // silent
        }
    };

    const updateProduct = async (id, updates) => {
        try {
            const res = await api.put(`/products/${id}`, updates);
            setProducts(prev => prev.map(p => (p._id === id ? res.data : p)));
        } catch {
            // silent
        }
    };

    return (
        <div className="container">
            <header className="header">
                <h1>Product Manager</h1>
                <div className="controls">
                    <input className="search" placeholder="Search by name" value={search} onChange={e => setSearch(e.target.value)} />
                    <select className="select" value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
                        <option value="">Sort by price</option>
                        <option value="asc">Price: Low → High</option>
                        <option value="desc">Price: High → Low</option>
                    </select>
                </div>
            </header>

            <section className="panel">
                <AddProductForm onAdd={addProduct} />
            </section>

            <section className="panel">
                <ProductList products={products} onDelete={deleteProduct} onUpdate={updateProduct} loading={loading} />
            </section>
        </div>
    );
}
