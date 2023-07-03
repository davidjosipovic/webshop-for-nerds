const User = require('../models/User');

// Retrieve all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
};

// Create a new user
const createUser = async (req, res) => {
  const { username, email, password, shipping_address, billing_address } = req.body;

  try {
    const user = await User.create({
      username,
      email,
      password,
      shipping_address,
      billing_address,
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};

// Retrieve a specific user by ID
const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve user' });
  }
};

// Update a specific user by ID
const updateUserById = async (req, res) => {
  const { id } = req.params;
  const { username, email, password, shipping_address, billing_address } = req.body;

  try {
    const user = await User.findByPk(id);

    if (user) {
      user.username = username;
      user.email = email;
      user.password = password;
      user.shipping_address = shipping_address;
      user.billing_address = billing_address;

      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
};

// Delete a specific user by ID
const deleteUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (user) {
      await user.destroy();
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
};
