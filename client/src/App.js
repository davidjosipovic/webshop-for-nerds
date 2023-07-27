import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Figures from './pages/Figures';
import Posters from './pages/Posters';
import Plushies from './pages/Plushies';
import Replicas from './pages/Replicas';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import Accessories from './pages/Accessories';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductDetails from './pages/ProductDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import { CartProvider } from './context/CartContext';
import EditProfile from './pages/EditProfile';
import SearchPage from './pages/SearchPage';
import CheckoutSuccess from './components/CheckoutSuccess';
import Checkout from './pages/Checkout';

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/figures" element={<Figures />} />
          <Route path="/posters" element={<Posters />} />
          <Route path="/plushies" element={<Plushies />} />
          <Route path="/replicas" element={<Replicas />} />
          <Route path="/accessories" element={<Accessories />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/search" element={<SearchPage/>} />
          <Route path="/checkout" element={<Checkout/>} />
          <Route path="/checkout-success" element={<CheckoutSuccess/>} />
          
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;
