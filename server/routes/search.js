const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const Product = require('../models/Product');

router.get('/', async (req, res) => {
    const { query } = req.query;
  
    try {
      const products = await Product.findAll({
        where: {
          [Op.or]: [
            { name: { [Op.like]: `%${query}%` } },
            { description: { [Op.like]: `%${query}%` } },
          ],
        },
      });
  
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch search results' });
    }
  });
  module.exports = router;
  