const express = require('express');
const app = express();
const PORT = 3000; // Replace with your desired port number


const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reviews', reviewRoutes);

// Other server configurations and middleware

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
