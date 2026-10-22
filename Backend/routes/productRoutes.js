const express = require('express');
const router = express.Router();
const { createProduct, getProducts, getMyProducts, deleteProduct } = require('../controllers/productController');
const upload = require('../middleware/upload');
const verifyToken = require('../middleware/authmiddleware');

router.post('/add', verifyToken, upload.array('images', 5), createProduct); // Accept up to 5 images
router.get('/products', getProducts);
router.get('/all', getProducts);
router.get('/my-products', verifyToken, getMyProducts);
router.delete('/:id', verifyToken, deleteProduct);

module.exports = router;
