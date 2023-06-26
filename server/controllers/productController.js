// Import the necessary dependencies
const Product = require('../models/Product');
const Category = require('../models/Category');


// Function to retrieve products by category
const getProductsByCategory = async (req, res) => {
  try {
    const category = req.query.category;
    const products = await Product.findAll({
      include: [{
        model: Category,
        where: { name: category }
      }],
    });

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve products' });
  }
};

module.exports = {
  getProductsByCategory
};



// Function to create a new product
const createProduct = async (req, res) => {
  try {
    const { product_id, name, description, price, quantity, category_id, image_url } = req.body;
    const newProduct = new Product({
      product_id,
      name,
      description,
      price,
      quantity,
      category_id,
      image_url
    });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create a new product' });
  }
};

// Function to retrieve a specific product by ID
const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve the product' });
  }
};

// Function to update a specific product by ID
const updateProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, description, price, quantity, category_id, image_url } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { name, description, price, quantity, category_id, image_url },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update the product' });
  }
};

// Function to delete a specific product by ID
const deleteProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete the product' });
  }
};

// Export the controller functions
module.exports = {
  getProductsByCategory,
  createProduct,
  getProductById,
  updateProductById,
  deleteProductById
};
