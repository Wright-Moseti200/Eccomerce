const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: [String], required: true }, 
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    sizes: { type: [String], enum: ["S", "M", "L", "XL", "XXL"], required: true },
    date: { type: Number, required: true }, 
    bestseller: { type: Boolean, default: false }
}, { timestamps: true });

const ProductModel = mongoose.model("Product", productSchema);

module.exports = { ProductModel };
