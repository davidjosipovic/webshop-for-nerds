const express = require('express');
const app = express();
const path = require('path');
const PORT = 3001; // Replace with your desired port number
const cors = require('cors');
const loginRoute = require('./routes/login'); // Path to the login route
require('dotenv').config();
const session = require('express-session');



app.use(express.json());
app.use(cors());
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false
}));



// Serve static images

const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

app.use('/login', loginRoute);
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/category', categoryRoutes);

// Other server configurations and middleware

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
