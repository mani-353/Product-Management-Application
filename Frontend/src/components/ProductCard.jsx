import React, { useState } from 'react';
import AddProductForm from './AddProductForm';

export default function ProductCard({ product, onDelete, onUpdate }) {
    const [editing, setEditing] = useState(false);

    return (
        <div className="card">
            {editing ? (
                <AddProductForm initial={product} onUpdate={async (id, payload) => { await onUpdate(id, payload); setEditing(false); }} onCancel={() => setEditing(false)} />
            ) : (
                <>
                    <div className="card-body">
                        <h3 className="card-title">{product.name}</h3>
                        <p className="card-price">₹{product.price}</p>
                        <p className="card-category">{product.category}</p>
                        <p className="card-desc">{product.description}</p>
                    </div>
                    <div className="card-actions">
                        <button className="btn" onClick={() => setEditing(true)}>Edit</button>
                        <button className="btn danger" onClick={onDelete}>Delete</button>
                    </div>
                </>
            )}
        </div>
    );
}
