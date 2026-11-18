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

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const farmerId = req.user.id;

    const existingProduct = await Product.findOne({ _id: id, farmerId });
    if (!existingProduct) {
      return res.status(404).json({ message: 'Product not found or unauthorized' });
    }

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
    } = req.body;

    if (name) existingProduct.name = name;
    if (category) existingProduct.category = category;
    if (minQuantity) existingProduct.minQuantity = Number(minQuantity);
    if (unit) existingProduct.unit = unit;
    if (priceMin !== undefined || priceMax !== undefined) {
      existingProduct.priceRange = {
        min: priceMin !== undefined ? parseFloat(priceMin) : existingProduct.priceRange.min,
        max: priceMax !== undefined ? parseFloat(priceMax) : existingProduct.priceRange.max,
      };
    }
    if (qualityCertificateNo !== undefined) existingProduct.qualityCertificateNo = qualityCertificateNo;
    if (qualityParameters !== undefined) existingProduct.qualityParameters = qualityParameters;
    if (extraDetails !== undefined) existingProduct.extraDetails = extraDetails;

    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => `/uploads/productImages/${file.filename}`);
      existingProduct.images = newImages;
    }

    await existingProduct.save();

    res.status(200).json({
      message: 'Product updated successfully',
      product: existingProduct,
    });
  } catch (error) {
    console.error('UPDATE PRODUCT ERROR:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createProduct, getProducts, getMyProducts, deleteProduct, updateProduct };
