const Category = require('../models/Category');

// Function to retrieve all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve categories' });
  }
};

// Function to create a new category
const createCategory = async (req, res) => {
  try {
    const { name, category_id } = req.body;
    const newCategory = await Category.create({ name, category_id });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create a new category' });
  }
};

// Function to retrieve a specific category by ID
const getCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve the category' });
  }
};

// Function to update a specific category by ID
const updateCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { name } = req.body;
    const updatedCategory = await Category.update(
      { name },
      { where: { category_id: categoryId } }
    );
    if (updatedCategory[0] === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json({ message: 'Category updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update the category' });
  }
};

// Function to delete a specific category by ID
const deleteCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const deletedCategory = await Category.destroy({
      where: { category_id: categoryId }
    });
    if (!deletedCategory) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete the category' });
  }
};

// Export the controller functions
module.exports = {
  getAllCategories,
  createCategory,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById
};