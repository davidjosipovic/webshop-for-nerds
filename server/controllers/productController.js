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

// Function to create a new product
const createProduct = async (req, res) => {
  try {
    const { product_id, name, description, price, quantity, category_id, image_url } = req.body;
    const newProduct = await Product.create({
      product_id,
      name,
      description,
      price,
      quantity,
      category_id,
      image_url
    });
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create a new product' });
  }
};

// Function to retrieve a specific product by ID
const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByPk(productId, {
      include: [Category]
    });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve the product' });
  }
};

// Function to update a specific product by ID
const updateProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, description, price, quantity, category_id, image_url } = req.body;
    const updatedProduct = await Product.update(
      { name, description, price, quantity, category_id, image_url },
      { where: { product_id: productId }, returning: true }
    );
    if (!updatedProduct[0]) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(updatedProduct[1][0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update the product' });
  }
};

// Function to delete a specific product by ID
const deleteProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.destroy({ where: { product_id: productId } });
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete the product' });
  }
};

// Function to search products
const searchProductsByName = async (req, res) => {
  try {
    const searchQuery = req.query.q;

    const products = await Product.findAll({
      where: {
        name: {
          $like: `%${searchQuery}%`,
        },
      },
    });

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to search for products' });
  }
};

// Export the controller functions
module.exports = {
  getProductsByCategory,
  createProduct,
  getProductById,
  updateProductById,
  deleteProductById,
  searchProductsByName,
};
