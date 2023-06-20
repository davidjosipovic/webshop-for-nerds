const Order = require('../models/Order');

// Retrieve all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve orders' });
  }
};

// Create a new order
const createOrder = async (req, res) => {
  const { userId, products, totalAmount, shippingAddress, billingAddress, status } = req.body;

  try {
    const order = await Order.create({
      userId,
      products,
      totalAmount,
      shippingAddress,
      billingAddress,
      status,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
};

// Retrieve a specific order by ID
const getOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findByPk(id);

    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve order' });
  }
};

// Update a specific order by ID
const updateOrderById = async (req, res) => {
  const { id } = req.params;
  const { userId, products, totalAmount, shippingAddress, billingAddress, status } = req.body;

  try {
    const order = await Order.findByPk(id);

    if (order) {
      order.userId = userId;
      order.products = products;
      order.totalAmount = totalAmount;
      order.shippingAddress = shippingAddress;
      order.billingAddress = billingAddress;
      order.status = status;

      await order.save();
      res.json(order);
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order' });
  }
};

// Delete a specific order by ID
const deleteOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findByPk(id);

    if (order) {
      await order.destroy();
      res.json({ message: 'Order deleted successfully' });
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete order' });
  }
};

module.exports = {
  getAllOrders,
  createOrder,
  getOrderById,
  updateOrderById,
  deleteOrderById,
};


