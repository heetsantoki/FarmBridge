const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');

// Create a new order (Buyer purchases product from Farmer)
const createOrder = async (req, res) => {
  try {
    const {
      productId,
      quantity,
      pricePerUnit,
      deliveryAddress,
      paymentMethod,
      notes,
    } = req.body;

    const buyerId = req.user.id;
    if (!productId || !quantity || !deliveryAddress) {
      return res.status(400).json({ message: 'Product, quantity, and delivery address are required' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const unitPrice = Number(pricePerUnit) || product.priceRange.min;
    const orderQuantity = Number(quantity);
    const totalAmount = unitPrice * orderQuantity;

    const productImage = product.images && product.images.length > 0 ? product.images[0] : '';

    const order = new Order({
      buyer: buyerId,
      farmer: product.farmerId,
      product: product._id,
      productName: product.name,
      productImage,
      quantity: orderQuantity,
      unit: product.unit || 'kg',
      pricePerUnit: unitPrice,
      totalAmount,
      deliveryAddress: {
        street: deliveryAddress.street || '',
        city: deliveryAddress.city || '',
        state: deliveryAddress.state || '',
        pincode: deliveryAddress.pincode || '',
        phone: deliveryAddress.phone || '',
      },
      paymentMethod: paymentMethod || 'Cash on Delivery',
      notes: notes || '',
    });

    await order.save();

    res.status(201).json({
      message: 'Order placed successfully!',
      order,
    });
  } catch (error) {
    console.error('CREATE ORDER ERROR:', error);
    res.status(500).json({ message: error.message || 'Failed to place order' });
  }
};

// Get orders received by the logged-in Farmer
const getFarmerOrders = async (req, res) => {
  try {
    const farmerId = req.user.id;
    const orders = await Order.find({ farmer: farmerId })
      .populate('buyer', 'firstName lastName email phone state city')
      .populate('product', 'name category images priceRange unit')
      .sort({ createdAt: -1 });

    const safeOrders = orders.map(ord => {
      const o = ord.toObject();
      if (!o.buyer) {
        o.buyer = { firstName: 'Commercial', lastName: 'Buyer (Inactive)', email: 'N/A', phone: 'N/A' };
      }
      return o;
    });

    res.status(200).json(safeOrders);
  } catch (error) {
    console.error('FETCH FARMER ORDERS ERROR:', error);
    res.status(500).json({ message: error.message || 'Failed to fetch farmer orders' });
  }
};

// Get orders placed by the logged-in Buyer
const getBuyerOrders = async (req, res) => {
  try {
    const buyerId = req.user.id;
    const orders = await Order.find({ buyer: buyerId })
      .populate('farmer', 'firstName lastName email phone state')
      .populate('product', 'name category images priceRange unit')
      .sort({ createdAt: -1 });

    const safeOrders = orders.map(ord => {
      const o = ord.toObject();
      if (!o.farmer) {
        o.farmer = { firstName: 'FarmBridge', lastName: 'Farmer (Inactive)', email: 'N/A', phone: 'N/A' };
      }
      return o;
    });

    res.status(200).json(safeOrders);
  } catch (error) {
    console.error('FETCH BUYER ORDERS ERROR:', error);
    res.status(500).json({ message: error.message || 'Failed to fetch buyer orders' });
  }
};

// Update order status (Farmer can confirm, dispatch, or deliver)
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, paymentStatus } = req.body;
    const userId = req.user.id;

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Verify user is the farmer or the buyer
    if (order.farmer.toString() !== userId && order.buyer.toString() !== userId) {
      return res.status(403).json({ message: 'Unauthorized to update this order' });
    }

    if (status) order.status = status;
    if (paymentStatus) order.paymentStatus = paymentStatus;

    await order.save();

    res.status(200).json({
      message: `Order status updated to ${order.status}`,
      order,
    });
  } catch (error) {
    console.error('UPDATE ORDER STATUS ERROR:', error);
    res.status(500).json({ message: error.message || 'Failed to update order status' });
  }
};

// Farmer dashboard statistics (Total products, orders, revenue, pending)
const getFarmerStats = async (req, res) => {
  try {
    const farmerId = req.user.id;

    const [totalProducts, orders] = await Promise.all([
      Product.countDocuments({ farmerId }),
      Order.find({ farmer: farmerId }),
    ]);

    const totalOrders = orders.length;
    const pendingOrders = orders.filter(o => o.status === 'Pending' || o.status === 'Confirmed').length;
    const deliveredOrders = orders.filter(o => o.status === 'Delivered').length;
    const totalRevenue = orders
      .filter(o => o.status !== 'Cancelled')
      .reduce((sum, o) => sum + (o.totalAmount || 0), 0);

    res.status(200).json({
      totalProducts,
      totalOrders,
      pendingOrders,
      deliveredOrders,
      totalRevenue,
    });
  } catch (error) {
    console.error('FETCH FARMER STATS ERROR:', error);
    res.status(500).json({ message: error.message || 'Failed to fetch farmer stats' });
  }
};

module.exports = {
  createOrder,
  getFarmerOrders,
  getBuyerOrders,
  updateOrderStatus,
  getFarmerStats,
};
