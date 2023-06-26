const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Category = sequelize.define('Category', {
  category_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'categories',
  timestamps: false,
});

Category.associate = (models) => {
  Category.hasMany(models.Product, { foreignKey: 'category_id' });
};

module.exports = Category;
