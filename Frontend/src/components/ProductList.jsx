import React from 'react';
import ProductCard from './ProductCard';

export default function ProductList({ products, onDelete, onUpdate, loading }) {
    if (loading) return <div className="empty">Loading…</div>;
    if (!products || products.length === 0) return <div className="empty">No products found</div>;

    return (
        <div className="grid">
            {products.map(p => (
                <ProductCard key={p._id} product={p} onDelete={() => onDelete(p._id)} onUpdate={onUpdate} />
            ))}
        </div>
    );
}
