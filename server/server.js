const express = require('express');
const app = express();
const path = require('path');
const PORT = 3001; // Replace with your desired port number
const cors = require('cors');

app.use(express.json());
app.use(cors());

// Serve static images
app.use('/images', express.static(path.join(__dirname, 'images')));

const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/category', categoryRoutes);

// Other server configurations and middleware

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
