const Sequelize = require('sequelize');

// Initialize Sequelize with the MySQL dialect
const sequelize = new Sequelize('webshopfornerds', 'korisnik', 'korisnik', {
  host: 'localhost',
  dialect: 'mysql',
});

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

module.exports = sequelize;
