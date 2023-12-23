// models/productsSchema.js
import mongoose from 'mongoose';

const productsSchema = new mongoose.Schema({
    id: Number,
    brand: String,
    title: String,
    old_price: Number,
    price: Number,
    stock: Boolean,
    stock_quantity: Number,
    description: String,
    category: String,
    images: [String],
    rating: Number
});

const Products = mongoose.model('Products', productsSchema);

export default Products;
