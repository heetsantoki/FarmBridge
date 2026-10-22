const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authmiddleware');
const {
  createOrder,
  getFarmerOrders,
  getBuyerOrders,
  updateOrderStatus,
  getFarmerStats,
} = require('../controllers/orderController');

// All order routes require authentication
router.use(verifyToken);

router.post('/create', createOrder);
router.get('/farmer-orders', getFarmerOrders);
router.get('/my-orders', getBuyerOrders);
router.get('/farmer-stats', getFarmerStats);
router.put('/:id/status', updateOrderStatus);

module.exports = router;
