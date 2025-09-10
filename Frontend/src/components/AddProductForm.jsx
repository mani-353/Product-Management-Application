import React, { useState, useEffect } from 'react';

export default function AddProductForm({ onAdd, initial, onCancel, onUpdate }) {
    const [name, setName] = useState(initial?.name || '');
    const [price, setPrice] = useState(initial?.price ?? '');
    const [description, setDescription] = useState(initial?.description || '');
    const [category, setCategory] = useState(initial?.category || '');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (initial) {
            setName(initial.name || '');
            setPrice(initial.price ?? '');
            setDescription(initial.description || '');
            setCategory(initial.category || '');
        }
    }, [initial]);

    const validate = () => {
        const e = {};
        if (!name.trim()) e.name = 'Name is required';
        if (price === '' || Number.isNaN(Number(price)) || Number(price) <= 0) e.price = 'Price must be a positive number';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        if (!validate()) return;
        const payload = { name: name.trim(), price: Number(price), description: description.trim(), category: category.trim() || 'General' };
        if (initial && onUpdate) {
            await onUpdate(initial._id, payload);
        } else {
            await onAdd(payload);
            setName(''); setPrice(''); setDescription(''); setCategory('');
        }
        if (onCancel) onCancel();
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <div className="form-row">
                <input placeholder="Product name" value={name} onChange={e => setName(e.target.value)} />
                {errors.name && <div className="field-error">{errors.name}</div>}
            </div>

            <div className="form-row">
                <input placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
                {errors.price && <div className="field-error">{errors.price}</div>}
            </div>

            <div className="form-row">
                <input placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
            </div>

            <div className="form-row">
                <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
            </div>

            <div className="form-actions">
                <button className="btn primary" type="submit">{initial ? 'Save' : 'Add product'}</button>
                {initial && <button className="btn" type="button" onClick={onCancel}>Cancel</button>}
            </div>
        </form>
    );
}
