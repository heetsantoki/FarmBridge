// controllers/productController.js
const mongoose = require('mongoose');
const Product = require('../models/Product'); // Adjust path if needed
const User = require('../models/User'); // Farmer model assumed to be User

const createProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      minQuantity,
      unit,
      priceMin,
      priceMax,
      qualityCertificateNo,
      qualityParameters,
      extraDetails,
      farmerId
    } = req.body;

    const images = req.files.map(file => `/uploads/productImages/${file.filename}`);
    fid = req.user.id
    const product = new Product({
      farmerId: fid || '',
      name,
      category,
      minQuantity,
      unit,
      priceRange: {
        min: parseFloat(priceMin),
        max: parseFloat(priceMax)
      },
      images,
      qualityCertificateNo,
      qualityParameters,
      extraDetails
    });

    await product.save();

    res.status(201).json({
      message: 'Product created successfully',
      product
    });
  } catch (error) {
    console.error('CREATE PRODUCT ERROR:', error);
    res.status(500).json({ error: error.message });
  }
};





const getProducts = async (req, res) => {
  try {
    const { farmerId } = req.query;

    const filter = farmerId ? { farmerId } : {};
    const products = await Product.find(filter).sort({ createdAt: -1 }).populate({
      path: 'farmerId',
      select: 'firstName lastName phone state', // Select the user fields you want
    });
    

    // Structure the response to include the farmer details directly in the product object.
    const formattedProducts = products.map(product => {
      const productObject = product.toObject(); // Convert Mongoose document to plain JavaScript object

      if (productObject.farmerId) {
        productObject.farmer = {
          firstName: productObject.farmerId.firstName,
          lastName: productObject.farmerId.lastName,
          phone: productObject.farmerId.phone,
          state: productObject.farmerId.state,
        };
        delete productObject.farmerId; // Remove the original farmerId field
      }

      return productObject;
    });

    
    

    res.status(200).json(formattedProducts);
  } catch (error) {
    console.error('FETCH PRODUCTS ERROR:', error);
    res.status(500).json({ error: error.message });
  }
};

const getMyProducts = async (req, res) => {
  try {
    const farmerId = req.user.id;
    const products = await Product.find({ farmerId }).sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    console.error('FETCH MY PRODUCTS ERROR:', error);
    res.status(500).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const farmerId = req.user.id;
    const product = await Product.findOneAndDelete({ _id: id, farmerId });
    if (!product) {
      return res.status(404).json({ message: 'Product not found or unauthorized' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('DELETE PRODUCT ERROR:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createProduct, getProducts, getMyProducts, deleteProduct };
