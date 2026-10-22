const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  farmerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  minQuantity: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    required: [true, 'Unit is required'],
    trim: true,
  },  
  priceRange: {
    min: { type: Number, required: true },
    max: { type: Number, required: true },
  },
  images: {
    type: [String],
    default: [],
  },
  qualityCertificateNo: {
    type: String,
    default: "",
  },
  qualityParameters: {
    type: String,
    default: "",
  },
  extraDetails: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
